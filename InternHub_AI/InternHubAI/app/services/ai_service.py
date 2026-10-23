import re

def analyze_resume(text: str):
    score = 0

    required_skills = [
        "python",
        "java",
        "c++",
        "sql",
        "html",
        "css",
        "javascript",
        "react",
        "fastapi",
        "django",
        "machine learning",
        "ai",
        "git",
        "github",
        "docker",
        "aws",
        "mongodb"
    ]

    lower_text = text.lower()

    found_skills = []
    missing_skills = []

    for skill in required_skills:
        if skill in lower_text:
            found_skills.append(skill)
            score += 5
        else:
            missing_skills.append(skill)

    email = bool(re.search(r'[\w\.-]+@[\w\.-]+', text))
    phone = bool(re.search(r'\d{10}', text))
    linkedin = "linkedin" in lower_text
    github = "github" in lower_text

    if email:
        score += 10

    if phone:
        score += 10

    if linkedin:
        score += 10

    if github:
        score += 10

    if len(text) > 1000:
        score += 15

    if score > 100:
        score = 100

    strengths = []

    if found_skills:
        strengths.append("Good technical skills")

    if email:
        strengths.append("Professional email included")

    if phone:
        strengths.append("Phone number included")

    if linkedin:
        strengths.append("LinkedIn profile included")

    if github:
        strengths.append("GitHub profile included")

    recommendations = []

    if not linkedin:
        recommendations.append("Add LinkedIn profile")

    if not github:
        recommendations.append("Add GitHub profile")

    if len(text) < 1000:
        recommendations.append("Add more project details")

    if len(found_skills) < 6:
        recommendations.append("Include more technical skills")

    if score >= 85:
        ats = "Excellent"
    elif score >= 70:
        ats = "Good"
    elif score >= 50:
        ats = "Average"
    else:
        ats = "Needs Improvement"

    return {
        "resume_score": score,
        "ats_rating": ats,
        "skills_found": found_skills,
        "missing_skills": missing_skills,
        "strengths": strengths,
        "recommendations": recommendations,
        "email_found": email,
        "phone_found": phone,
        "linkedin_found": linkedin,
        "github_found": github
    }