import { useState } from "react";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";
import "../css/login.css";

function Signup() {

    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleSignup = async (e) => {

        e.preventDefault();

        if (password !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }

        try {

            await API.post("/signup", {
                username,
                password
            });

            alert("Account created successfully! Please log in.");

            navigate("/login");

        }
        catch (error) {

            console.log(error);

            const detail = error?.response?.data?.detail || "Signup Failed";
            alert(detail);

        }

    };

    return (

        <div className="login-page">

            {/* Left Side */}
            <div className="login-left">

                <div className="brand">

                    <h1>🎓 AI Student Performance Prediction</h1>

                    <p>
                        Predict Student Performance using Artificial Intelligence
                        and Machine Learning.
                    </p>

                </div>

                <div className="feature-box">

                    <div className="feature-card">
                        🤖 AI Powered Prediction
                    </div>

                    <div className="feature-card">
                        📊 Real-Time Dashboard
                    </div>

                    <div className="feature-card">
                        👨‍🎓 Student Management
                    </div>

                    <div className="feature-card">
                        🔒 Secure Authentication
                    </div>

                </div>

            </div>

            {/* Right Side */}

            <div className="login-right">

                <div className="login-card">

                    <h2>Create Account 📝</h2>

                    <p className="login-subtitle">
                        Sign up to start using the AI Student Performance Prediction System
                    </p>

                    <form onSubmit={handleSignup}>

                        <input
                            type="text"
                            placeholder="Choose a username"
                            className="login-input"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />

                        <input
                            type="password"
                            placeholder="Choose a password"
                            className="login-input"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />

                        <input
                            type="password"
                            placeholder="Confirm password"
                            className="login-input"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />

                        <button
                            type="submit"
                            className="login-btn"
                        >
                            📝 Create Account
                        </button>

                    </form>

                    <div className="register-link">

                        Already have an account?

                        <span onClick={() => navigate("/login")} style={{ cursor: "pointer" }}>
                            Login
                        </span>

                    </div>

                </div>

            </div>

        </div>

    );

}

export default Signup;
