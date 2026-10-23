def get_resume_suggestions(resume_text: str):

    text = resume_text.lower()

    suggestions = []

    if "github" not in text:
        suggestions.append("Add GitHub profile")

    if "linkedin" not in text:
        suggestions.append("Add LinkedIn profile")

    if "project" not in text:
        suggestions.append("Add Projects section")

    if "certification" not in text:
        suggestions.append("Add Certifications")

    if "docker" not in text:
        suggestions.append("Learn Docker")

    if "aws" not in text:
        suggestions.append("Learn AWS")

    if "mongodb" not in text:
        suggestions.append("Learn MongoDB")

    if len(suggestions) == 0:
        suggestions.append("Excellent Resume")

    return {
        "suggestions": suggestions
    }