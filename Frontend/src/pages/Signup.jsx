import { useState } from "react";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";
import {
    GraduationCap,
    Bot,
    BarChart3,
    Users,
    ShieldCheck,
    User,
    Mail,
    Lock,
    UserPlus,
    Loader2
} from "lucide-react";
import "../css/login.css";

const features = [
    {
        icon: Bot,
        title: "AI Powered Prediction",
        short: "Smart ML models forecast outcomes",
        detail: "Our machine learning models analyze attendance, grades, and study patterns to predict student performance with high accuracy, helping educators intervene early."
    },
    {
        icon: BarChart3,
        title: "Real-Time Dashboard",
        short: "Live insights at a glance",
        detail: "Track class-wide and individual student trends through interactive charts that update instantly as new data comes in — no more waiting for weekly reports."
    },
    {
        icon: Users,
        title: "Student Management",
        short: "Organize records effortlessly",
        detail: "Add, edit, and manage student profiles, academic history, and performance records from a single, streamlined interface built for teachers and admins."
    },
    {
        icon: ShieldCheck,
        title: "Secure Authentication",
        short: "Your data, fully protected",
        detail: "Every login is protected with encrypted credentials and secure session handling, so student and institutional data stays private and safe."
    }
];

function Signup() {

    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const [activeFeature, setActiveFeature] = useState(null);

    const handleSignup = async (e) => {

        e.preventDefault();

        setErrorMsg("");

        if (password !== confirmPassword) {
            setErrorMsg("Passwords do not match");
            return;
        }

        setIsLoading(true);

        try {

            await API.post("/signup", {
                username,
                email,
                password
            });

            navigate("/login");

        }
        catch (error) {

            console.log(error);

            const detail = error?.response?.data?.detail || "Signup failed. Please try again.";
            setErrorMsg(detail);

        }
        finally {
            setIsLoading(false);
        }

    };

    return (

        <div className="login-page signup-page">

            <div className="blob blob-1"></div>
            <div className="blob blob-2"></div>
            <div className="blob blob-3"></div>

            {/* Left Side */}
            <div className="login-left">

                <div className="brand">

                    <div className="brand-badge">
                        <GraduationCap size={14} /> AI-Powered EdTech
                    </div>

                    <h1>Λ𝙸 𝚂𝚝𝚞𝚍𝚎𝚗𝚝 𝙿𝚎𝚛𝚏𝚘𝚛𝚖𝚊𝚗𝚌𝚎 <span>𝙿𝚎𝚛𝚏𝚘𝚛𝚖𝚊𝚗𝚌𝚎</span></h1>

                    <p>
                        Predict Student Performance using Artificial Intelligence and Machine Learning.
                    </p>

                </div>

                <div className="feature-layout">

                    <div className="feature-box">

                        {features.map((f, i) => {
                            const Icon = f.icon;
                            return (
                                <div
                                    key={i}
                                    className={`feature-card ${activeFeature === i ? "active" : ""}`}
                                    onMouseEnter={() => setActiveFeature(i)}
                                    onMouseLeave={() => setActiveFeature(null)}
                                >
                                    <span className="feature-icon"><Icon size={20} /></span>
                                    <div>
                                        <h4>{f.title}</h4>
                                        <p>{f.short}</p>
                                    </div>
                                </div>
                            );
                        })}

                    </div>

                    <div className={`feature-detail-panel ${activeFeature !== null ? "visible" : ""}`}>

                        {activeFeature !== null && (
                            <>
                                <div className="feature-detail-icon">
                                    {(() => {
                                        const Icon = features[activeFeature].icon;
                                        return <Icon size={26} />;
                                    })()}
                                </div>
                                <h3>{features[activeFeature].title}</h3>
                                <p>{features[activeFeature].detail}</p>
                            </>
                        )}

                        {activeFeature === null && (
                            <div className="feature-detail-placeholder">
                                <span>👋 Hover a feature to learn more</span>
                            </div>
                        )}

                    </div>

                </div>

            </div>

            {/* Right Side */}

            <div className="login-right">

                <div className="login-card">

                    <div className="login-icon"><UserPlus size={24} color="#fff" /></div>

                    <h2>Create Account</h2>

                    <p className="login-subtitle">
                        Sign up to start using the AI Student Performance Prediction System
                    </p>

                    {errorMsg && (
                        <div className="login-error">
                            ⚠️ {errorMsg}
                        </div>
                    )}

                    <form onSubmit={handleSignup}>

                        <div className="input-group">
                            <span className="input-icon"><User size={16} /></span>
                            <input
                                type="text"
                                placeholder="Choose a username"
                                className="login-input"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                disabled={isLoading}
                            />
                        </div>

                        <div className="input-group">
                            <span className="input-icon"><Mail size={16} /></span>
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="login-input"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                disabled={isLoading}
                            />
                        </div>

                        <div className="input-group">
                            <span className="input-icon"><Lock size={16} /></span>
                            <input
                                type="password"
                                placeholder="Choose a password"
                                className="login-input"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                disabled={isLoading}
                            />
                        </div>

                        <div className="input-group">
                            <span className="input-icon"><Lock size={16} /></span>
                            <input
                                type="password"
                                placeholder="Confirm password"
                                className="login-input"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                disabled={isLoading}
                            />
                        </div>

                        <button
                            type="submit"
                            className="login-btn"
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 size={18} className="spin-icon" />
                                    Creating Account...
                                </>
                            ) : (
                                <>
                                    <UserPlus size={18} /> Create Account
                                </>
                            )}
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