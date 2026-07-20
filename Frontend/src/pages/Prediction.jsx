import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import API from "../api/axios";
import Navbar from "../components/Navbar";
import "../css/Prediction.css";


function Prediction(){

    const [students,setStudents] = useState([]);
    const [studentId,setStudentId] = useState("");

    const [loading,setLoading] = useState(false);
    const [error,setError] = useState("");

    const navigate = useNavigate();


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



    const getPrediction = async()=>{


        if(!studentId){

            setError("Please select a student");

            return;

        }


        try{

            setLoading(true);

            setError("");

            const response = await API.post(
                "/predict",
                {
                    student_id:Number(studentId)
                }
            );


            navigate(
                "/prediction-result",
                {
                    state:response.data
                }
            );


        }
        catch(error){

            console.log(error);

            setError("Prediction failed. Try again.");

        }
        finally{

            setLoading(false);

        }

    };



    return(

        <>

        <Navbar/>

        <div className="prediction-page">


            <section className="prediction-hero">

                <div className="hero-title">

                    <svg

                        className="hero-icon"

                        viewBox="0 0 64 64"

                        xmlns="http://www.w3.org/2000/svg"

                    >

                        <path d="M32 6C24 6 18 13 18 21C18 21 12 22 12 30C12 36 16 40 21 41V44C21 47.3 23.7 50 27 50H37C40.3 50 43 47.3 43 44V41C48 40 52 36 52 30C52 22 46 21 46 21C46 13 40 6 32 6Z" fill="#2b8a99"/>

                        <path d="M32 10C25.4 10 21 15.4 21 21.5C21 21.5 16 22.5 16 29C16 34 19.5 37.5 24 38.3V42C24 44.5 26 46.5 28.5 46.5H35.5C38 46.5 40 44.5 40 42V38.3C44.5 37.5 48 34 48 29C48 22.5 43 21.5 43 21.5C43 15.4 38.6 10 32 10Z" fill="#ffe066"/>

                        <rect x="21" y="24" width="22" height="17" rx="8.5" fill="#1e293b"/>

                        <path d="M25.5 30.5C27 28.7 29.6 28.7 31 30.5" stroke="#a8e6ef" strokeWidth="2" strokeLinecap="round"/>

                        <path d="M33 30.5C34.4 28.7 37 28.7 38.5 30.5" stroke="#a8e6ef" strokeWidth="2" strokeLinecap="round"/>

                    </svg>


                    <h1>
                        AI Student Performance Prediction
                    </h1>

                </div>


                <p>
                    Predict student performance using a trained Machine Learning model.
                </p>

            </section>


            <section className="prediction-top">


                <div className="ai-card">


                    <div className="card-title">

                        <svg className="card-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9 2C6.8 2 5 3.8 5 6C5 6.8 5.2 7.5 5.6 8.1C4.6 8.7 4 9.8 4 11C4 12.3 4.7 13.4 5.7 14C5.3 14.6 5 15.3 5 16C5 17.9 6.3 19.5 8 19.9V21C8 21.6 8.4 22 9 22H15C15.6 22 16 21.6 16 21V19.9C17.7 19.5 19 17.9 19 16C19 15.3 18.7 14.6 18.3 14C19.3 13.4 20 12.3 20 11C20 9.8 19.4 8.7 18.4 8.1C18.8 7.5 19 6.8 19 6C19 3.8 17.2 2 15 2C13.8 2 12.7 2.5 12 3.4C11.3 2.5 10.2 2 9 2Z" stroke="currentColor" strokeWidth="1.6"/>
                            <path d="M12 3.4V21" stroke="currentColor" strokeWidth="1.6"/>
                        </svg>

                        <h2>
                            AI Prediction Model
                        </h2>

                    </div>


                    <p>
                        This system uses a Random Forest Machine Learning
                        model to predict a student's final performance.
                    </p>



                    <div className="ai-features">


                        <div>

                            <h3>
                                95%
                            </h3>

                            <span>
                                Accuracy
                            </span>

                        </div>



                        <div>

                            <h3>
                                24/7
                            </h3>

                            <span>
                                Availability
                            </span>

                        </div>



                        <div>

                            <h3>
                                ML
                            </h3>

                            <span>
                                Powered
                            </span>

                        </div>


                    </div>


                </div>





                <div className="prediction-card">


                    <div className="card-title">

                        <svg className="card-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M2 8L12 3L22 8L12 13L2 8Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/>
                            <path d="M6 10.5V16C6 16 8.5 18.5 12 18.5C15.5 18.5 18 16 18 16V10.5" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/>
                            <path d="M22 8V15" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
                        </svg>

                        <h2>
                            Select Student
                        </h2>

                    </div>


                    <p>
                        Choose a student ID to generate a prediction.
                    </p>




                    <select

                        className="prediction-select"

                        value={studentId}

                        onChange={(e)=>{ setStudentId(e.target.value); setError(""); }}

                    >


                        <option value="">

                            Select Student ID

                        </option>



                        {
                            students.map((student)=>(


                                <option

                                    key={student.student_id}

                                    value={student.student_id}

                                >

                                    Student ID : {student.student_id}

                                </option>


                            ))
                        }


                    </select>


                    {
                        error &&

                        <div className="error-message">

                            {error}

                        </div>

                    }


                    <button

                        className="predict-btn"

                        onClick={getPrediction}

                        disabled={loading}

                    >

                        {

                            loading

                            ?

                            "Predicting…"

                            :

                            "Generate AI Prediction"

                        }


                    </button>



                </div>



            </section>


        </div>

        </>

    )

}


export default Prediction;
