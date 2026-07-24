import pandas as pd
import numpy as np

np.random.seed(42)

# Load original dataset
data = pd.read_csv("student_performance.csv")

print("Before:")
print(data[["previous_marks", "assignment_marks", "internal_marks", "final_marks"]].head())

# Add small random noise to input features (real-world measurement variation)
data["attendance"] = data["attendance"] + np.random.normal(0, 1.5, size=len(data))
data["attendance"] = data["attendance"].clip(0, 100).round().astype(int)

data["study_hours"] = data["study_hours"] + np.random.normal(0, 0.5, size=len(data))
data["study_hours"] = data["study_hours"].clip(0, 12).round(1)

# Add realistic noise to final_marks (students don't perform 100% predictably)
noise = np.random.normal(0, 6, size=len(data))
data["final_marks"] = data["final_marks"] + noise
data["final_marks"] = data["final_marks"].clip(0, 100).round().astype(int)

print("\nAfter:")
print(data[["previous_marks", "assignment_marks", "internal_marks", "final_marks"]].head())

# Save as new file (keeps original safe)
data.to_csv("student_performance_realistic.csv", index=False)
print("\nSaved as student_performance_realistic.csv")