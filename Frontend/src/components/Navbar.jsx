import { NavLink, useNavigate } from "react-router-dom";
import "../css/navbar.css";

function Navbar() {

    const navigate = useNavigate();

    const username = localStorage.getItem("username");

    const logout = () => {

        localStorage.removeItem("username");

        navigate("/login");

    };

    return (

        <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4">

            {/* Logo */}
            <NavLink
                className="navbar-brand"
                to="/home"
            >

                <svg
                    className="brand-icon"
                    viewBox="0 0 128 128"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <defs>
                        <style>
                            {`
                                .cap-bg { fill: #7CC0F0; stroke: #FFFFFF; stroke-width: 2.5; stroke-linejoin: round; }
                                .cap-base { fill: #7CC0F0; stroke: #FFFFFF; stroke-width: 2.5; stroke-linejoin: round; }
                                .tassel { fill: none; stroke: #FFFFFF; stroke-width: 1.5; }
                                .tassel-tip { fill: #7CC0F0; stroke: #FFFFFF; stroke-width: 1.5; }

                                .predict-arrow { fill: #F26B6B; stroke: #FFFFFF; stroke-width: 3; stroke-linejoin: round; stroke-linecap: round; }
                                .trend-line { fill: none; stroke: #FFFFFF; stroke-width: 1.5; stroke-linecap: round; }
                                .trend-dot { fill: #FFFFFF; }

                                .ai-wire { fill: none; stroke: #FFFFFF; stroke-width: 1.5; stroke-linejoin: round; }
                                .ai-dot { fill: #94A3B8; stroke: #FFFFFF; stroke-width: 1; }
                            `}
                        </style>
                    </defs>

                    <g transform="translate(10, 15)">
                        <path className="cap-bg" d="M 54,25 L 102,48 L 54,71 L 6,48 Z" />
                        <path className="cap-base" d="M 26,57 L 26,78 C 26,85 82,85 82,78 L 82,57" />
                        <path className="tassel" d="M 54,48 L 92,58 L 92,72" />
                        <polygon className="tassel-tip" points="89,72 95,72 96,82 88,82" />

                        <path className="predict-arrow" d="M 22,88 L 38,68 L 52,80 L 74,48 L 70,45 L 85,41 L 86,57 L 81,54 L 60,88 Z" />

                        <path className="trend-line" d="M 27,84 L 39,70 L 52,81 L 71,54" />
                        <circle className="trend-dot" cx="27" cy="84" r="1.5" />
                        <circle className="trend-dot" cx="39" cy="70" r="1.5" />
                        <circle className="trend-dot" cx="52" cy="81" r="1.5" />
                        <circle className="trend-dot" cx="71" cy="54" r="1.5" />

                        <g transform="translate(74, 20)">
                            <path className="ai-wire" d="M 10,18 L 22,8 L 34,15 L 25,28 L 8,24 L 10,18 Z" />
                            <path className="ai-wire" d="M 22,8 L 25,28 M 10,18 L 25,28 M 8,24 L 22,8 M 34,15 L 8,24" />
                            <line x1="20" y1="18" x2="10" y2="18" className="ai-wire" />
                            <line x1="20" y1="18" x2="22" y2="8" className="ai-wire" />
                            <line x1="20" y1="18" x2="34" y2="15" className="ai-wire" />
                            <line x1="20" y1="18" x2="25" y2="28" className="ai-wire" />
                            <line x1="20" y1="18" x2="8" y2="24" className="ai-wire" />

                            <circle className="ai-dot" cx="10" cy="18" r="2.2" />
                            <circle className="ai-dot" cx="22" cy="8" r="2.2" />
                            <circle className="ai-dot" cx="34" cy="15" r="2.2" />
                            <circle className="ai-dot" cx="25" cy="28" r="2.2" />
                            <circle className="ai-dot" cx="8" cy="24" r="2.2" />
                            <circle className="ai-dot" cx="20" cy="18" r="2.8" />
                        </g>
                    </g>
                </svg>

                <span>
                    AI Prediction
                </span>

            </NavLink>

            <div className="ms-auto nav-links">

                {/* Home */}
                <NavLink
                    to="/home"
                    className={({ isActive }) =>
                        isActive
                            ? "btn btn-outline-light mx-2 nav-active"
                            : "btn btn-outline-light mx-2"
                    }
                >
                    Home
                </NavLink>

                {/* Register */}
                <NavLink
                    to="/register"
                    className={({ isActive }) =>
                        isActive
                            ? "btn btn-outline-light mx-2 nav-active"
                            : "btn btn-outline-light mx-2"
                    }
                >
                    Register
                </NavLink>

                {username && (
                    <>

                        <NavLink
                            to="/dashboard"
                            className={({ isActive }) =>
                                isActive
                                    ? "btn btn-outline-light mx-2 nav-active"
                                    : "btn btn-outline-light mx-2"
                            }
                        >
                            Dashboard
                        </NavLink>

                        <NavLink
                            to="/students"
                            className={({ isActive }) =>
                                isActive
                                    ? "btn btn-outline-light mx-2 nav-active"
                                    : "btn btn-outline-light mx-2"
                            }
                        >
                            Students
                        </NavLink>

                        <NavLink
                            to="/prediction"
                            className={({ isActive }) =>
                                isActive
                                    ? "btn btn-outline-light mx-2 nav-active"
                                    : "btn btn-outline-light mx-2"
                            }
                        >
                            Prediction
                        </NavLink>

                        <span className="user-chip mx-3">

                            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="12" cy="8" r="3.4" stroke="currentColor" strokeWidth="1.6"/>
                                <path d="M5 19C5 15.5 8.1 13 12 13C15.9 13 19 15.5 19 19" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
                            </svg>

                            {username}

                        </span>

                        <button
                            className="btn btn-danger"
                            onClick={logout}
                        >
                            Logout
                        </button>

                    </>
                )}

                {!username && (
                    <NavLink
                        to="/login"
                        className={({ isActive }) =>
                            isActive
                                ? "btn btn-success mx-2 nav-active"
                                : "btn btn-success mx-2"
                        }
                    >
                        Login
                    </NavLink>
                )}

            </div>

        </nav>

    );

}

export default Navbar;