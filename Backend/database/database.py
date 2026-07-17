from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base


# ==========================
# MySQL Configuration
# ==========================

USERNAME = "root"
PASSWORD = "REDACTED"
HOST = "localhost"
PORT = "3306"
DATABASE = "student_prediction_db"


DATABASE_URL = (
    f"mysql+pymysql://{USERNAME}:{PASSWORD}@{HOST}:{PORT}/{DATABASE}"
)


engine = create_engine(
    DATABASE_URL,
    echo=True
)


SessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine
)


Base = declarative_base()


def get_db():

    db = SessionLocal()

    try:
        yield db

    finally:
        db.close()