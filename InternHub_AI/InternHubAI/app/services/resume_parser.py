import pdfplumber
import spacy

nlp = spacy.load("en_core_web_sm")


def extract_resume_text(file_path: str):
    text = ""

    with pdfplumber.open(file_path) as pdf:
        for page in pdf.pages:
            page_text = page.extract_text()
            if page_text:
                text += page_text + "\n"

    return text


def extract_resume_details(file_path: str):
    text = extract_resume_text(file_path)

    doc = nlp(text)

    skills = [
        "Python",
        "Java",
        "C",
        "C++",
        "SQL",
        "HTML",
        "CSS",
        "JavaScript",
        "React",
        "Node",
        "FastAPI",
        "Machine Learning",
        "AI",
        "Git"
    ]

    found_skills = []

    for skill in skills:
        if skill.lower() in text.lower():
            found_skills.append(skill)

    return {
        "text": text,
        "skills": found_skills
    }