import re

def calculate_ats_score(resume_text: str):
    score = 0

    keywords = [
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
        "ai"
    ]

    found = []

    text = resume_text.lower()

    for keyword in keywords:
        if keyword in text:
            score += 5
            found.append(keyword)

    if re.search(r'[\w\.-]+@[\w\.-]+', resume_text):
        score += 10

    if re.search(r'\d{10}', resume_text):
        score += 10

    if len(resume_text) > 1000:
        score += 10

    if score > 100:
        score = 100

    return {
        "ats_score": score,
        "keywords_found": found
    }