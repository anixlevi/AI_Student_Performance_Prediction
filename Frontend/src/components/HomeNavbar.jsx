import { NavLink, useNavigate } from "react-router-dom";
import "../css/navbar.css";

function HomeNavbar() {

    const navigate = useNavigate();

    const username = localStorage.getItem("username");

    const logout = () => {

        localStorage.removeItem("username");

        navigate("/login");

    };

    return (

        <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4">

            <NavLink
                className="navbar-brand"
                to="/"
            >
                🎓 AI Prediction
            </NavLink>

            <div className="ms-auto">

                <NavLink
                    to="/"
                    className={({ isActive }) =>
                        isActive
                            ? "btn btn-outline-light mx-2 nav-active"
                            : "btn btn-outline-light mx-2"
                    }
                >
                    Home
                </NavLink>

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

                {

                    username ? (

                        <>

                            <span className="text-white mx-3">
                                👤 {username}
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
                            to="/login"
                            className={({ isActive }) =>
                                isActive
                                    ? "btn btn-success mx-2 nav-active"
                                    : "btn btn-success mx-2"
                            }
                        >
                            Login
                        </NavLink>

                    )

                }

            </div>

        </nav>

    );

}

export default HomeNavbar;