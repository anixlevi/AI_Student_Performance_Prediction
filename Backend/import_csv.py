import pandas as pd
from sqlalchemy.orm import Session

from database.database import SessionLocal
from models.student import Student

# CSV Read
df = pd.read_csv("Dataset/student_performance.csv")

db: Session = SessionLocal()

count = 0

for index, row in df.iterrows():

    existing = db.query(Student).filter(
        Student.name == row["name"],
        Student.age == int(row["age"])
    ).first()

    if existing:
        continue

    student = Student(
        name=row["name"],
        age=int(row["age"]),
        gender=row["gender"],
        attendance=float(row["attendance"]),
        study_hours=float(row["study_hours"]),
        previous_marks=float(row["previous_marks"]),
        assignment_marks=float(row["assignment_marks"]),
        internal_marks=float(row["internal_marks"]),
        final_marks=float(row["final_marks"]),
        result=row["result"],
        predicted_result=float(row["final_marks"])
    )

    db.add(student)
    count += 1

db.commit()
db.close()

print(f"✅ {count} New Students Imported Successfully!")