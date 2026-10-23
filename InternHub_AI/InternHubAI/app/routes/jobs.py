from fastapi import APIRouter
from app.services.resume_parser import extract_resume_details
from app.services.job_match import match_resume_with_job

router = APIRouter(
    prefix="/jobs",
    tags=["Job Match AI"]
)

@router.post("/match")
def job_match():

    file_path = "uploads/resumes/resume.pdf"

    resume_data = extract_resume_details(file_path)

    job_description = """
    We are looking for a Python Developer with knowledge of
    FastAPI, SQL, Git, Docker, AWS and Machine Learning.
    """

    result = match_resume_with_job(
        resume_data["text"],
        job_description
    )

    return result