import { BrowserRouter, Routes, Route } from "react-router-dom";


import ProtectedRoute from "./components/ProtectedRoute";


import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Prediction from "./pages/Prediction";
import Students from "./pages/Students";



function App(){


    return(


        <BrowserRouter>


            <Routes>



                {/* Landing Page */}

                <Route

                    path="/"

                    element={<Home/>}

                />




                {/* Student Registration */}

                <Route

                    path="/register"

                    element={<Register/>}

                />




                {/* Login */}

                <Route

                    path="/login"

                    element={<Login/>}

                />





                {/* AI Dashboard */}

                <Route

                    path="/dashboard"

                    element={

                        <ProtectedRoute>

                            <Dashboard/>

                        </ProtectedRoute>

                    }

                />






                {/* AI Prediction */}

                <Route

                    path="/prediction"

                    element={

                        <ProtectedRoute>

                            <Prediction/>

                        </ProtectedRoute>

                    }

                />






                {/* Student Management */}

                <Route

                    path="/students"

                    element={

                        <ProtectedRoute>

                            <Students/>

                        </ProtectedRoute>

                    }

                />






                {/* Wrong URL */}

                <Route

                    path="*"

                    element={<Home/>}

                />



            </Routes>


        </BrowserRouter>


    );


}



export default App;