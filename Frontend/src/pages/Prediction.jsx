import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import API from "../api/axios";
import Navbar from "../components/Navbar";
import "../css/Prediction.css";


function Prediction(){

    const [students,setStudents] = useState([]);
    const [studentId,setStudentId] = useState("");

    const [loading,setLoading] = useState(false);
    const [error,setError] = useState("");

    const navigate = useNavigate();
    const location = useLocation();


    useEffect(()=>{
        getStudents();
    },[]);


    useEffect(()=>{

        if(location.state && location.state.autoSelectId){

            setStudentId(String(location.state.autoSelectId));

        }

    },[location.state]);


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
    <div className="hero-icon-wrap">
        <svg width="56" height="46" viewBox="0 0 220 180" fill="none">

            <rect x="150" y="120" width="24" height="40" rx="3" fill="#f9a8c9"/>
            <rect x="118" y="95" width="24" height="65" rx="3" fill="#f9a8c9"/>
            <rect x="86" y="70" width="24" height="90" rx="3" fill="#f9a8c9"/>
            <rect x="54" y="130" width="24" height="30" rx="3" fill="#f9a8c9"/>

            <circle cx="185" cy="60" r="20" fill="none" stroke="#e11d48" strokeWidth="3"/>
            <circle cx="185" cy="60" r="12" fill="none" stroke="#e11d48" strokeWidth="3"/>
            <circle cx="185" cy="60" r="4" fill="#e11d48"/>
            <path d="M198 40l10-10M203 33l5 2-2 5z" stroke="#e11d48" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="#e11d48"/>

            <circle cx="42" cy="55" r="14" fill="none" stroke="#f9a8c9" strokeWidth="6"/>
            <circle cx="70" cy="45" r="10" fill="none" stroke="#cbd5e1" strokeWidth="5"/>

            <circle cx="45" cy="120" r="14" fill="none" stroke="#334155" strokeWidth="2.5"/>
            <path d="M39 132h12M41 137h8" stroke="#334155" strokeWidth="2.5" strokeLinecap="round"/>
            <path d="M45 106v-5M32 113l-4-4M58 113l4-4" stroke="#334155" strokeWidth="2" strokeLinecap="round"/>

            <circle cx="112" cy="88" r="12" fill="#e11d48"/>
            <rect x="103" y="97" width="18" height="20" rx="4" fill="#0f172a"/>
            <rect x="98" y="100" width="6" height="18" rx="3" fill="#e11d48"/>
            <path d="M120 105l14-8" stroke="#e11d48" strokeWidth="5" strokeLinecap="round"/>
            <rect x="106" y="117" width="6" height="18" rx="3" fill="#0f172a"/>
            <rect x="114" y="120" width="6" height="15" rx="3" fill="#0f172a"/>
            <ellipse cx="109" cy="137" rx="6" ry="3" fill="#e11d48"/>
            <ellipse cx="120" cy="138" rx="6" ry="3" fill="#e11d48"/>

        </svg>
    </div>

    <h1>
        Λ𝙸 𝚂𝚝𝚞𝚍𝚎𝚗𝚝 𝙿𝚎𝚛𝚏𝚘𝚛𝚖𝚊𝚗𝚌𝚎 𝙿𝚛𝚎𝚍𝚒𝚌𝚝𝚒𝚘𝚗
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
