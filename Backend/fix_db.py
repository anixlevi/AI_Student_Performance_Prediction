from database.database import engine
from sqlalchemy import text

with engine.connect() as connection:
    connection.execute(text("ALTER TABLE students MODIFY final_marks FLOAT NULL;"))
    connection.execute(text("ALTER TABLE students MODIFY result VARCHAR(20) NULL;"))
    connection.commit()

print("Database updated successfully!")