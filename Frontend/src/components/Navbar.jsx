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
                        <linearGradient id="navRing" x1="0" y1="0" x2="128" y2="128" gradientUnits="userSpaceOnUse">
                            <stop offset="0" stopColor="#4338ca"/>
                            <stop offset="1" stopColor="#0891b2"/>
                        </linearGradient>
                        <linearGradient id="navChip" x1="0" y1="0" x2="128" y2="128" gradientUnits="userSpaceOnUse">
                            <stop offset="0" stopColor="#eef2ff"/>
                            <stop offset="1" stopColor="#ecfeff"/>
                        </linearGradient>
                    </defs>

                    <circle cx="64" cy="64" r="58" stroke="url(#navRing)" strokeWidth="5" fill="none"/>

                    <circle cx="64" cy="64" r="44" fill="url(#navChip)"/>

                    <circle cx="42" cy="52" r="4" fill="#4338ca"/>
                    <circle cx="64" cy="40" r="4" fill="#4338ca"/>
                    <circle cx="86" cy="52" r="4" fill="#0891b2"/>
                    <circle cx="64" cy="64" r="5" fill="#1e293b"/>

                    <path d="M42 52L64 64" stroke="#4338ca" strokeWidth="2.4" strokeLinecap="round"/>
                    <path d="M64 40L64 64" stroke="#4338ca" strokeWidth="2.4" strokeLinecap="round"/>
                    <path d="M86 52L64 64" stroke="#0891b2" strokeWidth="2.4" strokeLinecap="round"/>

                    <path d="M44 88L54 78L64 84L84 62" stroke="#16a34a" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round"/>
                    <circle cx="54" cy="78" r="2.6" fill="#16a34a"/>
                    <circle cx="64" cy="84" r="2.6" fill="#16a34a"/>
                    <circle cx="84" cy="62" r="2.6" fill="#16a34a"/>

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
