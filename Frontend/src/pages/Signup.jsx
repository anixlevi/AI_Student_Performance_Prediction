import { useState } from "react";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";
import {
    GraduationCap,
    Bot,
    BarChart3,
    Users,
    ShieldCheck,
    UserPlus,
    User,
    Mail,
    Lock,
    Loader2
} from "lucide-react";
import "../css/login.css";

function Signup() {

    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSignup = async (e) => {

        e.preventDefault();
        setError("");

        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        setLoading(true);

        try {

            await API.post("/signup", {
                username,
                email,
                password
            });

            navigate("/login");

        }
        catch (err) {

            console.log(err);

            const detail = err?.response?.data?.detail || "Signup failed. Please try again.";
            setError(detail);

        }
        finally {
            setLoading(false);
        }

    };

    return (

        <div className="login-page">

            <div className="blob blob-1"></div>
            <div className="blob blob-2"></div>
            <div className="blob blob-3"></div>

            {/* Left Side */}
            <div className="login-left">

                <div className="brand-badge">
                    <GraduationCap size={16} />
                    AI-Powered EdTech
                </div>

                <div className="brand">
                    <h1>AI Student <span>Performance</span></h1>
                    <p>
                        Predict Student Performance using Artificial Intelligence
                        and Machine Learning.
                    </p>
                </div>

                <div className="feature-box" style={{ marginTop: "32px" }}>

                    <div className="feature-card">
                        <div className="feature-icon">
                            <Bot size={20} />
                        </div>
                        <div>
                            <h4>AI Powered Prediction</h4>
                            <p>Smart ML models forecast outcomes</p>
                        </div>
                    </div>

                    <div className="feature-card">
                        <div className="feature-icon">
                            <BarChart3 size={20} />
                        </div>
                        <div>
                            <h4>Real-Time Dashboard</h4>
                            <p>Live insights at a glance</p>
                        </div>
                    </div>

                    <div className="feature-card">
                        <div className="feature-icon">
                            <Users size={20} />
                        </div>
                        <div>
                            <h4>Student Management</h4>
                            <p>Organize records effortlessly</p>
                        </div>
                    </div>

                    <div className="feature-card">
                        <div className="feature-icon">
                            <ShieldCheck size={20} />
                        </div>
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

                    <div className="login-icon">
                        <UserPlus size={26} color="white" />
                    </div>

                    <h2>Create Account</h2>

                    <p className="login-subtitle">
                        Sign up to start using the AI Student Performance Prediction System
                    </p>

                    {error && <div className="login-error">{error}</div>}

                    <form onSubmit={handleSignup}>

                        <div className="input-group">
                            <span className="input-icon">
                                <User size={18} />
                            </span>
                            <input
                                type="text"
                                placeholder="Choose a username"
                                className="login-input"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                        </div>

                        <div className="input-group">
                            <span className="input-icon">
                                <Mail size={18} />
                            </span>
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="login-input"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>

                        <div className="input-group">
                            <span className="input-icon">
                                <Lock size={18} />
                            </span>
                            <input
                                type="password"
                                placeholder="Choose a password"
                                className="login-input"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>

                        <div className="input-group">
                            <span className="input-icon">
                                <Lock size={18} />
                            </span>
                            <input
                                type="password"
                                placeholder="Confirm password"
                                className="login-input"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            className="login-btn"
                            disabled={loading}
                        >
                            {loading ? (
                                <>
                                    <Loader2 size={18} className="spin-icon" />
                                    Creating Account...
                                </>
                            ) : (
                                <>
                                    <UserPlus size={18} />
                                    Create Account
                                </>
                            )}
                        </button>

                    </form>

                    <div className="register-link">
                        Already have an account?
                        <span onClick={() => navigate("/login")}>
                            Login
                        </span>
                    </div>

                </div>

            </div>

        </div>

    );

}

export default Signup;