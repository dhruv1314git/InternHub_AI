# InternHubAI

InternHubAI is an AI-powered backend application built with FastAPI. It provides authentication, resume management, resume parsing, and AI-based resume analysis.

## Features

- User registration and authentication
- JWT-based authentication
- Resume upload and storage
- Resume text extraction
- Skill extraction from resumes
- AI-powered resume analysis
- REST API built with FastAPI
- SQLite database using SQLAlchemy
- Interactive API documentation with Swagger UI

## Tech Stack

- Python
- FastAPI
- SQLAlchemy
- SQLite
- Pydantic
- JWT Authentication
- spaCy
- PDFPlumber
- Google Generative AI
- Uvicorn

## Project Structure

```text
InternHubAI/
│
├── app/
│   ├── models/
│   ├── routes/
│   ├── services/
│   ├── utils/
│   └── database/
│
├── uploads/
│   └── resumes/
│
├── main.py
├── requirements.txt
├── README.md
├── .gitignore
└── internhub.db