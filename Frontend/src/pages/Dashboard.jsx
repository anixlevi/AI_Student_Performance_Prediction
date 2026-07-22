import { useEffect, useState } from "react";
import API from "../api/axios";
import "../css/Dashboard.css";


import Navbar from "../components/Navbar";

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    ArcElement,
    Tooltip,
    Legend
} from "chart.js";

import { Bar, Pie } from "react-chartjs-2";

import {
    FaUserGraduate,
    FaRobot,
    FaChartLine,
    FaStar,
    FaMedal,
    FaBrain
} from "react-icons/fa";


ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    ArcElement,
    Tooltip,
    Legend
);



function Dashboard(){


    const [students, setStudents] = useState([]);



    useEffect(()=>{

        getStudents();

    },[]);



    const getStudents = async()=>{

        try{

            const response = await API.get("/students");

            setStudents(response.data);


        }
        catch(error){

            console.log(error);

        }

    };



    const totalStudents = students.length;



    const averageAttendance = students.length
    ?
    (
        students.reduce(
            (sum,s)=>sum+s.attendance,
            0
        )
        /
        students.length

    ).toFixed(2)

    :
    0;




    const highestPrediction = students.length
    ?
    Math.max(
        ...students.map(
            s=>s.predicted_result || 0
        )
    )
    :
    0;



    const predictedStudents = students.filter(
        s=>s.predicted_result != null
    ).length;



    const averagePrediction = predictedStudents
    ?
    (
        students
        .filter(
            s=>s.predicted_result != null
        )
        .reduce(
            (sum,s)=>sum+s.predicted_result,
            0
        )
        /
        predictedStudents

    ).toFixed(2)

    :
    0;



    const attendanceData = {


        labels: students.map(
            student=>student.name
        ),


        datasets:[

            {

                label:"Attendance",

                data:students.map(
                    student=>student.attendance
                ),

                backgroundColor:"#2563eb",

                borderRadius:8

            }

        ]

    };



    const passFailData = {


        labels:[
            "Pass",
            "Fail"
        ],


        datasets:[

            {

                data:[

                    students.filter(
                        s=>s.result?.toLowerCase()==="pass"
                    ).length,


                    students.filter(
                        s=>s.result?.toLowerCase()==="fail"
                    ).length

                ],


                backgroundColor:[

                    "#16a34a",

                    "#dc2626"

                ]

            }

        ]

    };
    
return (

<>


<Navbar/>



<div className="dashboard">


{/* Hero Section */}

<div className="hero">

    <div className="hero-left">

        <div className="hero-icon">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
                <path d="M12 3L2 8l10 5 8-4.2V15h1.5V8L12 3z" fill="#4f46e5"/>
                <path d="M5.5 10.7v4.3c0 1.7 2.9 3 6.5 3s6.5-1.3 6.5-3v-4.3L12 13z" fill="#7c3aed"/>
            </svg>
        </div>

        <h1>

            Λ𝙸 𝚂𝚝𝚞𝚍𝚎𝚗𝚝 𝙿𝚎𝚛𝚏𝚘𝚛𝚖𝚊𝚗𝚌𝚎 𝙿𝚛𝚎𝚍𝚒𝚌𝚝𝚒𝚘𝚗 𝚂𝚢𝚜𝚝𝚎𝚖

        </h1>

            <p >
                🚀 Predict • Analyze • Improve — Powered by Machine Learning
            </p>

        <div className="tech-badges">

            <span className="tech-badge tech-react">⚛️ REACT</span>
            <span className="tech-badge tech-fastapi">🔺 FASTAPI</span>
            <span className="tech-badge tech-python">🐍 PYTHON</span>
            <span className="tech-badge tech-mysql">🗄️ MYSQL</span>

        </div>

    </div>



    <div className="hero-right">

        <p className="subtitle">

            Smart Academic Analytics Powered by Artificial Intelligence

        </p>

    </div>


</div>
    {/* Statistics Cards */}


    <div className="cards">



        <div className="card blue">


            <FaUserGraduate className="icon"/>


            <h3>
                Total Students
            </h3>


            <h2>
                {totalStudents}
            </h2>


        </div>





        <div className="card green">


            <FaRobot className="icon"/>


            <h3>
                AI Status
            </h3>


            <h2>
                Online 🟢
            </h2>


        </div>





        <div className="card purple">


            <FaChartLine className="icon"/>


            <h3>
                Average Attendance
            </h3>


            <h2>
                {averageAttendance}%
            </h2>


        </div>





        <div className="card orange">


            <FaStar className="icon"/>


            <h3>
                Highest Prediction
            </h3>


            <h2>
                {highestPrediction}
            </h2>


        </div>



    </div>






    {/* Second Row Cards */}



    <div className="cards second-row">



        <div className="card dark">


            <FaBrain className="icon"/>


            <h3>
                Predictions Generated
            </h3>


            <h2>
                {predictedStudents}
            </h2>


        </div>





        <div className="card sky">


            <FaMedal className="icon"/>


            <h3>
                Average Prediction
            </h3>


            <h2>
                {averagePrediction}
            </h2>


        </div>



    </div>
        {/* Charts */}


    <div className="chart-grid">



        <div className="chart-card small-chart">


            <h2>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" style={{marginRight:"8px",verticalAlign:"middle"}}>
                    <rect x="3" y="14" width="2" height="7" fill="#34d399"/>
                    <rect x="6.5" y="10" width="2" height="11" fill="#34d399"/>
                    <rect x="10" y="6" width="2" height="15" fill="#34d399"/>
                    <rect x="13.5" y="9" width="2" height="12" fill="#34d399"/>
                    <rect x="17" y="4" width="2" height="17" fill="#34d399"/>
                    <path d="M3 19l4.5-4.5 3.5 3 5-6 4-4" stroke="#4f46e5" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
                    <circle cx="3" cy="19" r="2" fill="#4f46e5"/>
                    <circle cx="7.5" cy="14.5" r="2" fill="#4f46e5"/>
                    <circle cx="11" cy="17.5" r="2" fill="#4f46e5"/>
                    <circle cx="16" cy="11.5" r="2" fill="#4f46e5"/>
                    <circle cx="20" cy="7.5" r="2" fill="#4f46e5"/>
                    </svg> Attendance Analytics
            </h2>



            <Bar

                data={attendanceData}

                height={180}

                options={{

                    responsive:true,

                    maintainAspectRatio:false,


                    plugins:{

                        legend:{

                            display:false

                        }

                    },


                    scales:{

                        y:{

                            beginAtZero:true,

                            max:100

                        }

                    }

                }}

            />


        </div>





        <div className="chart-card small-chart">


            <h2>
                🥧 Pass vs Fail
            </h2>



            <Pie

                data={passFailData}

                height={180}


                options={{

                    responsive:true,

                    maintainAspectRatio:false,


                    plugins:{

                        legend:{

                            position:"bottom"

                        }

                    }

                }}

            />


        </div>


    </div>





    {/* Recent Students */}



    <div className="recent">



        <div className="recent-header">


            <h2>
                📋 Recently Added Students
            </h2>



            <span>
                Showing Last 5 Records
            </span>


        </div>





        {

            students

            .slice(-5)

            .reverse()

            .map((student)=>(



                <div

                    className="student-box"

                    key={student.student_id}

                >



                    <div className="student-left">



                        <div className="avatar">


                            {student.name.charAt(0)}


                        </div>





                        <div>


                            <h3>

                                {student.name}

                            </h3>



                            <p>

                                Student ID :

                                <strong>

                                    {" "}

                                    {student.student_id}

                                </strong>

                            </p>


                        </div>


                    </div>







                    <div className="student-center">


                        <p>
                            Attendance
                        </p>


                        <strong>

                            {student.attendance}%

                        </strong>


                    </div>







                    <div className="student-center">


                        <p>
                            Study Hours
                        </p>


                        <strong>

                            {student.study_hours} hrs

                        </strong>


                    </div>







                    <div className="student-center">


                        <p>
                            Prediction
                        </p>


                        <strong>


                            {

                                student.predicted_result

                                ?

                                student.predicted_result

                                :

                                "Pending"

                            }


                        </strong>


                    </div>




                </div>



            ))

        }



    </div>
        {/* AI Insights */}


    <div className="insight-section">



        <div className="insight-card">


            <h2>
                🤖 AI Insights
            </h2>



            <ul>


                <li>

                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" style={{marginRight:"8px",verticalAlign:"middle"}}>
                        <path d="M12 3L4 7l8 4 8-4-8-4z" fill="#7dd3f0" stroke="#4b5563" strokeWidth="1"/>
                        <path d="M18 8v3.5" stroke="#4b5563" strokeWidth="1" strokeLinecap="round"/>
                        <circle cx="18" cy="12.3" r="0.8" fill="#4b5563"/>
                        <path d="M8 9.5v2.5a4 4 0 0 0 8 0V9.5" stroke="#4b5563" strokeWidth="1" fill="none"/>
                        <path d="M10.5 15v2l1.5 1.5 1.5-1.5v-2" fill="#7dd3f0" stroke="#4b5563" strokeWidth="1"/>
                        <path d="M5.5 21v-1.5A4.5 4.5 0 0 1 10 15h4a4.5 4.5 0 0 1 4.5 4.5V21" stroke="#4b5563" strokeWidth="1" fill="none"/>
                        <path d="M8.5 19v1.5M15.5 19v1.5" stroke="#4b5563" strokeWidth="1" strokeLinecap="round"/>
                        </svg> Total Students :

                    <strong>
                        {" "}{totalStudents}
                    </strong>

                </li>



                <li>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" style={{marginRight:"8px",verticalAlign:"middle"}}>
                        <rect x="3" y="14" width="2" height="7" fill="#34d399"/>
                        <rect x="6.5" y="10" width="2" height="11" fill="#34d399"/>
                        <rect x="10" y="6" width="2" height="15" fill="#34d399"/>
                        <rect x="13.5" y="9" width="2" height="12" fill="#34d399"/>
                        <rect x="17" y="4" width="2" height="17" fill="#34d399"/>
                        <path d="M3 19l4.5-4.5 3.5 3 5-6 4-4" stroke="#4f46e5" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
                        <circle cx="3" cy="19" r="2" fill="#4f46e5"/>
                        <circle cx="7.5" cy="14.5" r="2" fill="#4f46e5"/>
                        <circle cx="11" cy="17.5" r="2" fill="#4f46e5"/>
                        <circle cx="16" cy="11.5" r="2" fill="#4f46e5"/>
                        <circle cx="20" cy="7.5" r="2" fill="#4f46e5"/>
                        </svg>
                    Average Attendance :

                    <strong>
                        {" "}{averageAttendance}%
                    </strong>

                </li>



                <li>

                    🧠 Predictions Generated :

                    <strong>
                        {" "}{predictedStudents}
                    </strong>

                </li>



                <li>

                    ⭐ Highest Prediction :

                    <strong>
                        {" "}{highestPrediction}
                    </strong>

                </li>



                <li>

                    🏆 Average Prediction :

                    <strong>
                        {" "}{averagePrediction}
                    </strong>

                </li>


            </ul>


        </div>






        {/* Top Performer */}



        <div className="top-card">



            <h2>
                🏅 Top Performer
            </h2>





            {

                students.length > 0 &&

                (()=>{


                    const topStudent = [...students].sort(

                        (a,b)=>

                        (b.predicted_result || 0)

                        -

                        (a.predicted_result || 0)

                    )[0];



                    return(


                        <>


                            <h1>

                                {topStudent.name}

                            </h1>





                            <p>

                                Prediction :

                                <strong>

                                    {" "}

                                    {

                                        topStudent.predicted_result

                                        ??

                                        "Pending"

                                    }

                                </strong>


                            </p>






                            <p>

                                Attendance :

                                <strong>

                                    {" "}

                                    {topStudent.attendance}%

                                </strong>


                            </p>



                        </>


                    );


                })()

            }



        </div>



    </div>







    {/* Footer */}



    <div className="footer-dashboard">


        © 2026 AI Student Performance Prediction System |

        Developed with ❤️ using React + FastAPI + Machine Learning


    </div>





</div>


</>

);


}
export default Dashboard;