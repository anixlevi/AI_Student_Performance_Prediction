import { Link, useLocation } from "react-router-dom";

import {
    FaHome,
    FaUserPlus,
    FaBrain,
    FaChartBar,
    FaFilePdf,
    FaInfoCircle
} from "react-icons/fa";

import "../css/Sidebar.css";

function Sidebar() {

    const location = useLocation();

    return (

        <div className="sidebar">

            <div className="logo">

                <h2>🤖 AI Student</h2>

                <p>Performance Prediction</p>

            </div>

            <ul>

                <li className={location.pathname === "/" ? "active" : ""}>

                    <Link to="/">

                        <FaHome />

                        <span>Dashboard</span>

                    </Link>

                </li>

                <li className={location.pathname === "/register" ? "active" : ""}>

                    <Link to="/register">

                        <FaUserPlus />

                        <span>Register Student</span>

                    </Link>

                </li>

                <li className={location.pathname === "/prediction" ? "active" : ""}>

                    <Link to="/prediction">

                        <FaBrain />

                        <span>AI Prediction</span>

                    </Link>

                </li>

                <li className={location.pathname === "/analytics" ? "active" : ""}>

                    <Link to="/analytics">

                        <FaChartBar />

                        <span>Analytics</span>

                    </Link>

                </li>

                <li className={location.pathname === "/reports" ? "active" : ""}>

                    <Link to="/reports">

                        <FaFilePdf />

                        <span>Reports</span>

                    </Link>

                </li>

                <li className={location.pathname === "/about" ? "active" : ""}>

                    <Link to="/about">

                        <FaInfoCircle />

                        <span>About</span>

                    </Link>

                </li>

            </ul>

        </div>

    );

}

export default Sidebar;