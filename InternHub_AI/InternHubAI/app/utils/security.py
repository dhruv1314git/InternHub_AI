import os
from datetime import datetime, timedelta, timezone
from fastapi import HTTPException
from jose import jwt
from passlib.context import CryptContext

ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30
password_context = CryptContext(schemes=["pbkdf2_sha256"], deprecated="auto")

def _secret():
    secret = os.environ.get("INTERNHUB_JWT_SECRET", "")
    if len(secret) < 32:
        raise RuntimeError("Set INTERNHUB_JWT_SECRET to a random value of at least 32 characters")
    return secret

def hash_password(password: str) -> str:
    return password_context.hash(password)

def verify_password(password: str, hashed: str) -> bool:
    return password_context.verify(password, hashed)

def create_access_token(data: dict):
    payload = data.copy()
    payload["exp"] = datetime.now(timezone.utc) + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    return jwt.encode(payload, _secret(), algorithm=ALGORITHM)
