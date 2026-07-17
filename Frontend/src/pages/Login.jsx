import { useState } from "react";
import API from "../api/axios";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";


function Login(){

    const navigate = useNavigate();

    const [username,setUsername] = useState("");
    const [password,setPassword] = useState("");


    const handleLogin = async(e)=>{

        e.preventDefault();


        try{

            const response = await API.post(
                "/login",
                {
                    username,
                    password
                }
            );


            alert("Login Successful");

            localStorage.setItem(
                "username",
                response.data.username
            );


            navigate("/")


            console.log(response.data);


        }
        catch(error){

            console.log(error);

            alert("Login Failed");

        }

    };


    return(

        <>

        <Navbar/>

        <div className="container mt-5">

            <div className="card shadow p-4">


                <h2 className="text-center">
                    🔐 Login
                </h2>


                <form onSubmit={handleLogin}>


                    <input

                    className="form-control mb-3"

                    placeholder="Username"

                    value={username}

                    onChange={(e)=>setUsername(e.target.value)}

                    />


                    <input

                    className="form-control mb-3"

                    type="password"

                    placeholder="Password"

                    value={password}

                    onChange={(e)=>setPassword(e.target.value)}

                    />


                    <button className="btn btn-success w-100">

                        Login

                    </button>


                </form>


            </div>

        </div>


        </>

    )

}


export default Login;