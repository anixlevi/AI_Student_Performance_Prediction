from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from database.database import get_db
from models.student import Student as StudentModel
from schemas.student import Student
from schemas.predict import PredictionInput

from ml_model.model_loader import model

from fastapi.responses import FileResponse

from reportlab.lib.styles import getSampleStyleSheet
from reportlab.platypus import (
    SimpleDocTemplate,
    Paragraph,
    Spacer
)

import os


router = APIRouter()


# ----------------------------------------------------
# Register Student
# ----------------------------------------------------

@router.post("/register")
def register_student(
    student: Student,
    db: Session = Depends(get_db)
):

    new_student = StudentModel(

        name=student.name,

        age=student.age,

        gender=student.gender,

        attendance=student.attendance,

        study_hours=student.study_hours,

        previous_marks=student.previous_marks,

        assignment_marks=student.assignment_marks,

        internal_marks=student.internal_marks,

        final_marks=student.final_marks,

        result=student.result

    )


    db.add(new_student)

    db.commit()

    db.refresh(new_student)


    return {

        "message": "Student Registered Successfully",

        "student_id": new_student.student_id

    }

# ----------------------------------------------------
# Get All Students
# ----------------------------------------------------

@router.get("/students")
def get_all_students(
    db: Session = Depends(get_db)
):

    students = db.query(
        StudentModel
    ).all()

    return students


# ----------------------------------------------------
# Get Single Student
# ----------------------------------------------------

@router.get("/students/{student_id}")
def get_student(
    student_id: int,
    db: Session = Depends(get_db)
):

    student = db.query(
        StudentModel
    ).filter(

        StudentModel.student_id == student_id

    ).first()

    if student is None:

        raise HTTPException(

            status_code=404,

            detail="Student Not Found"

        )

    return student
# ----------------------------------------------------
# Update Student
# ----------------------------------------------------

@router.put("/students/{student_id}")
def update_student(
    student_id: int,
    student: Student,
    db: Session = Depends(get_db)
):

    existing_student = db.query(
        StudentModel
    ).filter(
        StudentModel.student_id == student_id
    ).first()


    if existing_student is None:

        raise HTTPException(

            status_code=404,

            detail="Student Not Found"

        )


    existing_student.name = student.name

    existing_student.age = student.age

    existing_student.gender = student.gender

    existing_student.attendance = student.attendance

    existing_student.study_hours = student.study_hours


    existing_student.previous_marks = student.previous_marks

    existing_student.assignment_marks = student.assignment_marks

    existing_student.internal_marks = student.internal_marks

    existing_student.final_marks = student.final_marks

    existing_student.result = student.result



    db.commit()

    db.refresh(existing_student)


    return {

        "message": "Student Updated Successfully",

        "student": existing_student

    }

# ----------------------------------------------------
# Delete Student
# ----------------------------------------------------

@router.delete("/students/{student_id}")
def delete_student(
    student_id: int,
    db: Session = Depends(get_db)
):

    student = db.query(
        StudentModel
    ).filter(
        StudentModel.student_id == student_id
    ).first()

    if student is None:

        raise HTTPException(

            status_code=404,

            detail="Student Not Found"

        )

    db.delete(student)

    db.commit()

    return {

        "message": "Student Deleted Successfully"

    }


# ----------------------------------------------------
# Predict Student Marks
# ----------------------------------------------------

@router.post("/predict")
def predict_marks(
    student: PredictionInput,
    db: Session = Depends(get_db)
):

    student_data = db.query(
        StudentModel
    ).filter(
        StudentModel.student_id == student.student_id
    ).first()


    if student_data is None:

        raise HTTPException(

            status_code=404,

            detail="Student Not Found"

        )


    prediction = model.predict([[
        
        student_data.age,

        student_data.attendance,

        student_data.study_hours,

        student_data.previous_marks,

        student_data.assignment_marks,

        student_data.internal_marks

    ]])


    predicted_marks = round(
        float(prediction[0]),
        2
    )


    student_data.predicted_result = predicted_marks


    db.commit()

    db.refresh(student_data)


    return {

        "message": "Prediction Generated Successfully",

        "student_name": student_data.name,

        "student_id": student_data.student_id,

        "predicted_marks": predicted_marks

    }

# ----------------------------------------------------
# Performance Status
# ----------------------------------------------------

def get_performance(marks):

    if marks >= 90:
        return "Excellent 🟢"

    elif marks >= 75:
        return "Good 🔵"

    elif marks >= 50:
        return "Average 🟡"

    else:
        return "Need Improvement 🔴"


# ----------------------------------------------------
# Study Improvement Suggestion
# ----------------------------------------------------

def get_study_suggestion(marks):

    if marks >= 90:

        return (
            "Excellent performance. "
            "Maintain your current study routine "
            "of 2-3 focused hours daily."
        )

    elif marks >= 75:

        return (
            "Increase study time by "
            "1 hour daily and solve "
            "10-15 extra practice questions."
        )

    elif marks >= 50:

        return (
            "Increase study time to "
            "4-5 hours daily. Revise "
            "weak subjects and solve "
            "previous year papers."
        )

    else:

        return (
            "Increase study time by "
            "5-6 hours daily. Focus on "
            "basic concepts and take "
            "regular mock tests."
        )


# ----------------------------------------------------
# Attendance Suggestion
# ----------------------------------------------------

def get_attendance_suggestion(attendance):

    if attendance >= 90:

        return (
            "Excellent attendance. "
            "Keep maintaining above 90%."
        )

    elif attendance >= 75:

        return (
            "Try to improve attendance "
            "to at least 90%."
        )

    else:

        return (
            "Attendance is too low. "
            "Attend regular classes "
            "to improve performance."
        )


# ----------------------------------------------------
# Good Wishes
# ----------------------------------------------------

def get_good_wishes(marks):

    if marks >= 90:

        return (
            "Congratulations! Keep shining "
            "and continue your excellent work."
        )

    elif marks >= 75:

        return (
            "Very Good! You are close to "
            "excellent performance. Keep improving."
        )

    elif marks >= 50:

        return (
            "Don't give up. Consistent study "
            "will help you achieve better marks."
        )

    else:

        return (
            "Every topper starts from somewhere. "
            "Believe in yourself and keep working hard."
        )
    # ----------------------------------------------------
# Download Student PDF Report
# ----------------------------------------------------

@router.get("/download-report/{student_id}")
def download_report(
    student_id: int,
    db: Session = Depends(get_db)
):

    student = db.query(StudentModel).filter(
        StudentModel.student_id == student_id
    ).first()

    if student is None:

        raise HTTPException(
            status_code=404,
            detail="Student Not Found"
        )

    filename = f"Student_Report_{student.student_id}.pdf"

    doc = SimpleDocTemplate(filename)

    styles = getSampleStyleSheet()

    story = []

    marks = float(student.predicted_result or 0)

    story.append(
        Paragraph(
            "<b>AI STUDENT PERFORMANCE REPORT</b>",
            styles["Title"]
        )
    )

    story.append(Spacer(1, 20))

    story.append(
        Paragraph(
            f"<b>Name :</b> {student.name}",
            styles["Normal"]
        )
    )

    story.append(
        Paragraph(
            f"<b>Student ID :</b> {student.student_id}",
            styles["Normal"]
        )
    )

    story.append(
        Paragraph(
            f"<b>Age :</b> {student.age}",
            styles["Normal"]
        )
    )

    story.append(
        Paragraph(
            f"<b>Gender :</b> {student.gender}",
            styles["Normal"]
        )
    )

    story.append(
        Paragraph(
            f"<b>Attendance :</b> {student.attendance} %",
            styles["Normal"]
        )
    )

    story.append(
        Paragraph(
            f"<b>Study Hours :</b> {student.study_hours} Hours",
            styles["Normal"]
        )
    )

    story.append(
        Paragraph(
            f"<b>Predicted Marks :</b> {marks}",
            styles["Normal"]
        )
    )

    story.append(Spacer(1, 15))

    story.append(
        Paragraph(
            f"<b>Performance :</b> {get_performance(marks)}",
            styles["Heading2"]
        )
    )

    story.append(Spacer(1, 10))

    story.append(
        Paragraph(
            "<b>Study Improvement Suggestion</b>",
            styles["Heading2"]
        )
    )

    story.append(
        Paragraph(
            get_study_suggestion(marks),
            styles["Normal"]
        )
    )

    story.append(Spacer(1, 10))

    story.append(
        Paragraph(
            "<b>Attendance Suggestion</b>",
            styles["Heading2"]
        )
    )

    story.append(
        Paragraph(
            get_attendance_suggestion(
                student.attendance
            ),
            styles["Normal"]
        )
    )

    story.append(Spacer(1, 10))

    story.append(
        Paragraph(
            "<b>Good Wishes</b>",
            styles["Heading2"]
        )
    )

    story.append(
        Paragraph(
            get_good_wishes(marks),
            styles["Normal"]
        )
    )

    doc.build(story)

    return FileResponse(
        path=filename,
        filename=filename,
        media_type="application/pdf"
    )