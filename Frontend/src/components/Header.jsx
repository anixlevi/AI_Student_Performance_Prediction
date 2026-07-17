import {
    FaBell,
    FaSearch,
    FaCalendarAlt
} from "react-icons/fa";

import { MdAdminPanelSettings } from "react-icons/md";

import "../css/Header.css";

function Header() {

    const today = new Date();

    const date = today.toLocaleDateString("en-GB", {
        weekday: "short",
        day: "numeric",
        month: "short",
        year: "numeric"
    });

    return (

        <header className="header">

            <div className="header-left">

                <h1>AI Student Performance Prediction</h1>

                <span>Dashboard</span>

            </div>

            <div className="header-center">

                <div className="header-search">

                    <FaSearch />

                    <input
                        type="text"
                        placeholder="Search Student..."
                    />

                </div>

            </div>

            <div className="header-right">

                <div className="date">

                    <FaCalendarAlt />

                    <span>{date}</span>

                </div>

                <div className="notification">

                    <FaBell />

                    <span className="badge">3</span>

                </div>

                <div className="profile">

                    <MdAdminPanelSettings />

                    <div>

                        <h4>Admin</h4>

                        <p>System Manager</p>

                    </div>

                </div>

            </div>

        </header>

    );

}

export default Header;