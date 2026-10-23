from fastapi import APIRouter, HTTPException

router = APIRouter(prefix="/admin", tags=["Admin"])

# Admin APIs deliberately disabled in public showcase until a real
# role model and server-side administrator authorization are implemented.
@router.get("/users")
@router.get("/resume-history")
@router.get("/statistics")
def admin_not_enabled():
    raise HTTPException(status_code=403, detail="Administrator functionality not enabled in this demo")
