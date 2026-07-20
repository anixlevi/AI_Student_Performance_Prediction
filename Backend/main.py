from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from pydantic import BaseModel

import joblib
import numpy as np


# Database
from database.database import engine, SessionLocal

# Models
from models.base import Base
from models.student import Student


# Routes
from routes.student import router as student_router
from routes.auth import router as auth_router



# Create Database Tables
Base.metadata.create_all(bind=engine)



app = FastAPI(
    title="AI Student Performance Prediction System",
    version="1.0"
)



# Load AI Model

model = joblib.load("student_model.pkl")

print("AI Model Loaded Successfully")



# CORS Configuration

app.add_middleware(

    CORSMiddleware,

    allow_origins=[
        "http://localhost:5173",
        "http://localhost:5174"
    ],

    allow_credentials=True,

    allow_methods=["*"],

    allow_headers=["*"]

)




# Prediction Schema

class PredictionInput(BaseModel):

    student_id:int





# Register Routes

app.include_router(student_router)
app.include_router(auth_router)





@app.get("/")
def home():

    return {

        "message":"Backend Running Successfully"

    }





@app.post("/predict")
def predict(data: PredictionInput):


    print("Predict API Hit")



    db = SessionLocal()



    student = db.query(Student).filter(

        Student.student_id == data.student_id

    ).first()



    if not student:


        db.close()


        return {

            "error":"Student not found"

        }



    input_data = np.array(

        [[

            student.age,

            student.attendance,

            student.study_hours,

            student.previous_marks,

            student.assignment_marks,

            student.internal_marks

        ]]

    )



    prediction = model.predict(input_data)



    marks = round(

        float(prediction[0]),

        2

    )




    if marks >= 90:


        performance = "Excellent 🟢"



    elif marks >= 75:


        performance = "Good 🔵"



    elif marks >= 50:


        performance = "Average 🟡"



    else:


        performance = "Need Improvement 🔴"





    db.close()




    return {


        "student_name":student.name,


        "predicted_marks":marks,


        "performance":performance


    }