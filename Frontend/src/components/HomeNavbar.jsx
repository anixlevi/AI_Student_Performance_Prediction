import { NavLink, useNavigate } from "react-router-dom";
import "../css/navbar.css";

function HomeNavbar() {

    const navigate = useNavigate();

    const username = localStorage.getItem("username");

    const logout = () => {

        localStorage.removeItem("username");

        navigate("/auth/login");

    };

    return (

        <nav className="navbar navbar-expand-lg navbar-dark px-4">

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
                        <linearGradient id="homeNavRing" x1="0" y1="0" x2="128" y2="128" gradientUnits="userSpaceOnUse">
                            <stop offset="0" stopColor="#4338ca"/>
                            <stop offset="1" stopColor="#0891b2"/>
                        </linearGradient>
                        <linearGradient id="homeNavChip" x1="0" y1="0" x2="128" y2="128" gradientUnits="userSpaceOnUse">
                            <stop offset="0" stopColor="#eef2ff"/>
                            <stop offset="1" stopColor="#ecfeff"/>
                        </linearGradient>
                    </defs>

                    <circle cx="64" cy="64" r="58" stroke="url(#homeNavRing)" strokeWidth="5" fill="none"/>

                    <circle cx="64" cy="64" r="44" fill="url(#homeNavChip)"/>

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
                    end
                    className={({ isActive }) =>
                        isActive
                            ? "btn btn-outline-light mx-2 nav-active"
                            : "btn btn-outline-light mx-2"
                    }
                >

                    <svg className="btn-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M4 11L12 4L20 11" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M6 9.5V19C6 19.6 6.4 20 7 20H17C17.6 20 18 19.6 18 19V9.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M10 20V15C10 14.4 10.4 14 11 14H13C13.6 14 14 14.4 14 15V20" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>

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

                    <svg className="btn-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7 3H15C16.1 3 17 3.9 17 5V21L12 18.5L7 21V5C7 3.9 7.9 3 7 3Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round"/>
                        <path d="M9.5 8H14.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"/>
                        <path d="M9.5 11.5H14.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"/>
                    </svg>

                    Register

                </NavLink>

                {

                    username ? (

                        <>

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

                    ) : (

                        <NavLink
                            to="/auth/login"
                            className={({ isActive }) =>
                                isActive
                                    ? "btn btn-success mx-2 nav-active"
                                    : "btn btn-success mx-2"
                            }
                        >

                            <svg className="btn-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect x="5" y="11" width="14" height="9" rx="2" stroke="currentColor" strokeWidth="1.7"/>
                                <path d="M8 11V7.5C8 5 9.8 3.5 12 3.5C14.2 3.5 16 5 16 7.5V11" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"/>
                            </svg>

                            Login

                        </NavLink>

                    )

                }

            </div>

        </nav>

    );

}

export default HomeNavbar;
