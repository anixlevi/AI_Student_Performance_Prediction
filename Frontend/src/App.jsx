import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import ProtectedRoute from "./components/ProtectedRoute";
import PredictionResult from "./pages/PredictionResult";

import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Prediction from "./pages/Prediction";
import Students from "./pages/Students";

function App() {
    return (
        <BrowserRouter>
            <Routes>

                {/* Default Route */}
                <Route
                    path="/"
                    element={<Navigate to="/auth/login" replace />}
                />

                {/* Authentication */}
                <Route
                    path="/auth/login"
                    element={<Login />}
                />

                {/* Home */}
                <Route
                    path="/home"
                    element={
                        <ProtectedRoute>
                            <Home />
                        </ProtectedRoute>
                    }
                />

                {/* Student Registration */}
                <Route
                    path="/register"
                    element={
                        <ProtectedRoute>
                            <Register />
                        </ProtectedRoute>
                    }
                />

                {/* Dashboard */}
                <Route
                    path="/dashboard"
                    element={
                        <ProtectedRoute>
                            <Dashboard />
                        </ProtectedRoute>
                    }
                />

                {/* Prediction */}
                <Route
                    path="/prediction"
                    element={
                        <ProtectedRoute>
                            <Prediction />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/prediction-result"
                    element={<PredictionResult/>}
                />

                {/* Students */}
                <Route
                    path="/students"
                    element={
                        <ProtectedRoute>
                            <Students />
                        </ProtectedRoute>
                    }
                />
                

                {/* 404 */}
                <Route
                    path="*"
                    element={<Navigate to="/auth/login" replace />}
                />

            </Routes>
        </BrowserRouter>
    );
}

export default App;