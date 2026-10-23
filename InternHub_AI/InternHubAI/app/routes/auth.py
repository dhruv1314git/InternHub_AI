from pathlib import Path
import uuid
from fastapi import APIRouter, Depends, UploadFile, File, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy.exc import IntegrityError
from app.schemas.user import UserRegister, UserLogin
from app.models.user import User
from app.database.dependencies import get_db
from app.utils.security import create_access_token, hash_password, verify_password
from app.utils.auth import get_current_user

router = APIRouter(prefix="/auth", tags=["Authentication"])
UPLOAD_DIR = Path("uploads/resumes")
MAX_RESUME_BYTES = 5 * 1024 * 1024

@router.post("/register", status_code=201)
def register(user: UserRegister, db: Session = Depends(get_db)):
    if len(user.password) < 10:
        raise HTTPException(status_code=422, detail="Password must have at least 10 characters")
    record = User(name=user.name, email=user.email, password=hash_password(user.password))
    db.add(record)
    try:
        db.commit()
        db.refresh(record)
    except IntegrityError:
        db.rollback()
        raise HTTPException(status_code=409, detail="Email already registered")
    return {"message": "Registered", "id": record.id}

@router.post("/login")
def login(user: UserLogin, db: Session = Depends(get_db)):
    record = db.query(User).filter(User.email == user.email).first()
    if not record or not verify_password(user.password, record.password):
        raise HTTPException(status_code=401, detail="Invalid email or password")
    return {"access_token": create_access_token({"sub": record.email}), "token_type": "bearer", "user": {"id": record.id, "name": record.name, "email": record.email}}

@router.get("/me")
def get_me(current_user: str = Depends(get_current_user)):
    return {"email": current_user}

@router.post("/upload-resume")
async def upload_resume(file: UploadFile = File(...), current_user: str = Depends(get_current_user), db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == current_user).first()
    if user is None:
        raise HTTPException(status_code=401, detail="Account not found")
    if file.content_type != "application/pdf":
        raise HTTPException(status_code=415, detail="Only PDF resumes are supported")
    contents = await file.read(MAX_RESUME_BYTES + 1)
    if len(contents) > MAX_RESUME_BYTES:
        raise HTTPException(status_code=413, detail="File must be 5 MB or smaller")
    if not contents.startswith(b"%PDF-"):
        raise HTTPException(status_code=415, detail="Invalid PDF file")
    UPLOAD_DIR.mkdir(parents=True, exist_ok=True)
    path = UPLOAD_DIR / f"{uuid.uuid4().hex}.pdf"
    path.write_bytes(contents)
    previous = user.resume
    user.resume = str(path)
    try:
        db.commit()
    except Exception:
        db.rollback()
        path.unlink(missing_ok=True)
        raise
    if previous:
        previous_path = Path(previous)
        if previous_path.parent == UPLOAD_DIR and previous_path != path:
            previous_path.unlink(missing_ok=True)
    return {"message": "Resume uploaded successfully"}
