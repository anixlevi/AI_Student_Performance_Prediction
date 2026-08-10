import { useState, useEffect } from "react";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";
import "../css/login.css";

function Login() {

    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const [showPatience, setShowPatience] = useState(false);

    // Show "please be patient" message only if loading takes longer than 2.5s
    useEffect(() => {
        let timer;
        if (isLoading) {
            timer = setTimeout(() => setShowPatience(true), 2500);
        } else {
            setShowPatience(false);
        }
        return () => clearTimeout(timer);
    }, [isLoading]);

    const handleLogin = async (e) => {

        e.preventDefault();

        setErrorMsg("");
        setIsLoading(true);

        try {

            const response = await API.post("/login", {
                email,
                password
            });

            localStorage.setItem(
                "username",
                response.data.username
            );

            navigate("/home");

        }
        catch (error) {

            console.log(error);

            setErrorMsg("Invalid email or password. Please try again.");
            setIsLoading(false);

        }

    };

    return (

        <div className="login-page">

            {/* Animated background blobs */}
            <div className="blob blob-1"></div>
            <div className="blob blob-2"></div>
            <div className="blob blob-3"></div>

            {/* Left Side */}
            <div className="login-left">

                <div className="brand">

                    <div className="brand-badge">🎓 AI-Powered EdTech</div>

                    <h1>AI Student Performance <span>Prediction</span></h1>

                    <p>
                        Predict Student Performance using Artificial Intelligence
                        and Machine Learning.
                    </p>

                </div>

                <div className="feature-box">

                    <div className="feature-card">
                        <span className="feature-icon">🤖</span>
                        <div>
                            <h4>AI Powered Prediction</h4>
                            <p>Smart ML models forecast outcomes</p>
                        </div>
                    </div>

                    <div className="feature-card">
                        <span className="feature-icon">📊</span>
                        <div>
                            <h4>Real-Time Dashboard</h4>
                            <p>Live insights at a glance</p>
                        </div>
                    </div>

                    <div className="feature-card">
                        <span className="feature-icon">👨‍🎓</span>
                        <div>
                            <h4>Student Management</h4>
                            <p>Organize records effortlessly</p>
                        </div>
                    </div>

                    <div className="feature-card">
                        <span className="feature-icon">🔒</span>
                        <div>
                            <h4>Secure Authentication</h4>
                            <p>Your data, fully protected</p>
                        </div>
                    </div>

                </div>

            </div>

            {/* Right Side */}

            <div className="login-right">

                <div className="login-card">

                    <div className="login-icon">🔐</div>

                    <h2>Welcome Back</h2>

                    <p className="login-subtitle">
                        Login to continue using the AI Student Performance Prediction System
                    </p>

                    {errorMsg && (
                        <div className="login-error">
                            ⚠️ {errorMsg}
                        </div>
                    )}

                    {showPatience && (
                        <div className="login-patience">
                            ⏳ Please be patient — our backend server is waking up,
                            this may take a few seconds.
                        </div>
                    )}

                    <form onSubmit={handleLogin}>

                        <div className="input-group">
                            <span className="input-icon">✉️</span>
                            <input
                                type="email"
                                placeholder="Email"
                                className="login-input"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                disabled={isLoading}
                            />
                        </div>

                        <div className="input-group">
                            <span className="input-icon">🔑</span>
                            <input
                                type="password"
                                placeholder="Password"
                                className="login-input"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                disabled={isLoading}
                            />
                        </div>

                        <div className="login-options">

                            <label>
                                <input type="checkbox" disabled={isLoading} /> Remember Me
                            </label>

                            <a href="#">
                                Forgot Password?
                            </a>

                        </div>

                        <button
                            type="submit"
                            className="login-btn"
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <>
                                    <span className="spinner"></span>
                                    Logging in...
                                </>
                            ) : (
                                <>🔐 Login</>
                            )}
                        </button>

                    </form>

                    <div className="register-link">

                        Don't have an account?

                        <span onClick={() => navigate("/auth/signup")} style={{ cursor: "pointer" }}>
                            Register Now
                        </span>

                    </div>

                </div>

            </div>

        </div>

    );

}

export default Login;