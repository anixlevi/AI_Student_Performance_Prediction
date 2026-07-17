import { useEffect, useState } from "react";
import API from "../api/axios";
import "../css/dashboard.css";


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


        <h1>

            🎓 AI Student Performance Prediction System

        </h1>



        <p className="subtitle">

            Smart Academic Analytics Powered by Artificial Intelligence

        </p>


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
                📊 Attendance Analytics
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

                    👨‍🎓 Total Students :

                    <strong>
                        {" "}{totalStudents}
                    </strong>

                </li>



                <li>

                    📊 Average Attendance :

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