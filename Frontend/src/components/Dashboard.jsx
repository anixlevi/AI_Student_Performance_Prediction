import { useEffect, useState } from "react";
import API from "../api/api";
import "../Dashboard.css";

import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Cell,
    PieChart,
    Pie,
    Legend
} from "recharts";


function Dashboard() {


const [students,setStudents]=useState([]);

const [showTopStudents,setShowTopStudents]=useState(false);

const [showChart,setShowChart]=useState(false);

const [showPieChart,setShowPieChart]=useState(false);

const [showSearch,setShowSearch]=useState(false);



const [studentId,setStudentId]=useState("");

const [studentName,setStudentName]=useState("");

const [selectedStudent,setSelectedStudent]=useState(null);



useEffect(()=>{


API.get("/students")

.then((response)=>{

setStudents(response.data);

})

.catch((error)=>{

console.log(error);

});


},[]);





// SEARCH STUDENT

const searchStudent=()=>{


const result=students.find((student)=>{


return(

Number(student.student_id)===Number(studentId)

||

student.name.toLowerCase()
===
studentName.toLowerCase()


);


});


setSelectedStudent(result || null);


};






// PERFORMANCE

const getPerformance=(marks)=>{


if(marks>=90)

return "Excellent 🟢";


else if(marks>=75)

return "Good 🔵";


else if(marks>=50)

return "Average 🟡";


else

return "Need Improvement 🔴";


};







// IMPROVEMENT AI LOGIC

const getImprovement=(student)=>{


let suggestion=[];



if(student.study_hours < 5){

suggestion.push(
`Increase study time by ${5-student.study_hours} hours daily`
);

}


else{

suggestion.push(
"Study routine is good, maintain consistency 👍"
);

}




if(student.attendance < 80){

suggestion.push(
"Improve attendance above 85%"
);

}

else{

suggestion.push(
"Attendance is excellent 👏"
);

}




if(student.predicted_result < 60){

suggestion.push(
"Focus more on weak subjects and practice daily"
);

}

else{

suggestion.push(
"Keep working hard, performance is good 🎯"
);

}



return suggestion;


};








const averageMarks = students.length>0

?

(

students.reduce(

(sum,student)=>

sum+Number(student.predicted_result)

,0)

/

students.length

).toFixed(2)

:0;






const averageAttendance = students.length>0

?

(

students.reduce(

(sum,student)=>

sum+Number(student.attendance)

,0)

/

students.length

).toFixed(2)

:0;





const topStudents=[...students]

.sort(

(a,b)=>

Number(b.predicted_result)

-

Number(a.predicted_result)

)

.slice(0,5);





const chartData=[...students]

.sort(

(a,b)=>

Number(b.predicted_result)

-

Number(a.predicted_result)

)

.slice(0,10)

.map(student=>({

name:student.name,

marks:Number(student.predicted_result)

}));





const passFailData=[

{

name:"Pass",

value:students.filter(

student=>Number(student.predicted_result)>=40

).length

},


{

name:"Fail",

value:students.filter(

student=>Number(student.predicted_result)<40

).length

}


];
return (

<div className="dashboard">


<h1>
Student Performance Dashboard
</h1>





<div className="card-container">


<div className="card">

<h3>
Total Students
</h3>

<p>
{students.length}
</p>

</div>





<div className="card">

<h3>
Average Marks
</h3>

<p>
{averageMarks}
</p>

</div>





<div className="card">

<h3>
Average Attendance
</h3>

<p>
{averageAttendance}%
</p>

</div>



</div>








<div className="button-group">


<button
className="top-btn"
onClick={()=>setShowTopStudents(!showTopStudents)}
>

{
showTopStudents
?
"Hide Top Students"
:
"Show Top Students"
}

</button>





<button
className="top-btn"
onClick={()=>setShowChart(!showChart)}
>

{
showChart
?
"Hide Chart"
:
"Performance Chart"
}

</button>





<button
className="top-btn"
onClick={()=>setShowPieChart(!showPieChart)}
>

{
showPieChart
?
"Hide Result Analysis"
:
"Result Analysis"
}

</button>





<button
className="top-btn"
onClick={()=>setShowSearch(!showSearch)}
>

{
showSearch
?
"Close Search"
:
"Search Student"
}

</button>



</div>









{/* SEARCH STUDENT */}


{
showSearch && (


<div className="search-box">


<h2>
🔍 Search Student Profile
</h2>



<input

placeholder="Enter Student ID"

value={studentId}

onChange={(e)=>setStudentId(e.target.value)}

/>




<input

placeholder="Enter Student Name"

value={studentName}

onChange={(e)=>setStudentName(e.target.value)}

/>




<button

className="top-btn"

onClick={searchStudent}

>

Search

</button>





{

selectedStudent && (



<div className="profile-card">


<h2>
Student Information
</h2>



<div className="profile-grid">


<p>
<b>Name:</b>
{" "}
{selectedStudent.name}
</p>



<p>
<b>ID:</b>
{" "}
{selectedStudent.student_id}
</p>



<p>
<b>Age:</b>
{" "}
{selectedStudent.age}
</p>




<p>
<b>Gender:</b>
{" "}
{selectedStudent.gender}
</p>




<p>
<b>Attendance:</b>
{" "}
{selectedStudent.attendance}%
</p>




<p>
<b>Study Hours:</b>
{" "}
{selectedStudent.study_hours}
</p>




<p>
<b>AI Prediction:</b>
{" "}
{selectedStudent.predicted_result}
</p>





<p>
<b>Status:</b>
{" "}
{
getPerformance(
Number(selectedStudent.predicted_result)
)
}

</p>



</div>







<div className="improvement-card">


<h3>
🚀 AI Improvement Suggestions
</h3>



{

getImprovement(selectedStudent)

.map((item,index)=>(


<p key={index}>

✅ {item}

</p>


))

}




<h3>
🎉 Message
</h3>


<p>

Keep learning and improving.
Your hard work will decide your success 💪

</p>



</div>







</div>


)

}





</div>


)

}





{/* TOP STUDENTS */}



{
showTopStudents && (


<div className="top-students">


<h2>
🏆 Top Performing Students
</h2>




<div className="student-list">


{

topStudents.map((student,index)=>(


<div

className="student-row"

key={student.student_id}

>


<p>

#{index+1}

{" "}

<b>{student.name}</b>

{" - "}

{student.predicted_result}

Marks

</p>



</div>


))

}



</div>


</div>


)

}









{/* PERFORMANCE CHART */}



{
showChart && (



<div className="chart-container">


<h2>
Student Performance Analysis
</h2>




<ResponsiveContainer

width="100%"

height={350}

>


<BarChart

data={chartData}

margin={{

top:20,

right:20,

left:10,

bottom:50

}}

>


<CartesianGrid

strokeDasharray="3 3"

/>




<XAxis

dataKey="name"

angle={-30}

textAnchor="end"

/>




<YAxis />





<Tooltip

contentStyle={{

borderRadius:"12px",

padding:"10px"

}}

/>






<Bar

dataKey="marks"

radius={[15,15,0,0]}

animationDuration={1500}

>



{

chartData.map((item,index)=>(


<Cell

key={index}

fill={

index===0

?

"#ff9800"

:

"#2196f3"

}

/>


))

}



</Bar>





</BarChart>



</ResponsiveContainer>




</div>



)

}









{/* PASS FAIL ANALYSIS */}



{

showPieChart && (


<div className="chart-container">


<h2>
📈 Result Analysis
</h2>




<PieChart

width={450}

height={350}

>



<Pie


data={passFailData}


dataKey="value"


nameKey="name"


cx="50%"


cy="50%"


outerRadius={120}


label



>


</Pie>



<Tooltip />


<Legend />



</PieChart>





</div>


)

}






</div>


);


}



export default Dashboard;