
from app.routes.admin import router as admin_router
from app.models.resume_history import ResumeHistory
from app.database.db import engine
from app.database.db import engine, Base
from app.models.user import User
import app.models.user
import app.models.resume_history
from fastapi import FastAPI
from app.routes.auth import router as auth_router
from app.routes.resume import router as resume_router

app = FastAPI()

Base.metadata.create_all(bind=engine)

@app.get("/")
def home():
    return {"message": "InternHubAI Backend is Running"}

app.include_router(auth_router)
app.include_router(resume_router)
app.include_router(admin_router)