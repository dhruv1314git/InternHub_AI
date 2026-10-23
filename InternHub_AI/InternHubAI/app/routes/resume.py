
from app.models.resume_history import ResumeHistory
from app.services.dashboard_service import generate_dashboard
from app.services.job_recommendation import recommend_jobs
from app.services.interview_service import generate_interview_questions
from app.services.resume_suggestions import get_resume_suggestions
from app.services.ats_service import calculate_ats_score
from fastapi import Body
from app.services.job_match import match_resume_with_job
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.utils.auth import get_current_user
from app.database.dependencies import get_db
from app.models.user import User
from app.services.resume_parser import extract_resume_details
from app.services.ai_service import analyze_resume as ai_analyze_resume

router = APIRouter(
    prefix="/resume",
    tags=["Resume AI"]
)


@router.get("/analyze")
def analyze_resume(
    current_user: str = Depends(get_current_user),
    db: Session = Depends(get_db)
):
  user = db.query(User).filter(User.email == current_user).first()

  if not user:
        return {"message": "User not found"}

  if not user.resume:
        return {"message": "Resume not uploaded"}

  resume_data = extract_resume_details(user.resume)

  analysis = ai_analyze_resume(resume_data["text"])

  return {
        "user": user.name,
        "resume_path": user.resume,
        "skills": resume_data["skills"],
        "analysis": analysis
    }
@router.post("/job-match")
def job_match(
    job_description: str = Body(..., embed=True),
    current_user: str = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    user = db.query(User).filter(User.email == current_user).first()

    if not user:
        return {"message": "User not found"}

    if not user.resume:
        return {"message": "Resume not uploaded"}

    resume_data = extract_resume_details(user.resume)

    result = match_resume_with_job(
        resume_data["text"],
        job_description
    )

    return {
        "user": user.name,
        "job_match": result
    }
@router.get("/ats-score")
def ats_score(
    current_user: str = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    user = db.query(User).filter(User.email == current_user).first()

    if not user:
        return {"message": "User not found"}

    if not user.resume:
        return {"message": "Resume not uploaded"}

    resume_data = extract_resume_details(user.resume)

    result = calculate_ats_score(resume_data["text"])

    return {
        "user": user.name,
        "ats_result": result
    }
@router.get("/suggestions")
def resume_suggestions(
    current_user: str = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    user = db.query(User).filter(User.email == current_user).first()

    if not user:
        return {"message": "User not found"}

    if not user.resume:
        return {"message": "Resume not uploaded"}

    resume_data = extract_resume_details(user.resume)

    result = get_resume_suggestions(resume_data["text"])

    return {
        "user": user.name,
        "suggestions": result
    }
@router.get("/interview-questions")
def interview_questions(
    current_user: str = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    user = db.query(User).filter(User.email == current_user).first()

    if not user:
        return {"message": "User not found"}

    if not user.resume:
        return {"message": "Resume not uploaded"}

    resume_data = extract_resume_details(user.resume)

    result = generate_interview_questions(resume_data["text"])

    return {
        "user": user.name,
        "interview_questions": result
    }
@router.get("/recommended-jobs")
def recommended_jobs(
    current_user: str = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    user = db.query(User).filter(User.email == current_user).first()

    if not user:
        return {"message": "User not found"}

    if not user.resume:
        return {"message": "Resume not uploaded"}

    resume_data = extract_resume_details(user.resume)

    result = recommend_jobs(resume_data["text"])

    return {
        "user": user.name,
        "recommended_jobs": result
    }
@router.get("/dashboard")
def dashboard(
    current_user: str = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    user = db.query(User).filter(User.email == current_user).first()

    if not user:
        return {"message": "User not found"}

    if not user.resume:
        return {"message": "Resume not uploaded"}

    resume_data = extract_resume_details(user.resume)

    result = generate_dashboard(resume_data["text"])
    history = ResumeHistory(
    user_email=user.email,
    resume_score=result["resume_score"],
    ats_score=result["ats_score"],
    match_percentage=0
)

    db.add(history)
    db.commit()

    return {
        "user": user.name,
        "dashboard": result
    }
@router.get("/history")
def resume_history(
    current_user: str = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    history = db.query(ResumeHistory).filter(
        ResumeHistory.user_email == current_user
    ).all()

    return history