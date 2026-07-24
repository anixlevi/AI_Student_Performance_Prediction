from sqlalchemy import Column, Integer, String, Float, TIMESTAMP, text

from models.base import Base



class Student(Base):

    __tablename__ = "students"


    student_id = Column(
        Integer,
        primary_key=True,
        index=True
    )


    name = Column(
        String(100),
        nullable=False
    )

    email = Column(
        String(100),
        nullable=True
    )

    age = Column(
        Integer,
        nullable=False
    )


    gender = Column(
        String(10),
        nullable=False
    )


    attendance = Column(
        Float,
        nullable=False
    )


    study_hours = Column(
        Float,
        nullable=False
    )


    previous_marks = Column(
        Float,
        nullable=False
    )


    assignment_marks = Column(
        Float,
        nullable=False
    )


    internal_marks = Column(
        Float,
        nullable=False
    )


    final_marks = Column(
        Float,
        nullable=False
    )


    result = Column(
        String(20),
        nullable=False
    )


    predicted_result = Column(
        Float,
        nullable=True
    )


    created_at = Column(
        TIMESTAMP,
        server_default=text("CURRENT_TIMESTAMP")
    )