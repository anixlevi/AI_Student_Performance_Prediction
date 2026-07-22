import { useEffect, useState } from "react";
import API from "../api/axios";
import Navbar from "../components/Navbar";


function Students(){


    const [students,setStudents] = useState([]);

    const [search,setSearch] = useState("");



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




    const filteredStudents = students.filter(
        
        (student)=>

            student.name
            .toLowerCase()
            .includes(
                search.toLowerCase()
            )

    );
    return(

<>


<Navbar/>




<div className="container mt-5">



<div className="card shadow p-4">



<h1 className="text-center">

<svg width="36" height="36" viewBox="0 0 24 24" fill="none" style={{marginRight:"8px",verticalAlign:"middle"}}>
    <path d="M12 3L4 7l8 4 8-4-8-4z" fill="#7dd3f0" stroke="#4b5563" strokeWidth="1"/>
    <path d="M18 8v3.5" stroke="#4b5563" strokeWidth="1" strokeLinecap="round"/>
    <circle cx="18" cy="12.3" r="0.8" fill="#4b5563"/>
    <path d="M8 9.5v2.5a4 4 0 0 0 8 0V9.5" stroke="#4b5563" strokeWidth="1" fill="none"/>
    <path d="M10.5 15v2l1.5 1.5 1.5-1.5v-2" fill="#7dd3f0" stroke="#4b5563" strokeWidth="1"/>
    <path d="M5.5 21v-1.5A4.5 4.5 0 0 1 10 15h4a4.5 4.5 0 0 1 4.5 4.5V21" stroke="#4b5563" strokeWidth="1" fill="none"/>
    <path d="M8.5 19v1.5M15.5 19v1.5" stroke="#4b5563" strokeWidth="1" strokeLinecap="round"/>
</svg>
     Student Management

</h1>




<p className="text-center text-muted">

Manage all registered students

</p>





<input


type="text"


className="form-control mt-4"


placeholder="🔍 Search Student Name"


value={search}


onChange={(e)=>

    setSearch(
        e.target.value
    )

}


/>






<div className="table-responsive mt-4">



<table className="table table-bordered table-hover">



<thead className="table-dark">



<tr>


<th>
ID
</th>


<th>
Name
</th>


<th>
Age
</th>


<th>
Attendance
</th>


<th>
Study Hours
</th>


<th>
Prediction
</th>


</tr>



</thead>





<tbody>




{

filteredStudents.map((student)=>(


<tr key={student.student_id}>


<td>

{student.student_id}

</td>



<td>

{student.name}

</td>




<td>

{student.age}

</td>




<td>

{student.attendance}%

</td>




<td>

{student.study_hours} hrs

</td>




<td>


{

student.predicted_result

?

student.predicted_result

:

"Pending"

}



</td>



</tr>



))


}





</tbody>




</table>



</div>





</div>



</div>


</>


)


}
export default Students;