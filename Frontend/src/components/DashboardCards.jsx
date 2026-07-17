import { useEffect, useState } from "react";
import API from "../api/api";

import {
    FaUserGraduate,
    FaClipboardCheck,
    FaBrain
} from "react-icons/fa";

import "../css/DashboardCards.css";

function DashboardCards() {

    const [students, setStudents] = useState([]);

    useEffect(() => {

        API.get("/students")
            .then((response) => {

                setStudents(response.data);

            })
            .catch((error) => {

                console.log(error);

            });

    }, []);

    const totalStudents = students.length;

    const averageAttendance =
        totalStudents > 0
            ? (
                students.reduce(
                    (sum, student) => sum + student.attendance,
                    0
                ) / totalStudents
            ).toFixed(1)
            : 0;

    const totalPredictions =
        students.filter(
            (student) => student.predicted_result !== null
        ).length;

    const cards = [

        {
            title: "Total Students",
            value: totalStudents,
            icon: <FaUserGraduate />,
            color: "#2563eb"
        },

        {
            title: "Attendance",
            value: averageAttendance + "%",
            icon: <FaClipboardCheck />,
            color: "#10b981"
        },

        {
            title: "Predictions",
            value: totalPredictions,
            icon: <FaBrain />,
            color: "#ef4444"
        }

    ];

    return (

        <div className="dashboard-cards">

            {

                cards.map((card, index) => (

                    <div
                        className="dashboard-card"
                        key={index}
                    >

                        <div
                            className="card-icon"
                            style={{
                                background: card.color
                            }}
                        >

                            {card.icon}

                        </div>

                        <div>

                            <h4>

                                {card.title}

                            </h4>

                            <h2>

                                {card.value}

                            </h2>

                        </div>

                    </div>

                ))

            }

        </div>

    );

}

export default DashboardCards;