from database.database import SessionLocal
from models.user import User
import os
from dotenv import load_dotenv

load_dotenv()

db = SessionLocal()
existing_user = db.query(User).filter(
    User.username == os.getenv("DEMO_USERNAME")
).first()

if existing_user:
    print("Demo user already exists")
else:
    demo_user = User(
        username=os.getenv("DEMO_USERNAME"),
        password=os.getenv("DEMO_PASSWORD")
    )
    db.add(demo_user)
    db.commit()
    db.refresh(demo_user)
    print("Demo user created successfully")

db.close()