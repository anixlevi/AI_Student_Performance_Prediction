import { useState } from "react";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";
import "../css/login.css";

function Login() {

    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async (e) => {

        e.preventDefault();

        try {

            const response = await API.post("/login", {
                username,
                password
            });

            alert("Login Successful");

            localStorage.setItem(
                "username",
                response.data.username
            );

            navigate("/home");

        }
        catch (error) {

            console.log(error);

            alert("Login Failed");

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

                    <h2>Welcome Back 👋</h2>

                    <p className="login-subtitle">
                        Login to continue using the AI Student Performance Prediction System
                    </p>

                    <form onSubmit={handleLogin}>

                        <input
                            type="text"
                            placeholder="Username"
                            className="login-input"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />

                        <input
                            type="password"
                            placeholder="Password"
                            className="login-input"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />

                        <div className="login-options">

                            <label>
                                <input type="checkbox" /> Remember Me
                            </label>

                            <a href="#">
                                Forgot Password?
                            </a>

                        </div>

                        <button
                            type="submit"
                            className="login-btn"
                        >
                            🔐 Login
                        </button>

                    </form>

                    <div className="register-link">

                        Don't have an account?

                        <span>
                            Register Now
                        </span>

                    </div>

                </div>

            </div>

        </div>

    );

}

export default Login;