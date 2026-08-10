import { useState, useEffect } from "react";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";
import {
    GraduationCap,
    Bot,
    BarChart3,
    Users,
    ShieldCheck,
    Mail,
    Lock,
    LogIn,
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

function Login() {

    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const [showPatience, setShowPatience] = useState(false);
    const [activeFeature, setActiveFeature] = useState(null);

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

                    <div className="login-icon"><Lock size={24} color="#fff" /></div>

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
                            <span className="input-icon"><Mail size={16} /></span>
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
                            <span className="input-icon"><Lock size={16} /></span>
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
                                    <Loader2 size={18} className="spin-icon" />
                                    Logging in...
                                </>
                            ) : (
                                <>
                                    <LogIn size={18} /> Login
                                </>
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