import { useLocation, useNavigate } from "react-router-dom";
import "../css/PredictionResult.css";


function PredictionResult(){

    const location = useLocation();

    const navigate = useNavigate();


    const prediction = location.state;



    if(!prediction){

        return(

            <div className="prediction-error">

                <h2>
                    No Prediction Data Found
                </h2>


                <button
                    onClick={()=>navigate("/prediction")}
                >

                    Go Back

                </button>


            </div>

        );

    }



    const marks = prediction.predicted_marks;



    const getStatus = ()=>{

        if(marks >= 90){

            return { label:"Excellent", tone:"excellent" };

        }
        else if(marks >=75){

            return { label:"Good", tone:"good" };

        }
        else if(marks >=50){

            return { label:"Average", tone:"average" };

        }
        else{

            return { label:"Needs Improvement", tone:"low" };

        }

    };




    const getSuggestion = ()=>{


        if(marks >=90){

            return "Great performance! Maintain your study routine and keep improving.";

        }

        else if(marks >=75){

            return "Good performance. Keep practicing and improve consistency.";

        }

        else if(marks >=50){

            return "Increase study hours, revise weak topics and practice regularly.";

        }

        else{

            return "Need improvement. Focus on basics and study regularly.";

        }

    };





    const downloadReport = async()=>{

        try{

            const response = await fetch(

                `${import.meta.env.VITE_API_URL}/download-report/${prediction.student_id}`

            );


            const blob = await response.blob();


            const url = window.URL.createObjectURL(blob);


            const link = document.createElement("a");


            link.href=url;


            link.download="Student_Report.pdf";


            document.body.appendChild(link);


            link.click();


            link.remove();


            window.URL.revokeObjectURL(url);


        }

        catch(error){

            console.log(error);

        }

    };



    const status = getStatus();




    return(

        <div className="result-page">



            <div className="result-card">


                {/* CLOSE ICON */}

                <button

                className="close-btn"

                onClick={()=>navigate("/prediction")}

                aria-label="Close"

                >

                    ✕

                </button>




                <div className="result-header">


                    <div className="result-title">

                        <svg

                            className="result-icon"

                            viewBox="0 0 48 48"

                            fill="none"

                            xmlns="http://www.w3.org/2000/svg"

                        >

                            <circle cx="21" cy="21" r="15" stroke="currentColor" strokeWidth="2.4"/>

                            <line x1="31.5" y1="31.5" x2="43" y2="43" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round"/>

                            <path d="M14 24V27" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"/>

                            <path d="M20 20V27" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"/>

                            <path d="M26 22V27" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"/>

                            <path d="M13.5 21L18 16.5L22 19.5L28.5 13" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>

                            <circle cx="18" cy="16.5" r="1.4" fill="currentColor"/>

                            <circle cx="22" cy="19.5" r="1.4" fill="currentColor"/>

                            <circle cx="28.5" cy="13" r="1.4" fill="currentColor"/>

                        </svg>


                        <h1>
                            AI Prediction Result
                        </h1>

                    </div>


                    <p>
                        Machine Learning based student performance analysis
                    </p>


                </div>





                <div className="result-info">


                    <div className="info-box">

                        <span>
                            Student ID
                        </span>


                        <h3>
                            {prediction.student_id}
                        </h3>


                    </div>





                    <div className="info-box">

                        <span>
                            Student Name
                        </span>


                        <h3>
                            {prediction.student_name}
                        </h3>


                    </div>



                </div>







                <div className="marks-box">


                    <span>
                        Predicted Marks
                    </span>


                    <h1>
                        {marks}
                    </h1>


                    <p>
                        out of 100
                    </p>


                </div>






                <div className="status-box">


                    <h2>
                        Performance Status
                    </h2>


                    <h1 className={`status-pill status-${status.tone}`}>
                        {status.label}
                    </h1>


                </div>







                <div className="suggestion-box">


                    <h2>
                        AI Suggestion
                    </h2>


                    <p>
                        {getSuggestion()}
                    </p>


                </div>




            </div>





            {/* DOWNLOAD BUTTON OUTSIDE CARD */}


            <div className="download-section">


                <button

                className="download-btn"

                onClick={downloadReport}

                >

                    Download Report

                </button>


            </div>



        </div>

    )

}



export default PredictionResult;
