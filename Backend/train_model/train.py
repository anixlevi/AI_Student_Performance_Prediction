import pandas as pd
import numpy as np
import joblib
from sklearn.linear_model import LinearRegression
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_absolute_error
from sklearn.metrics import r2_score

data = pd.read_csv("../Dataset/student_performance.csv")

print(data.info())

# ---------------------------------------------------------------
# FIX 1: Add a handful of genuinely weak-student rows.
# The original dataset's weakest student still had previous_marks /
# assignment_marks / internal_marks around 40+, so the model never
# saw what a truly struggling student (marks in the 10-40 range)
# looks like. Without this, even a fixed model has nothing to learn
# the low end from.
# ---------------------------------------------------------------
np.random.seed(42)
n_weak = 25
weak_rows = pd.DataFrame({
    "age": np.random.choice([20, 21, 22, 23], size=n_weak),
    "attendance": np.random.randint(20, 55, size=n_weak),
    "study_hours": np.round(np.random.uniform(0.5, 2.5, size=n_weak), 1),
    "previous_marks": np.random.randint(10, 45, size=n_weak),
    "assignment_marks": np.random.randint(10, 45, size=n_weak),
    "internal_marks": np.random.randint(10, 45, size=n_weak),
})
# final_marks roughly follows the average of the three marks columns,
# same relationship the rest of the dataset already follows
weak_rows["final_marks"] = (
    weak_rows[["previous_marks", "assignment_marks", "internal_marks"]].mean(axis=1)
    + np.random.normal(0, 2, size=n_weak)
).round().clip(0, 100).astype(int)
weak_rows["result"] = weak_rows["final_marks"].apply(lambda m: "Pass" if m >= 60 else "Fail")

data = pd.concat([data, weak_rows], ignore_index=True)
print(f"\nAdded {n_weak} synthetic weak-student rows. New dataset size: {len(data)}")

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

# ---------------------------------------------------------------
# FIX 2: LinearRegression instead of RandomForestRegressor.
# RandomForest predicts by averaging the training rows nearest to
# an input -- it CANNOT extrapolate below the lowest values it saw
# in training. LinearRegression fits a formula, so it correctly
# scales down for inputs weaker than anything in the training set.
# This dataset is near-linear anyway (R2 > 0.99 either way), so
# nothing is lost in fit quality.
# ---------------------------------------------------------------
model = LinearRegression()
model.fit(X_train, y_train)

print("\nFeature Coefficients")
for feature, coef in zip(X.columns, model.coef_):
    print(feature, ":", round(coef, 3))

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

# ---------------------------------------------------------------
# Sanity check: prove a genuinely weak student now predicts below 50
# ---------------------------------------------------------------
very_weak = pd.DataFrame([{
    "age": 22, "attendance": 20, "study_hours": 0.5,
    "previous_marks": 10, "assignment_marks": 15, "internal_marks": 12
}])
print("\nSanity check - very weak student prediction:", model.predict(very_weak))

joblib.dump(model, "../student_model.pkl")

print("\nModel Saved Successfully")