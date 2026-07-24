import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";
import Navbar from "../components/Navbar";
import "../css/RegisterStudent.css";


function Register() {

    const navigate = useNavigate();

    const [student, setStudent] = useState({
        name: "",
        email: "",
        age: "",
        gender: "",
        attendance: "",
        study_hours: "",
        previous_marks: "",
        assignment_marks: "",
        internal_marks: "",
        final_marks: "",
        result: ""
    });

    const [successMessage, setSuccessMessage] = useState("");
    const [registeredId, setRegisteredId] = useState(null);

    const handleChange = (e) => {
        setStudent({
            ...student,
            [e.target.name]: e.target.value
        });
    };

    const resetFormOnly = () => {
        setStudent({
            name: "",
            email: "",
            age: "",
            gender: "",
            attendance: "",
            study_hours: "",
            previous_marks: "",
            assignment_marks: "",
            internal_marks: "",
            final_marks: "",
            result: ""
        });
    };

    const handleClear = () => {
        resetFormOnly();
        setSuccessMessage("");
        setRegisteredId(null);
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            const response = await API.post("/register", student);

            setSuccessMessage(
                "✅ Student registered successfully! Student ID: " + response.data.student_id
            );
            setRegisteredId(response.data.student_id);

            resetFormOnly();

        }
        catch (error) {

            console.log(error);
            alert("Registration Failed");

        }

    };

    return (
        <>
            <Navbar />

            <div className="register-container">

                <div className="register-card">

                    <h1>
                        <svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ verticalAlign: "middle", marginRight: "10px" }}>
                            <path d="M12 3L22 8L12 13L2 8L12 3Z" fill="#334155" />
                            <path d="M6 10.5V16C6 16 8.5 18.5 12 18.5C15.5 18.5 18 16 18 16V10.5" stroke="#334155" strokeWidth="1.6" strokeLinejoin="round" fill="none" />
                            <path d="M22 8V15" stroke="#334155" strokeWidth="1.8" strokeLinecap="round" />
                            <circle cx="22" cy="16.5" r="1.4" fill="#334155" />
                        </svg>
                        Student Registration
                    </h1>

                    <p>
                        Fill in the student details to add them to the system.
                    </p>

                    <form onSubmit={handleSubmit}>

                        <div className="form-grid">

                            <div className="form-group">
                                <label>Student Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Enter student name"
                                    value={student.name}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="form-group">
                                <label>Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Enter email address"
                                    value={student.email}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="form-group">
                                <label>Age</label>
                                <input
                                    type="number"
                                    name="age"
                                    placeholder="Enter age"
                                    value={student.age}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="form-group">
                                <label>Gender</label>
                                <select
                                    name="gender"
                                    value={student.gender}
                                    onChange={handleChange}
                                >
                                    <option value="">Select gender</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>

                            <div className="form-group">
                                <label>Attendance %</label>
                                <input
                                    type="number"
                                    name="attendance"
                                    placeholder="Enter attendance"
                                    value={student.attendance}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="form-group">
                                <label>Study Hours</label>
                                <input
                                    type="number"
                                    name="study_hours"
                                    placeholder="Enter study hours"
                                    value={student.study_hours}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="form-group">
                                <label>Previous Marks</label>
                                <input
                                    type="number"
                                    name="previous_marks"
                                    placeholder="Enter previous marks"
                                    value={student.previous_marks}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="form-group">
                                <label>Assignment Marks</label>
                                <input
                                    type="number"
                                    name="assignment_marks"
                                    placeholder="Enter assignment marks"
                                    value={student.assignment_marks}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="form-group">
                                <label>Internal Marks</label>
                                <input
                                    type="number"
                                    name="internal_marks"
                                    placeholder="Enter internal marks"
                                    value={student.internal_marks}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="form-group">
                                <label>Final Marks</label>
                                <input
                                    type="number"
                                    name="final_marks"
                                    placeholder="Enter final marks"
                                    value={student.final_marks}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="form-group">
                                <label>Result</label>
                                <input
                                    type="text"
                                    name="result"
                                    placeholder="Pass / Fail"
                                    value={student.result}
                                    onChange={handleChange}
                                />
                            </div>

                        </div>

                        <div className="button-group">

                            <button type="submit" className="register-btn">
                                Register Student
                            </button>

                            <button type="button" className="clear-btn" onClick={handleClear}>
                                Clear Form
                            </button>

                        </div>

                        {
                            successMessage &&
                            <div className="success-message">

                                <p style={{ margin: 0 }}>
                                    {successMessage}
                                </p>

                                <p style={{ marginTop: "8px", marginBottom: 0, fontSize: "14px" }}>
                                    👉 Next step: Go to the Prediction page and select
                                    Student ID <b>{registeredId}</b> to predict their performance.
                                </p>

                                <button
                                    type="button"
                                    onClick={() => navigate("/prediction", { state: { autoSelectId: registeredId } })}
                                    style={{
                                        marginTop: "12px",
                                        padding: "10px 18px",
                                        background: "#6c5ce7",
                                        color: "white",
                                        border: "none",
                                        borderRadius: "6px",
                                        cursor: "pointer",
                                        fontWeight: "600"
                                    }}
                                >
                                    Go to Prediction →
                                </button>

                            </div>
                        }

                    </form>

                </div>

            </div>
        </>
    );

}

export default Register;
