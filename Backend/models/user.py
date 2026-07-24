from sqlalchemy import Column, Integer, String
from models.base import Base
class User(Base):
    __tablename__ = "users"
    id = Column(
        Integer,
        primary_key=True,
        index=True
    )
    username = Column(
        String(50),
        unique=True,
        nullable=False
    )
    email = Column(
        String(100),
        nullable=True
    )
    password = Column(
        String(100),
        nullable=False
    )