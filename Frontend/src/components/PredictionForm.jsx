import { useState } from "react";
import API from "../api/api";
import "../css/PredictionForm.css";


function PredictionForm() {

    const [data, setData] = useState({

        student_id: "",
        name: "",
        age: "",
        attendance: "",
        study_hours: "",
        previous_marks: "",
        internal_marks: "",
        assignment_marks: ""

    });

    const [result, setResult] = useState({

        student_name: "",
        student_id: "",
        predicted_marks: ""

    });

    const [loading, setLoading] = useState(false);

    const [error, setError] = useState("");



    // ==========================
    // Handle Input
    // ==========================

    const handleChange = (e) => {

        setData({

            ...data,

            [e.target.name]: e.target.value

        });

    };



    // ==========================
    // Performance
    // ==========================

    const getPerformance = (marks) => {

        if (marks >= 90)

            return "Excellent 🟢";

        else if (marks >= 75)

            return "Good 🔵";

        else if (marks >= 50)

            return "Average 🟡";

        else

            return "Need Improvement 🔴";

    };



    // ==========================
    // Study Suggestion
    // ==========================

    const getStudySuggestion = (marks) => {

        if (marks >= 90) {

            return "Excellent performance! Maintain your current study schedule.";

        }

        else if (marks >= 75) {

            return "Good performance. Increase study time by 1 hour daily.";

        }

        else if (marks >= 50) {

            return "Revise daily and solve more practice questions.";

        }

        else {

            return "Focus on fundamentals and study consistently for 3-4 hours.";

        }

    };



    // ==========================
    // Attendance Suggestion
    // ==========================

    const getAttendanceSuggestion = (attendance) => {

        if (attendance >= 90)

            return "Excellent attendance. Keep it up.";

        else if (attendance >= 75)

            return "Try to improve attendance above 85%.";

        else

            return "Low attendance. Attend classes regularly.";

    };
        // ==========================
    // AI Prediction
    // ==========================

    const handlePredict = () => {

        setLoading(true);

        setError("");

        setResult({

            student_name: "",

            student_id: "",

            predicted_marks: ""

        });

        API.post("/predict", {

            student_id: Number(data.student_id),

            age: Number(data.age),

            attendance: Number(data.attendance),

            study_hours: Number(data.study_hours),

            previous_marks: Number(data.previous_marks),

            assignment_marks: Number(data.assignment_marks),

            internal_marks: Number(data.internal_marks)

        })

        .then((response) => {

            setResult({

                student_name: response.data.student_name,

                student_id: response.data.student_id,

                predicted_marks: response.data.predicted_marks

            });

        })

        .catch((error) => {

            console.log(error);

            if (error.response) {

                setError(error.response.data.detail || "Prediction Failed");

            }

            else {

                setError("Backend Connection Failed");

            }

        })

        .finally(() => {

            setLoading(false);

        });

    };



    // ==========================
    // Clear Form
    // ==========================

    const clearForm = () => {

        setData({

            student_id: "",
            name: "",
            age: "",
            attendance: "",
            study_hours: "",
            previous_marks: "",
            internal_marks: "",
            assignment_marks: ""

        });

        setResult({

            student_name: "",

            student_id: "",

            predicted_marks: ""

        });

        setError("");

    };



    // ==========================
    // Download PDF
    // ==========================

    const downloadReport = () => {

        if (!data.student_id) {

            alert("Please Enter Student ID");

            return;

        }

        window.open(

            `http://127.0.0.1:8000/download-report/${data.student_id}`,

            "_blank"

        );

    };
        return (

        <div className="prediction-form">

            <div className="prediction-header">

                <h1>🤖 AI Student Performance Prediction</h1>

                <p>

                    Enter the student details below and let the AI model
                    predict the expected academic performance.

                </p>

            </div>

            <div className="input-grid">

                <div className="form-group">

                    <label>Student ID</label>

                    <input

                        type="number"

                        name="student_id"

                        value={data.student_id}

                        onChange={handleChange}

                        placeholder="Enter Student ID"

                    />

                </div>

                <div className="form-group">

                    <label>Student Name</label>

                    <input

                        type="text"

                        name="name"

                        value={data.name}

                        onChange={handleChange}

                        placeholder="Enter Student Name"

                    />

                </div>

                <div className="form-group">

                    <label>Age</label>

                    <input

                        type="number"

                        name="age"

                        value={data.age}

                        onChange={handleChange}

                        placeholder="Enter Age"

                    />

                </div>

                <div className="form-group">

                    <label>Attendance (%)</label>

                    <input

                        type="number"

                        name="attendance"

                        value={data.attendance}

                        onChange={handleChange}

                        placeholder="Attendance"

                    />

                </div>

                <div className="form-group">

                    <label>Study Hours</label>

                    <input

                        type="number"

                        step="0.1"

                        name="study_hours"

                        value={data.study_hours}

                        onChange={handleChange}

                        placeholder="Study Hours"

                    />

                </div>

                <div className="form-group">

                    <label>Previous Marks</label>

                    <input

                        type="number"

                        name="previous_marks"

                        value={data.previous_marks}

                        onChange={handleChange}

                        placeholder="Previous Marks"

                    />

                </div>

                <div className="form-group">

                    <label>Internal Marks</label>

                    <input

                        type="number"

                        name="internal_marks"

                        value={data.internal_marks}

                        onChange={handleChange}

                        placeholder="Internal Marks"

                    />

                </div>

                <div className="form-group">

                    <label>Assignment Marks</label>

                    <input

                        type="number"

                        name="assignment_marks"

                        value={data.assignment_marks}

                        onChange={handleChange}

                        placeholder="Assignment Marks"

                    />

                </div>

            </div>
                        <div className="button-area">

                <button

                    className="predict-btn"

                    onClick={handlePredict}

                    disabled={loading}

                >

                    {

                        loading

                            ? "🤖 AI Predicting..."

                            : "🚀 Predict Result"

                    }

                </button>

                <button

                    className="clear-btn"

                    onClick={clearForm}

                >

                    🗑 Clear

                </button>

                <button

                    className="download-btn"

                    onClick={downloadReport}

                >

                    📄 Download PDF Report

                </button>

            </div>



            {

                error && (

                    <div className="error-card">

                        <h3>

                            ❌ Prediction Failed

                        </h3>

                        <p>

                            {error}

                        </p>

                    </div>

                )

            }
                        {

                result.predicted_marks && (

                    <div className="result-card">

                        <h2>

                            🎯 AI Prediction Result

                        </h2>

                        <div className="result-info">

                            <div>

                                <strong>Student Name</strong>

                                <p>{result.student_name}</p>

                            </div>

                            <div>

                                <strong>Student ID</strong>

                                <p>{result.student_id}</p>

                            </div>

                            <div>

                                <strong>Predicted Marks</strong>

                                <p>{result.predicted_marks} / 100</p>

                            </div>

                            <div>

                                <strong>Performance</strong>

                                <p>

                                    {

                                        getPerformance(

                                            Number(result.predicted_marks)

                                        )

                                    }

                                </p>

                            </div>

                        </div>



                        <div className="suggestion">

                            <h3>

                                📚 AI Study Suggestion

                            </h3>

                            <p>

                                {

                                    getStudySuggestion(

                                        Number(result.predicted_marks)

                                    )

                                }

                            </p>

                        </div>



                        <div className="suggestion">

                            <h3>

                                ✅ Attendance Suggestion

                            </h3>

                            <p>

                                {

                                    getAttendanceSuggestion(

                                        Number(data.attendance)

                                    )

                                }

                            </p>

                        </div>



                        <div className="suggestion">

                            <h3>

                                💡 AI Recommendation

                            </h3>

                            <p>

                                Improve your daily consistency,

                                revise previous topics,

                                practice mock tests every week,

                                and maintain regular attendance

                                to achieve better academic performance.

                            </p>

                        </div>



                        <div className="suggestion">

                            <h3>

                                🌟 Motivation

                            </h3>

                            <p>

                                Success comes from consistent effort,

                                not from perfection.

                                Keep learning,

                                stay disciplined,

                                and believe in yourself.

                                Best of Luck! 🚀

                            </p>

                        </div>

                    </div>

                )

            }

        </div>

    );

}

export default PredictionForm;