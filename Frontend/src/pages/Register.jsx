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


<h2 className="text-center mb-4">

🎓 Student Registration

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