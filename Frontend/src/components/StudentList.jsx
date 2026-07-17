import { useEffect, useState } from "react";

import API from "../api/api";

import "../css/StudentList.css";

function StudentList() {

    const [students, setStudents] = useState([]);

    const [search, setSearch] = useState("");

    const [loading, setLoading] = useState(true);



    const loadStudents = () => {

        API.get("/students")

            .then((response) => {

                setStudents(response.data);

            })

            .catch((error) => {

                console.log(error);

            })

            .finally(() => {

                setLoading(false);

            });

    };



    useEffect(() => {

        loadStudents();

    }, []);




    const deleteStudent = (id) => {

        if (!window.confirm("Delete this student?"))

            return;

        API.delete(`/students/${id}`)

            .then(() => {

                loadStudents();

            })

            .catch((error) => {

                console.log(error);

            });

    };




    const filteredStudents = students.filter((student) =>

        student.name

            .toLowerCase()

            .includes(search.toLowerCase())

    );
        return (

        <div className="student-list">

            <div className="student-header">

                <h1>📚 Student Management</h1>

                <p>

                    View, Search and Manage all registered students.

                </p>

            </div>



            <div className="search-box">

                <input

                    type="text"

                    placeholder="🔍 Search Student..."

                    value={search}

                    onChange={(e) =>

                        setSearch(e.target.value)

                    }

                />

            </div>



            {

                loading

                ?

                (

                    <h3 style={{textAlign:"center"}}>

                        Loading Students...

                    </h3>

                )

                :

                (

                    <table className="student-table">

                        <thead>

                            <tr>

                                <th>ID</th>

                                <th>Name</th>

                                <th>Age</th>

                                <th>Gender</th>

                                <th>Attendance</th>

                                <th>Study Hours</th>

                                <th>Prediction</th>

                                <th>Actions</th>

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

                                            {student.gender}

                                        </td>

                                        <td>

                                            {student.attendance}%

                                        </td>

                                        <td>

                                            {student.study_hours}

                                        </td>

                                        <td>

                                            {

                                                student.predicted_result

                                                ?

                                                student.predicted_result

                                                :

                                                "Not Predicted"

                                            }

                                        </td>

                                        <td>

                                            <button

                                                className="pdf-btn"

                                                onClick={()=>

                                                    window.open(

                                                        `http://127.0.0.1:8000/download-report/${student.student_id}`,

                                                        "_blank"

                                                    )

                                                }

                                            >

                                                PDF

                                            </button>

                                            <button

                                                className="delete-btn"

                                                onClick={()=>

                                                    deleteStudent(

                                                        student.student_id

                                                    )

                                                }

                                            >

                                                Delete

                                            </button>

                                        </td>

                                    </tr>

                                ))

                            }

                        </tbody>

                    </table>

                )

            }

        </div>

    );

}

export default StudentList;