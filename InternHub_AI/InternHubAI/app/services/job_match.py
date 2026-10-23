import re

def match_resume_with_job(resume_text: str, job_description: str):

    resume = resume_text.lower()
    job = job_description.lower()

    skills = [
        "python",
        "java",
        "sql",
        "html",
        "css",
        "javascript",
        "react",
        "fastapi",
        "django",
        "git",
        "docker",
        "aws",
        "mongodb",
        "machine learning",
        "ai",
        "c++"
    ]

    matched = []
    missing = []

    for skill in skills:
        if skill in job:
            if skill in resume:
                matched.append(skill)
            else:
                missing.append(skill)

    if len(matched) + len(missing) == 0:
        percentage = 0
    else:
        percentage = int(len(matched) / (len(matched) + len(missing)) * 100)

    return {
        "match_percentage": percentage,
        "matched_skills": matched,
        "missing_skills": missing,
        "recommendation": (
            "Excellent match!"
            if percentage >= 80
            else "Improve missing skills to increase your chances."
        )
    }