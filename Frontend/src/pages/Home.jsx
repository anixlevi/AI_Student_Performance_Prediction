import { Link, useNavigate } from "react-router-dom";
import HomeNavbar from "../components/HomeNavbar";
import "../css/Home.css";



function Home(){


    const navigate = useNavigate();


    const username = localStorage.getItem("username");



    const handlePrediction = ()=>{


        if(username){

            navigate("/prediction");

        }
        else{

            navigate("/login");

        }


    };



    const handleDashboard = ()=>{


        if(username){

            navigate("/dashboard");

        }
        else{

            navigate("/login");

        }


    };




return(

<>


<HomeNavbar/>



<div className="landing">



<section className="hero">



<div className="hero-left">



<h1>

Λ𝙸 𝚂𝚝𝚞𝚍𝚎𝚗𝚝


<br/>


𝙿𝚎𝚛𝚏𝚘𝚛𝚖𝚊𝚗𝚌𝚎


<br/>

<span>

𝙿𝚛𝚎𝚍𝚒𝚌𝚝𝚒𝚘𝚗 𝚂𝚢𝚜𝚝𝚎𝚖
</span>

</h1>





<p>

An intelligent platform that uses
Machine Learning to analyze student
performance and predict future results.

</p>





<div>



<button

className="primary-btn"

onClick={handlePrediction}

>

🚀 Start Prediction

</button>




<button

className="secondary-btn"

onClick={handleDashboard}

>

<svg width="20" height="20" viewBox="0 0 24 24" fill="none" style={{marginRight:"8px",verticalAlign:"middle"}}>
  <rect x="2" y="3" width="20" height="14" rx="1.5" fill="#dbeafe" stroke="#2563eb" strokeWidth="1.5"/>
  <rect x="8" y="19" width="8" height="1.5" rx="0.75" fill="#94a3b8"/>
  <rect x="10" y="17" width="4" height="3" fill="#94a3b8"/>
  <rect x="5" y="11" width="2" height="4" fill="#60a5fa"/>
  <rect x="8" y="8" width="2" height="7" fill="#f97316"/>
  <rect x="11" y="10" width="2" height="5" fill="#f87171"/>
  <rect x="14" y="6" width="2" height="9" fill="#34d399"/>
</svg>
View Dashboard

</button>


</div>



</div>







<div className="hero-right">



<div className="ai-card">



<div className="brain">

🤖

</div>




<h2>

AI Analytics

</h2>





<div className="stats">





<div>

<h3>

95%

</h3>


<p>

Accuracy

</p>


</div>







<div>

<h3>

24/7

</h3>


<p>

Analysis

</p>


</div>





</div>



</div>



</div>



</section>







<section className="features">



<h2>

Powerful Features

</h2>





<div className="feature-container">





<div className="feature-box">


<h3>

🤖 AI Prediction

</h3>


<p>

Predict student marks using ML algorithms.

</p>


</div>







<div className="feature-box">


<h3>

<svg width="20" height="20" viewBox="0 0 24 24" fill="none" style={{marginRight:"8px",verticalAlign:"middle"}}>
  <rect x="2" y="3" width="20" height="14" rx="1.5" fill="#dbeafe" stroke="#2563eb" strokeWidth="1.5"/>
  <rect x="8" y="19" width="8" height="1.5" rx="0.75" fill="#94a3b8"/>
  <rect x="10" y="17" width="4" height="3" fill="#94a3b8"/>
  <rect x="5" y="11" width="2" height="4" fill="#60a5fa"/>
  <rect x="8" y="8" width="2" height="7" fill="#f97316"/>
  <rect x="11" y="10" width="2" height="5" fill="#f87171"/>
  <rect x="14" y="6" width="2" height="9" fill="#34d399"/>
</svg>
Smart Dashboard

</h3>


<p>

Analyze attendance and performance data.

</p>


</div>






<div className="feature-box">


<h3>

📄 AI Reports

</h3>


<p>

Generate detailed PDF performance reports.

</p>


</div>





</div>



</section>










<section className="workflow">



<h2>

How System Works

</h2>





<div className="steps">


<div className="step-box">
<svg width="40" height="40" viewBox="0 0 24 24" fill="none" style={{marginBottom:"10px"}}>
  <path d="M12 3L2 8l10 5 8-4.2V15h1.5V8L12 3z" fill="#2563eb"/>
  <path d="M5.5 10.7v4.3c0 1.7 2.9 3 6.5 3s6.5-1.3 6.5-3v-4.3L12 13z" fill="#7c3aed"/>
</svg>
<br/>
Register Student
</div>

<div className="step-arrow">➜</div>

<div className="step-box">
<svg width="40" height="40" viewBox="0 0 24 24" fill="none" style={{marginBottom:"10px"}}>
  <rect x="5" y="8" width="14" height="11" rx="3" fill="#2563eb"/>
  <circle cx="9.5" cy="13.5" r="1.5" fill="white"/>
  <circle cx="14.5" cy="13.5" r="1.5" fill="white"/>
  <rect x="10.5" y="17" width="3" height="1.5" rx="0.75" fill="white"/>
  <path d="M12 8V5" stroke="#7c3aed" strokeWidth="1.5" strokeLinecap="round"/>
  <circle cx="12" cy="4" r="1.3" fill="#7c3aed"/>
  <path d="M5 12H3M21 12h-2" stroke="#2563eb" strokeWidth="1.5" strokeLinecap="round"/>
</svg>
<br/>
AI Prediction
</div>

<div className="step-arrow">➜</div>

<div className="step-box">
<svg width="40" height="40" viewBox="0 0 24 24" fill="none" style={{marginBottom:"10px"}}>
  <rect x="3" y="3" width="18" height="18" rx="2" fill="none" stroke="#e2e8f0" strokeWidth="1.5"/>
  <rect x="6" y="13" width="2.5" height="5" rx="1" fill="#60a5fa"/>
  <rect x="10.75" y="9" width="2.5" height="9" rx="1" fill="#7c3aed"/>
  <rect x="15.5" y="6" width="2.5" height="12" rx="1" fill="#2563eb"/>
</svg>
<br/>
Result Analysis
</div>


</div>



</section>









<section className="technology">



<h2>

Technology Stack

</h2>






<div>


<span>

React

</span>



<span>

FastAPI

</span>



<span>

Python

</span>



<span>

Machine Learning

</span>



<span>

MySQL

</span>



</div>





</section>









<footer>


© 2026 AI Student Performance Prediction System


</footer>






</div>



</>


);



}



export default Home;