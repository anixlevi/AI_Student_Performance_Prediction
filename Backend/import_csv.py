import pandas as pd
from sqlalchemy.orm import Session

from database.database import SessionLocal
from models.student import Student

# CSV File Read
df = pd.read_csv("../Dataset/student_performance.csv")

db: Session = SessionLocal()

for index, row in df.iterrows():

    student = Student(
        name=row["name"],
        age=int(row["age"]),
        gender=row["gender"],
        attendance=float(row["attendance"]),
        study_hours=float(row["study_hours"]),
        predicted_result=float(row["final_marks"])
    )

    db.add(student)

db.commit()
db.close()

print("✅ CSV Data Imported Successfully!")