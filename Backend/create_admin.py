from database.database import SessionLocal
from models.user import User
import os
from dotenv import load_dotenv

load_dotenv()

db = SessionLocal()
existing_user = db.query(User).filter(
    User.username == "admin"
).first()

if existing_user:
    print("Admin user already exists")
else:
    admin = User(
        username=os.getenv("ADMIN_USERNAME"),
        password=os.getenv("ADMIN_PASSWORD")
    )
    db.add(admin)
    db.commit()
    db.refresh(admin)
    print("Admin Created Successfully")

db.close()