from app.services.ai_service import analyze_resume
from app.services.ats_service import calculate_ats_score
from app.services.job_recommendation import recommend_jobs


def generate_dashboard(resume_text: str):

    resume_analysis = analyze_resume(resume_text)
    ats = calculate_ats_score(resume_text)
    jobs = recommend_jobs(resume_text)

    return {
        "resume_score": resume_analysis["resume_score"],
        "ats_score": ats["ats_score"],
        "skills_found": len(resume_analysis["skills_found"]),
        "recommended_jobs": jobs["recommended_jobs"]
    }