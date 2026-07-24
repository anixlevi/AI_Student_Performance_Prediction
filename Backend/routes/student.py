from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from fastapi import BackgroundTasks
from utils.email_utils import send_welcome_email, send_prediction_result_email

from database.database import get_db
from models.student import Student as StudentModel

from schemas.student import Student
from schemas.predict import PredictionInput

from ml_model.model_loader import model

from fastapi.responses import FileResponse

from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.enums import TA_CENTER
from reportlab.platypus import (
    SimpleDocTemplate,
    Paragraph,
    Spacer,
    Table,
    TableStyle
)

from reportlab.lib import colors

import os


router = APIRouter()



# ================================
# REGISTER STUDENT
# ================================

@router.post("/register")
def register_student(
    student: Student,
    background_tasks: BackgroundTasks,
    db: Session = Depends(get_db)
):

    new_student = StudentModel(

        name = student.name,

        email = student.email,

        age = student.age,

        gender = student.gender,

        attendance = student.attendance,

        study_hours = student.study_hours,

        previous_marks = student.previous_marks,

        assignment_marks = student.assignment_marks,

        internal_marks = student.internal_marks,

        final_marks = student.final_marks,

        result = student.result

    )


    db.add(new_student)

    db.commit()

    db.refresh(new_student)

    if new_student.email:
        background_tasks.add_task(
            send_welcome_email,
            new_student.email,
            new_student.name
        )

    return {

        "message":"Student Registered Successfully",

        "student_id":new_student.student_id

    }


# ================================
# GET ALL STUDENTS
# ================================


@router.get("/students")
def get_all_students(
    db:Session = Depends(get_db)
):

    students = db.query(
        StudentModel
    ).all()


    return students




# ================================
# GET SINGLE STUDENT
# ================================


@router.get("/students/{student_id}")
def get_student(
    student_id:int,
    db:Session = Depends(get_db)
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
# ================================
# UPDATE STUDENT
# ================================


@router.put("/students/{student_id}")
def update_student(
    student_id:int,
    student:Student,
    db:Session = Depends(get_db)
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

        "message":"Student Updated Successfully",

        "student":existing_student

    }





# ================================
# DELETE STUDENT
# ================================


@router.delete("/students/{student_id}")
def delete_student(
    student_id:int,
    db:Session = Depends(get_db)
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

        "message":"Student Deleted Successfully"

    }





# ================================
# PREDICTION API
# ================================
@router.post("/predict")
def predict_marks(
    student: PredictionInput,
    background_tasks: BackgroundTasks,
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

    print(
        "Input:",
        student_data.age,
        student_data.attendance,
        student_data.study_hours,
        student_data.previous_marks,
        student_data.assignment_marks,
        student_data.internal_marks
    )

    prediction = model.predict([[
        student_data.age,
        student_data.attendance,
        student_data.study_hours,
        student_data.previous_marks,
        student_data.assignment_marks,
        student_data.internal_marks
    ]])

    print("Prediction:", prediction)

    predicted_marks = round(
        float(prediction[0]),
        2
    )

    student_data.predicted_result = predicted_marks

    db.commit()

    db.refresh(student_data)

    if student_data.email:
        is_low = predicted_marks < 50
        background_tasks.add_task(
            send_prediction_result_email,
            student_data.email,
            student_data.name,
            predicted_marks,
            is_low
        )

    return {

        "message": "Prediction Generated Successfully",

        "student_name": student_data.name,

        "student_id": student_data.student_id,

        "predicted_marks": predicted_marks

    }
# ================================
# PERFORMANCE FUNCTION
# ================================


def get_performance(marks):

    if marks >= 90:

        return "Excellent 🟢"


    elif marks >= 75:

        return "Good 🔵"


    elif marks >= 50:

        return "Average 🟡"


    else:

        return "Need Improvement 🔴"





# ================================
# STUDY SUGGESTION
# ================================


def get_study_suggestion(marks):

    if marks >= 90:

        return (
            "Excellent performance. "
            "Maintain your current study routine."
        )


    elif marks >= 75:

        return (
            "Good performance. "
            "Increase practice and revision."
        )


    elif marks >= 50:

        return (
            "Average performance. "
            "Increase study hours and focus on weak subjects."
        )


    else:

        return (
            "Performance needs improvement. "
            "Study regularly and practice daily."
        )





# ================================
# ATTENDANCE SUGGESTION
# ================================


def get_attendance_suggestion(attendance):

    if attendance >= 90:

        return (
            "Excellent attendance. Keep maintaining it."
        )


    elif attendance >= 75:

        return (
            "Attendance is good but try to improve it."
        )


    else:

        return (
            "Attendance is low. Attend regular classes."
        )





# ================================
# GOOD WISHES
# ================================


def get_good_wishes(marks):

    if marks >= 90:

        return (
            "Congratulations! Keep shining and achieve more."
        )


    elif marks >= 75:

        return (
            "Very good work. Keep improving."
        )


    elif marks >= 50:

        return (
            "Keep working hard. Better results are possible."
        )


    else:

        return (
            "Don't give up. Consistent effort will improve results."
        )
    # ================================
# DOWNLOAD COLOR PDF REPORT
# ================================


@router.get("/download-report/{student_id}")
def download_report(
    student_id:int,
    db:Session = Depends(get_db)
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



    filename = f"Student_Report_{student_id}.pdf"



    doc = SimpleDocTemplate(
        filename
    )



    styles = getSampleStyleSheet()



    title_style = ParagraphStyle(

        "title",

        parent=styles["Title"],

        alignment=TA_CENTER,

        textColor=colors.darkblue,

        fontSize=22

    )



    heading_style = ParagraphStyle(

        "heading",

        parent=styles["Heading2"],

        textColor=colors.darkgreen

    )



    normal_style = styles["Normal"]



    story = []



    marks = float(
        student.predicted_result or 0
    )



    performance = get_performance(
        marks
    )



    # Title

    story.append(

        Paragraph(

            "AI STUDENT PERFORMANCE REPORT",

            title_style

        )

    )



    story.append(
        Spacer(1,20)
    )





    # Student Details Table


    data = [

        ["Field","Details"],

        ["Name",student.name],

        ["Student ID",student.student_id],

        ["Age",student.age],

        ["Gender",student.gender],

        ["Attendance",f"{student.attendance}%"],

        ["Study Hours",student.study_hours],

        ["Predicted Marks",marks],

        ["Performance",performance]

    ]



    table = Table(
        data,
        colWidths=[150,250]
    )



    table.setStyle(

        TableStyle(

            [

                (
                    "BACKGROUND",
                    (0,0),
                    (-1,0),
                    colors.lightblue
                ),


                (
                    "TEXTCOLOR",
                    (0,0),
                    (-1,0),
                    colors.white
                ),


                (
                    "GRID",
                    (0,0),
                    (-1,-1),
                    1,
                    colors.grey
                ),


                (
                    "BACKGROUND",
                    (0,1),
                    (-1,-1),
                    colors.whitesmoke
                )

            ]

        )

    )



    story.append(table)



    story.append(
        Spacer(1,20)
    )




    # Suggestions


    story.append(

        Paragraph(

            "Study Improvement Suggestion",

            heading_style

        )

    )



    story.append(

        Paragraph(

            get_study_suggestion(marks),

            normal_style

        )

    )



    story.append(
        Spacer(1,15)
    )




    story.append(

        Paragraph(

            "Attendance Suggestion",

            heading_style

        )

    )



    story.append(

        Paragraph(

            get_attendance_suggestion(
                student.attendance
            ),

            normal_style

        )

    )



    story.append(
        Spacer(1,15)
    )




    story.append(

        Paragraph(

            "Good Wishes",

            heading_style

        )

    )



    story.append(

        Paragraph(

            get_good_wishes(marks),

            normal_style

        )

    )




    doc.build(
        story
    )



    return FileResponse(

        path=filename,

        filename=filename,

        media_type="application/pdf"

    )