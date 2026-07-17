import { useState } from "react";
import API from "../api/axios";


function RegisterStudent(){

    const [student,setStudent] = useState({

        name:"",
        age:"",
        gender:"",
        attendance:"",
        study_hours:"",
        previous_marks:"",
        assignment_marks:"",
        internal_marks:"",
        final_marks:"",
        result:""

    });


    const handleChange = (e)=>{

        setStudent({

            ...student,

            [e.target.name]: e.target.value

        });

    };


    const submitData = async(e)=>{

        e.preventDefault();


        try{

            const response = await API.post(
                "/register",
                student
            );


            alert("Student Registered Successfully 🚀");

            console.log(response.data);


        }
        catch(error){

            console.log(error);

            alert("Registration Failed");

        }

    };


    return(

        <div className="register-container">


            <h2>
                Student Registration
            </h2>


            <form onSubmit={submitData}>


                <input
                name="name"
                placeholder="Student Name"
                onChange={handleChange}
                />


                <input
                name="age"
                placeholder="Age"
                type="number"
                onChange={handleChange}
                />


                <input
                name="gender"
                placeholder="Gender"
                onChange={handleChange}
                />


                <input
                name="attendance"
                placeholder="Attendance %"
                type="number"
                onChange={handleChange}
                />


                <input
                name="study_hours"
                placeholder="Study Hours"
                type="number"
                onChange={handleChange}
                />


                <input
                name="previous_marks"
                placeholder="Previous Marks"
                type="number"
                onChange={handleChange}
                />


                <input
                name="assignment_marks"
                placeholder="Assignment Marks"
                type="number"
                onChange={handleChange}
                />


                <input
                name="internal_marks"
                placeholder="Internal Marks"
                type="number"
                onChange={handleChange}
                />


                <input
                name="final_marks"
                placeholder="Final Marks"
                type="number"
                onChange={handleChange}
                />


                <input
                name="result"
                placeholder="Result"
                onChange={handleChange}
                />


                <button type="submit">
                    Register Student
                </button>


            </form>


        </div>

    );

}


export default RegisterStudent;