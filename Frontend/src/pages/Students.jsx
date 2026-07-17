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

👨‍🎓 Student Management

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