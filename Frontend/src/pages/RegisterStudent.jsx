import { useState } from "react";
import axios from "axios";

function RegisterStudent() {

    const [student, setStudent] = useState({
        name: "",
        age: "",
        gender: "",
        attendance: "",
        study_hours: "",
        previous_marks: "",
        assignment_marks: "",
        internal_marks: ""
    });

    const handleChange = (e) => {
        setStudent({
            ...student,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            // Register Student
            const registerResponse = await axios.post(
                "http://127.0.0.1:8000/register",
                {
                    name: student.name,
                    age: Number(student.age),
                    gender: student.gender,
                    attendance: Number(student.attendance),
                    study_hours: Number(student.study_hours)
                }
            );

            // Get Student ID from Backend
            const studentId = registerResponse.data.student_id;

            // Predict Marks Automatically
            const predictResponse = await axios.post(
                "http://127.0.0.1:8000/predict",
                {
                    student_id: studentId,
                    age: Number(student.age),
                    attendance: Number(student.attendance),
                    study_hours: Number(student.study_hours),
                    previous_marks: Number(student.previous_marks),
                    assignment_marks: Number(student.assignment_marks),
                    internal_marks: Number(student.internal_marks)
                }
            );

            alert(
                "✅ Student Registered Successfully\n\nPredicted Marks : " +
                predictResponse.data.predicted_marks
            );

            // Clear Form
            setStudent({
                name: "",
                age: "",
                gender: "",
                attendance: "",
                study_hours: "",
                previous_marks: "",
                assignment_marks: "",
                internal_marks: ""
            });

        } catch (error) {

            console.log(error);

            alert("❌ Registration / Prediction Failed");

        }

    };

    return (
    <div className="container mt-5">

        <div className="row justify-content-center">

            <div className="col-md-6">

                <div className="card shadow p-4">

                    <h2 className="text-center mb-4">
                        Student Registration
                    </h2>

                    <form onSubmit={handleSubmit}>

                        <input
                            type="text"
                            className="form-control mb-3"
                            name="name"
                            placeholder="Enter Name"
                            value={student.name}
                            onChange={handleChange}
                        />

                        <input
                            type="number"
                            className="form-control mb-3"
                            name="age"
                            placeholder="Enter Age"
                            value={student.age}
                            onChange={handleChange}
                        />

                        <input
                            type="text"
                            className="form-control mb-3"
                            name="gender"
                            placeholder="Enter Gender"
                            value={student.gender}
                            onChange={handleChange}
                        />

                        <input
                            type="number"
                            className="form-control mb-3"
                            name="attendance"
                            placeholder="Attendance"
                            value={student.attendance}
                            onChange={handleChange}
                        />

                        <input
                            type="number"
                            className="form-control mb-3"
                            name="study_hours"
                            placeholder="Study Hours"
                            value={student.study_hours}
                            onChange={handleChange}
                        />

                        <input
                            type="number"
                            className="form-control mb-3"
                            name="previous_marks"
                            placeholder="Previous Marks"
                            value={student.previous_marks}
                            onChange={handleChange}
                        />

                        <input
                            type="number"
                            className="form-control mb-3"
                            name="assignment_marks"
                            placeholder="Assignment Marks"
                            value={student.assignment_marks}
                            onChange={handleChange}
                        />

                        <input
                            type="number"
                            className="form-control mb-3"
                            name="internal_marks"
                            placeholder="Internal Marks"
                            value={student.internal_marks}
                            onChange={handleChange}
                        />

                        <div className="d-grid">

                            <button
                                type="submit"
                                className="btn btn-primary"
                            >
                                Register Student & Predict Marks
                            </button>

                        </div>

                    </form>

                </div>

            </div>

        </div>

    </div>
);

}

export default RegisterStudent;