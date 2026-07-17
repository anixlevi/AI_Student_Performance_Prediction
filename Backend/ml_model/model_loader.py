import joblib
import os


# Current file ka location
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


# Model file ka path
MODEL_PATH = os.path.join(
    BASE_DIR,
    "student_model.pkl"
)


# Load AI model
model = joblib.load(MODEL_PATH)


print("AI Model Loaded Successfully")