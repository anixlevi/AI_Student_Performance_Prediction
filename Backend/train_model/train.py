import pandas as pd
import joblib
from sklearn.ensemble import RandomForestRegressor
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_absolute_error
from sklearn.metrics import r2_score


data = pd.read_csv("../Dataset/student_performance.csv")

print(data.info())
X = data[[
    "age",
    "attendance",
    "study_hours",
    "previous_marks",
    "assignment_marks",
    "internal_marks"
]]

y = data["final_marks"]

print(X.head())

print(y.head())

X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.2,
    random_state=42
)

model = RandomForestRegressor(random_state=42)
model.fit(X_train, y_train)
prediction = model.predict(X_test)

print(prediction)

print("\nActual Marks:")
print(y_test.values)

print("\nPredicted Marks:")
print(prediction)

mae = mean_absolute_error(y_test, prediction)

print("\nMean Absolute Error (MAE):", mae)

r2 = r2_score(y_test, prediction)

print("\nR2 Score:", r2)

print("Training Data :", len(X_train))

print("Testing Data :", len(X_test))

print("Training Target :", len(y_train))

print("Testing Target :", len(y_test))

joblib.dump(model, "student_model.pkl")

print("\nModel Saved Successfully")