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

AI Student
<br/>

Performance
<br/>

<span>Prediction System</span>

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

📊 View Dashboard

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

📊 Smart Dashboard

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





<div>

🎓

<br/>

Register Student

</div>





<div>

⬇️

</div>





<div>

🤖

<br/>

AI Prediction

</div>





<div>

⬇️

</div>





<div>

📈

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