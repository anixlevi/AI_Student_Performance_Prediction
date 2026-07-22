import { useState } from "react";
import API from "../api/axios";
import Navbar from "../components/Navbar";


function Register() {


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



const handleChange=(e)=>{

    setStudent({

        ...student,

        [e.target.name]:e.target.value

    });

};



const handleSubmit=async(e)=>{

    e.preventDefault();


    try{


        const response = await API.post(
            "/register",
            student
        );


        alert(
            "Student Registered Successfully ID : "
            + response.data.student_id
        );


        setStudent({

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


    }
    catch(error){

        console.log(error);

        alert("Registration Failed");

    }


};



return (

<>


<Navbar/>


<div className="container mt-5">


<div className="card shadow p-4">


<h2 className="text-center mb-4 d-flex align-items-center justify-content-center gap-2">
<svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 3L22 8L12 13L2 8L12 3Z" fill="#334155"/>
    <path d="M6 10.5V16C6 16 8.5 18.5 12 18.5C15.5 18.5 18 16 18 16V10.5" stroke="#334155" strokeWidth="1.6" strokeLinejoin="round" fill="none"/>
    <path d="M22 8V15" stroke="#334155" strokeWidth="1.8" strokeLinecap="round"/>
    <circle cx="22" cy="16.5" r="1.4" fill="#334155"/>
</svg>
    Student Registration
</h2>



<form onSubmit={handleSubmit}>


<div className="row">



<div className="col-md-6 mb-3">

<input

className="form-control"

name="name"

placeholder="Student Name"

value={student.name}

onChange={handleChange}

/>

</div>



<div className="col-md-6 mb-3">

<input

className="form-control"

name="age"

placeholder="Age"

value={student.age}

onChange={handleChange}

/>

</div>




<div className="col-md-6 mb-3">

<input

className="form-control"

name="gender"

placeholder="Gender"

value={student.gender}

onChange={handleChange}

/>

</div>



<div className="col-md-6 mb-3">

<input

className="form-control"

name="attendance"

placeholder="Attendance %"

value={student.attendance}

onChange={handleChange}

/>

</div>




<div className="col-md-6 mb-3">

<input

className="form-control"

name="study_hours"

placeholder="Study Hours"

value={student.study_hours}

onChange={handleChange}

/>

</div>



<div className="col-md-6 mb-3">

<input

className="form-control"

name="previous_marks"

placeholder="Previous Marks"

value={student.previous_marks}

onChange={handleChange}

/>

</div>



<div className="col-md-6 mb-3">

<input

className="form-control"

name="assignment_marks"

placeholder="Assignment Marks"

value={student.assignment_marks}

onChange={handleChange}

/>

</div>



<div className="col-md-6 mb-3">

<input

className="form-control"

name="internal_marks"

placeholder="Internal Marks"

value={student.internal_marks}

onChange={handleChange}

/>

</div>




<div className="col-md-6 mb-3">

<input

className="form-control"

name="final_marks"

placeholder="Final Marks"

value={student.final_marks}

onChange={handleChange}

/>

</div>



<div className="col-md-6 mb-3">

<input

className="form-control"

name="result"

placeholder="Result"

value={student.result}

onChange={handleChange}

/>

</div>



</div>




<button className="btn btn-primary w-100">

🚀 Register Student

</button>



</form>



</div>


</div>


</>

);


}


export default Register;