def generate_interview_questions(resume_text: str):

    text = resume_text.lower()

    questions = []

    if "python" in text:
        questions.append("Explain Python decorators.")

    if "fastapi" in text:
        questions.append("What are the advantages of FastAPI?")

    if "sql" in text:
        questions.append("Explain JOIN in SQL.")

    if "react" in text:
        questions.append("What is Virtual DOM?")

    if "javascript" in text:
        questions.append("Explain closures in JavaScript.")

    if "machine learning" in text:
        questions.append("Difference between supervised and unsupervised learning?")

    if "ai" in text:
        questions.append("What is Generative AI?")

    if len(questions) == 0:
        questions.append("Tell me about yourself.")

    return {
        "questions": questions
    }