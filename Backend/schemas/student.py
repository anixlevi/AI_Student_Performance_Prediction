from pydantic import BaseModel


class Student(BaseModel):

    name: str

    age: int

    gender: str

    attendance: float

    study_hours: float

    previous_marks: float

    assignment_marks: float

    internal_marks: float

    final_marks: float

    result: str



class StudentResponse(Student):

    student_id: int

    predicted_result: float


    class Config:
        from_attributes = True