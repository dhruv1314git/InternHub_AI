# InternHub AI — Full-Stack Prototype

InternHub AI is an internship-management prototype with HTML/CSS/JavaScript dashboards and a Python FastAPI + SQLAlchemy backend. Student, mentor, AI-feedback and resume-analysis screens are included; several screens display mock data and are not connected to the API.

## Scope and safety
- Backend registration hashes **new** passwords, validates JWTs with an environment-provided signing secret, and restricts uploads to authenticated PDF submissions (maximum 5 MB).
- **Admin routes are intentionally disabled** until proper administrator roles and authorization are implemented.
- Old local databases with plaintext passwords are not compatible with the revised login. Start with a fresh development database; never commit real user data.
- Files resembling secrets, local virtual environments, database files and uploaded resumes are excluded.
- This is **not** a production-ready application or a verified end-to-end deployment. Further tests, permissions, upload hardening, and integration are required.

## Local backend setup (development only)
1. `cd InternHubAI`
2. `python -m venv .venv` and activate it.
3. `pip install -r requirements.txt`
4. Set `INTERNHUB_JWT_SECRET` to a random value of **at least 32 characters** in the terminal environment (do not commit the value).
5. `uvicorn main:app --reload --host 127.0.0.1`
6. Visit `http://127.0.0.1:8000/docs` to inspect API documentation.

Some optional AI endpoints may require additional model packages or external services. The frontend is a separate prototype and is not yet fully wired to the backend.

