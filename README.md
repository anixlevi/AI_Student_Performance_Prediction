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
---

# 🚀 Installation Guide

Follow these steps to run the project on your local machine.

## 1️⃣ Clone the Repository

```bash
git clone https://github.com/YOUR_GITHUB_USERNAME/AI_Student_Performance_Prediction.git
```

Replace `YOUR_GITHUB_USERNAME` with your actual GitHub username.

---

## 2️⃣ Backend Setup

Navigate to the backend folder:

```bash
cd Backend
```

Create a virtual environment:

```bash
python -m venv .venv
```

Activate the virtual environment:

### Windows

```bash
.venv\Scripts\activate
```

### Linux / macOS

```bash
source .venv/bin/activate
```

Install dependencies:

```bash
pip install -r requirements.txt
```

Start the FastAPI server:

```bash
uvicorn main:app --reload
```

Backend will run on:

```text
http://127.0.0.1:8000
```

---

## 3️⃣ Frontend Setup

Open another terminal and navigate to the frontend folder:

```bash
cd Frontend
```

Install dependencies:

```bash
npm install
```

Start the React application:

```bash
npm run dev
```

Frontend will run on:

```text
http://localhost:5173
```

---

## 4️⃣ Database Setup

- Install MySQL Server.
- Create a database named:

```sql
student_prediction_db
```

- Update your database configuration in the backend.
- Import the student dataset if required.

---

## 5️⃣ Access the Application

Frontend:

```text
http://localhost:5173
```

Backend API:

```text
http://127.0.0.1:8000
```

FastAPI Documentation:

```text
http://127.0.0.1:8000/docs
```
---

# 📡 API Endpoints

The backend is built using **FastAPI** and provides RESTful APIs for managing students and predicting academic performance.

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/register` | Register a new student |
| GET | `/students` | Retrieve all registered students |
| GET | `/student/{id}` | Get details of a specific student |
| POST | `/predict` | Predict student final marks using the AI model |
| GET | `/download-report/{student_id}` | Download the student's prediction report |

## 🔍 API Documentation

FastAPI automatically generates interactive API documentation.

### Swagger UI

```text
http://127.0.0.1:8000/docs
```

### ReDoc

```text
http://127.0.0.1:8000/redoc
```

## 📥 Example Prediction Request

```json
{
  "age": 20,
  "attendance": 92,
  "study_hours": 5,
  "previous_marks": 81,
  "assignment_marks": 85,
  "internal_marks": 78
}
```

## 📤 Example Prediction Response

```json
{
  "predicted_marks": 84.23
}
```
