#ΛI Sƚυԃҽɳƚ Pҽɾϝσɾɱαɳƈҽ Pɾҽԃιƈƚισɳ Sყʂƚҽɱ

An AI-powered web application that predicts student academic performance using Machine Learning and provides an interactive dashboard for student management, analytics, and performance reporting.

---

## 📖 Project Description

The AI Student Performance Prediction System is a full-stack web application designed to help educational institutions predict students' academic performance using Artificial Intelligence and Machine Learning.

The system collects academic information such as attendance, study hours, previous marks, assignment marks, and internal marks. Using a trained Random Forest Machine Learning model, it predicts the student's expected final marks.

The application also includes a modern dashboard for student registration, data management, prediction analysis, charts, and downloadable reports.

This project demonstrates the integration of Machine Learning with a React frontend, FastAPI backend, and MySQL database to build a real-world educational analytics platform.
---

## ✨ Features

- 👨‍🎓 Student Registration and Management
- 🤖 AI-Based Student Performance Prediction
- 📊 Interactive Dashboard with Charts
- 📈 Student Performance Analytics
- 📋 Student Records Management
- 📄 Downloadable Prediction Reports
- 🔍 Search and Filter Students
- 💻 Responsive User Interface
- ⚡ FastAPI REST API Integration
- 🗄️ MySQL Database Integration
- 🌐 Modern React + Vite Frontend
---

# 🛠️ Tech Stack

## Frontend
- React.js
- Vite
- Bootstrap 5
- CSS3
- Axios
- React Router DOM
- Recharts

## Backend
- FastAPI
- SQLAlchemy
- Pydantic
- Uvicorn

## Machine Learning
- Python
- Scikit-learn
- Random Forest Regressor
- Pandas
- NumPy
- Joblib

## Database
- MySQL

## Version Control
- Git
- GitHub

## Development Tools
- Visual Studio Code
- Postman
---

# 📁 Project Structure

```text
AI_Student_Performance_Prediction/
│
├── Backend/
│   ├── main.py
│   ├── database.py
│   ├── models.py
│   ├── schemas.py
│   ├── requirements.txt
│   └── ...
│
├── Frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── vite.config.js
│
├── Dataset/
│   └── student_performance.csv
│
├── ML/
│   ├── train.py
│   └── student_model.pkl
│
└── README.md
```
---

# 🤖 Machine Learning Model

This project uses the **Random Forest Regressor** algorithm from **Scikit-learn** to predict students' final academic performance based on their academic records.

## Input Features

The model is trained using the following student attributes:

- Age
- Attendance (%)
- Study Hours
- Previous Marks
- Assignment Marks
- Internal Marks

## Output

The trained model predicts the student's **Expected Final Marks**.

## Model Workflow

1. Load the student dataset.
2. Preprocess and clean the data.
3. Select input features and target variable.
4. Train the Random Forest Regressor model.
5. Save the trained model using Joblib.
6. Load the model in the FastAPI backend.
7. Generate predictions for new student records.

## Libraries Used

- Scikit-learn
- Pandas
- NumPy
- Joblib

## Why Random Forest?

- High prediction accuracy
- Handles non-linear relationships
- Reduces overfitting
- Works well with structured datasets
- Provides stable and reliable predictions
---

# ⚙️ System Architecture

```text
                    +----------------------+
                    |      React.js UI     |
                    |   (Frontend - Vite)  |
                    +----------+-----------+
                               |
                               | REST API (Axios)
                               ▼
                    +----------------------+
                    |   FastAPI Backend    |
                    |  (Business Logic)    |
                    +----------+-----------+
                               |
               +---------------+---------------+
               |                               |
               ▼                               ▼
      +------------------+           +----------------------+
      | Machine Learning |           |     MySQL Database   |
      | Random Forest    |           | Student Information  |
      +------------------+           +----------------------+
               |
               ▼
      +----------------------+
      | Prediction Result    |
      | Dashboard & Reports  |
      +----------------------+
```

## 🔄 Application Workflow

1. User enters student details through the React frontend.
2. The frontend sends the data to the FastAPI backend using REST APIs.
3. The backend validates the input data.
4. The trained Random Forest model processes the input.
5. The predicted final marks are generated.
6. Prediction results are stored in the MySQL database.
7. The dashboard displays analytics, charts, and reports.
