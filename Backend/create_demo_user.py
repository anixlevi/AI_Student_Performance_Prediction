from database.database import SessionLocal
from models.user import User
import os
import bcrypt
from dotenv import load_dotenv

load_dotenv()

db = SessionLocal()
existing_user = db.query(User).filter(
    User.username == os.getenv("DEMO_USERNAME")
).first()

if existing_user:
    print("Demo user already exists")
else:
    plain_password = os.getenv("DEMO_PASSWORD")
    hashed_password = bcrypt.hashpw(
        plain_password.encode("utf-8"),
        bcrypt.gensalt()
    ).decode("utf-8")

    demo_user = User(
        username=os.getenv("DEMO_USERNAME"),
        password=hashed_password
    )
    db.add(demo_user)
    db.commit()
    db.refresh(demo_user)
    print("Demo user created successfully")

db.close()