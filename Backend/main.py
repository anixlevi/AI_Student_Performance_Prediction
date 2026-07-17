from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from pydantic import BaseModel

import joblib
import numpy as np


# Database
from database.database import engine

# Models
from models.base import Base
import models.student


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

    age: int

    attendance: float

    study_hours: float

    previous_marks: float

    assignment_marks: float

    internal_marks: float



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


    input_data = np.array(
        [
            [
                data.age,
                data.attendance,
                data.study_hours,
                data.previous_marks,
                data.assignment_marks,
                data.internal_marks
            ]
        ]
    )


    prediction = model.predict(input_data)


    return {

        "predicted_score": float(prediction[0])

    }