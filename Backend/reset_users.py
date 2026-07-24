from database.database import SessionLocal
from models.user import User

db = SessionLocal()
db.query(User).delete()
db.commit()
db.close()
print("All users deleted successfully")