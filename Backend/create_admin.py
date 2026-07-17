from database.database import SessionLocal

from models.user import User


db = SessionLocal()


existing_user = db.query(User).filter(
    User.username == "admin"
).first()


if existing_user:

    print("Admin user already exists")


else:

    admin = User(

        username="Anix",

        password="REDACTED"

    )


    db.add(admin)

    db.commit()

    db.refresh(admin)


    print("Admin Created Successfully")


db.close()