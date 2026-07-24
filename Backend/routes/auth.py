from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
import bcrypt

from database.database import get_db
from models.user import User
from schemas.user import UserLogin

router = APIRouter()


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