"""
One-off script: adds `email` column to `users` table.
Run once: python add_email_column.py
Safe to run multiple times (checks if column already exists first).
"""

import os
from dotenv import load_dotenv
from sqlalchemy import create_engine, text

load_dotenv()

DB_USERNAME = os.getenv("DB_USERNAME")
DB_PASSWORD = os.getenv("DB_PASSWORD")
DB_HOST = os.getenv("DB_HOST")
DB_PORT = os.getenv("DB_PORT")
DB_DATABASE = os.getenv("DB_DATABASE")

DATABASE_URL = f"mysql+pymysql://{DB_USERNAME}:{DB_PASSWORD}@{DB_HOST}:{DB_PORT}/{DB_DATABASE}"

engine = create_engine(DATABASE_URL)

with engine.connect() as conn:
    # Check if column already exists
    result = conn.execute(text("""
        SELECT COUNT(*) FROM information_schema.columns
        WHERE table_schema = :db AND table_name = 'users' AND column_name = 'email'
    """), {"db": DB_DATABASE})
    exists = result.scalar()

    if exists:
        print("Column 'email' already exists in 'users' table. Nothing to do.")
    else:
        conn.execute(text("ALTER TABLE users ADD COLUMN email VARCHAR(255) NULL"))
        conn.commit()
        print("Column 'email' added successfully to 'users' table.")