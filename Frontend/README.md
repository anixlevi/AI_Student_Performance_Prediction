# 🎓 AI Student Performance Prediction System

> An AI-powered web application that predicts student academic performance using Machine Learning, FastAPI, React, and MySQL.

---

## 📌 Project Overview

The **AI Student Performance Prediction System** helps educational institutions analyze student performance based on attendance, study hours, and other academic factors.

The system uses a trained **Machine Learning model** to predict student marks and generate intelligent performance reports.

---

# 🚀 Features

- 👨‍🎓 Student Registration
- 🔐 Secure Login Authentication
- 📊 Interactive Dashboard
- 🤖 AI Performance Prediction
- 📄 PDF Report Generation
- 🔍 Student Search
- 📈 Performance Analytics
- 📱 Responsive UI
- 💾 MySQL Database
- ⚡ FastAPI Backend
- 🎨 React Frontend

---

# 🛠 Tech Stack

### Frontend

- React.js
- Bootstrap
- Axios
- React Router

### Backend

- FastAPI
- SQLAlchemy
- Pydantic
- Uvicorn

### Database

- MySQL

### AI / Machine Learning

- Python
- Scikit-Learn
- Pandas
- NumPy
- Joblib

---

# 📂 Project Structure

```text
AI_Student_Performance_Prediction/

│
├── Backend/
│   ├── routes/
│   ├── database/
│   ├── models/
│   ├── train_model/
│   └── main.py
│
├── Frontend/
│   ├── src/
│   ├── public/
│   └── package.json
│
└── README.md
```

---

# ✨ Modules

- Home Page
- Student Registration
- Login Authentication
- Dashboard
- Student Management
- AI Prediction
- PDF Report Generation

---

# 🤖 AI Prediction Workflow

```
Student Details
        │
        ▼
Machine Learning Model
        │
        ▼
Predicted Marks
        │
        ▼
Performance Analysis
        │
        ▼
PDF Report
```

---

# 📊 Dashboard

The dashboard provides:

- Total Students
- Average Attendance
- Average Study Hours
- Average Predicted Marks
- Charts & Analytics

---

# 📄 PDF Reports

The system automatically generates professional student performance reports including:

- Student Information
- Predicted Marks
- Performance Status
- AI Suggestions

---

# ⚙ Installation

## Clone Repository

```bash
git clone https://github.com/anixlevi/AI_Student_Performance_Prediction.git
```

---

## Backend

```bash
cd Backend

python -m venv venv

venv\Scripts\activate

pip install -r requirements.txt

uvicorn main:app --reload
```

---

## Front