def recommend_jobs(resume_text: str):

    text = resume_text.lower()

    jobs = []

    if "python" in text:
        jobs.append("Python Developer")

    if "fastapi" in text:
        jobs.append("Backend Developer")

    if "react" in text:
        jobs.append("Frontend Developer")

    if "javascript" in text:
        jobs.append("Full Stack Developer")

    if "machine learning" in text:
        jobs.append("Machine Learning Engineer")

    if "ai" in text:
        jobs.append("AI Engineer")

    if "sql" in text:
        jobs.append("Database Developer")

    if "mongodb" in text:
        jobs.append("MongoDB Developer")

    if len(jobs) == 0:
        jobs.append("Software Engineer")

    return {
        "recommended_jobs": list(set(jobs))
    }