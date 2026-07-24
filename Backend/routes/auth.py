from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
import bcrypt
from database.database import get_db
from models.user import User
from schemas.user import UserLogin, UserCreate

router = APIRouter()


@router.post("/signup")
def register_user(
    user: UserCreate,
    db: Session = Depends(get_db)
):
    existing_user = db.query(User).filter(
        User.username == user.username
    ).first()

    if existing_user is not None:
        raise HTTPException(
            status_code=400,
            detail="Username already exists"
        )

    hashed_password = bcrypt.hashpw(
        user.password.encode("utf-8"),
        bcrypt.gensalt()
    ).decode("utf-8")

    new_user = User(
        username=user.username,
        password=hashed_password
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return {
        "message": "User Registered Successfully",
        "username": new_user.username
    }


@router.post("/login")
def login(
    user: UserLogin,
    db: Session = Depends(get_db)
):
    existing_user = db.query(User).filter(
        User.username == user.username
    ).first()
    if existing_user is None:
        raise HTTPException(
            status_code=404,
            detail="User Not Found"
        )
    password_matches = bcrypt.checkpw(
        user.password.encode("utf-8"),
        existing_user.password.encode("utf-8")
    )
    if not password_matches:
        raise HTTPException(
            status_code=401,
            detail="Invalid Password"
        )
    return {
        "message": "Login Successful",
        "username": existing_user.username
    }