from sqlalchemy import Column, Integer, String, Float, DateTime
from datetime import datetime

from database.database import Base


class Student(Base):

    __tablename__ = "students"


    id = Column(
        Integer,
        primary_key=True,
        index=True
    )


    name = Column(String(100))

    age = Column(Integer)

    gender = Column(String(20))


    attendance = Column(Float)

    study_hours = Column(Float)


    previous_marks = Column(Float)

    assignment_marks = Column(Float)

    internal_marks = Column(Float)

    final_marks = Column(Float)


    result = Column(String(20))


    predicted_result = Column(Float)


    created_at = Column(
        DateTime,
        default=datetime.utcnow
    )