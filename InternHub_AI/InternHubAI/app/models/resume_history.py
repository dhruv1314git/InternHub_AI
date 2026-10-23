from sqlalchemy import Column, Integer, String, ForeignKey
from app.database.db import Base


class ResumeHistory(Base):
    __tablename__ = "resume_history"

    id = Column(Integer, primary_key=True, index=True)
    user_email = Column(String)
    resume_score = Column(Integer)
    ats_score = Column(Integer)
    match_percentage = Column(Integer)