import { useEffect, useState } from "react";
import API from "../api/axios";
import Navbar from "../components/Navbar";


function Prediction(){


    const [students,setStudents] = useState([]);

    const [studentId,setStudentId] = useState("");

    const [prediction,setPrediction] = useState(null);

    const [reportLoading,setReportLoading] = useState(false);



    useEffect(()=>{

        getStudents();

    },[]);



    const getStudents = async()=>{

        try{


            const response = await API.get(
                "/students"
            );


            setStudents(
                response.data
            );


        }
        catch(error){


            console.log(error);


        }

    };
    



    const generatePrediction = async()=>{


        if(!studentId){

            alert(
                "Please Select Student First"
            );

            return;

        }



        try{


            const response = await API.post(

                "/predict",

                {

                    student_id: studentId

                }

            );



            setPrediction(
                response.data
            );



        }
        catch(error){


            console.log(error);


            alert(
                "Prediction Failed"
            );


        }


    };








    const downloadReport = async()=>{


        if(!studentId){


            alert(
                "Please Select Student First"
            );


            return;


        }




        try{


            setReportLoading(true);




            const response = await API.get(


                `/download-report/${studentId}`,



                {

                    responseType:"blob"

                }


            );





            const file = new Blob(


                [

                    response.data

                ],


                {

                    type:"application/pdf"

                }


            );





            const url = window.URL.createObjectURL(
                file
            );





            const link = document.createElement(
                "a"
            );





            link.href = url;



            link.download =
                "Student_Report.pdf";





            link.click();





            window.URL.revokeObjectURL(
                url
            );



        }
        catch(error){


            console.log(error);



            alert(
                "Report Download Failed"
            );


        }
        finally{


            setReportLoading(false);


        }


    };
    



    return(


        <>


        <Navbar/>





        <div className="container mt-5">





            <div className="card shadow p-4">





                <h1 className="text-center">

                    🤖 AI Prediction

                </h1>





                <p className="text-center text-muted">

                    Select student and generate AI performance prediction

                </p>







                <select


                    className="form-control mt-4"



                    value={studentId}



                    onChange={(e)=>

                        setStudentId(
                            e.target.value
                        )

                    }


                >





                    <option value="">


                        Select Student


                    </option>








                    {


                        students.map((student)=>(



                            <option



                                key={
                                    student.student_id
                                }



                                value={
                                    student.student_id
                                }



                            >


                                {

                                    student.name

                                }



                            </option>




                        ))



                    }




                </select>









                <button



                    className="btn btn-primary mt-3"



                    onClick={
                        generatePrediction
                    }



                >



                    🚀 Generate Prediction



                </button>





            </div>
            



            {


                prediction &&



                <div className="card shadow p-4 mt-4">





                    <h2>

                        📊 Prediction Result

                    </h2>






                    <hr/>





                    <p>

                        Student Name :

                        <strong>

                            {" "}

                            {prediction.student_name}

                        </strong>


                    </p>







                    <p>

                        Predicted Marks :

                        <strong>

                            {" "}

                            {prediction.predicted_marks}

                        </strong>


                    </p>







                    <hr/>







                    <h4>

                        Performance Status

                    </h4>






                    <h3>


                        {


                            prediction.predicted_marks >= 90

                            ?

                            "Excellent 🟢"


                            :


                            prediction.predicted_marks >= 75


                            ?

                            "Good 🔵"



                            :


                            prediction.predicted_marks >= 50


                            ?

                            "Average 🟡"



                            :


                            "Need Improvement 🔴"



                        }



                    </h3>







                    <h4 className="mt-3">

                        💡 AI Suggestion

                    </h4>





                    <p>


                    {


                        prediction.predicted_marks >= 75


                        ?


                        "Great performance! Maintain your study routine and keep improving."


                        :


                        "Increase study hours, revise weak topics and practice regularly."



                    }



                    </p>









                    <button



                        className="btn btn-success mt-3"



                        onClick={
                            downloadReport
                        }



                        disabled={
                            reportLoading
                        }



                    >




                        {


                            reportLoading


                            ?


                            "Generating PDF..."


                            :


                            "📄 Download Report"



                        }



                    </button>






                </div>



            }






        </div>



        </>



    )



}



export default Prediction;