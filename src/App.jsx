import { useState } from "react";
import "./App.css";

function App() {

  const [students, setStudents] = useState(new Map());
  const [name, setName] = useState("");
  const [courses, setCourses] = useState("");
  const [gpa, setGpa] = useState("");
  const [filterCourse, setFilterCourse] = useState("");

  // ADD STUDENT
  const addStudent = () => {

    if (!name || !courses || !gpa) return;

    const id = Date.now();

    const courseSet = new Set(
      courses.split(",").map(c => c.trim())
    );

    const newStudent = {
      id,
      name,
      enrolledCourses: courseSet,
      gpa: parseFloat(gpa)
    };

    const updatedStudents = new Map(students);
    updatedStudents.set(id, newStudent);

    setStudents(updatedStudents);

    setName("");
    setCourses("");
    setGpa("");
  };

  // REMOVE STUDENT
  const removeStudent = (id) => {
    const updatedStudents = new Map(students);
    updatedStudents.delete(id);
    setStudents(updatedStudents);
  };

  // MAP → ARRAY
  const studentArray = [...students.values()];

  // SORT BY GPA (DESC)
  const sortedStudents = [...studentArray].sort(
    (a, b) => b.gpa - a.gpa
  );

  // UNIQUE COURSES USING REDUCE
  const uniqueCourses = studentArray.reduce((acc, student) => {

    student.enrolledCourses.forEach(course =>
      acc.add(course)
    );

    return acc;

  }, new Set());

  // FILTER BY COURSE
  const filteredStudents = filterCourse
    ? sortedStudents.filter(student =>
        student.enrolledCourses.has(filterCourse)
      )
    : sortedStudents;

  return (
    <div className="container">

      <h1>Course Enrollment Dashboard</h1>

      {/* FORM */}
      <div className="form">

        <input
          placeholder="Student Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          placeholder="Courses (comma separated)"
          value={courses}
          onChange={(e) => setCourses(e.target.value)}
        />

        <input
          placeholder="GPA"
          type="number"
          value={gpa}
          onChange={(e) => setGpa(e.target.value)}
        />

        <button onClick={addStudent}>
          Add Student
        </button>

      </div>

      {/* FILTER */}
      <div className="filter">

        <input
          placeholder="Filter by course"
          value={filterCourse}
          onChange={(e) => setFilterCourse(e.target.value)}
        />

      </div>

      {/* STUDENTS */}
      <h2>Students</h2>

      <ul>

        {filteredStudents.map(student => (

          <li key={student.id}>

            <div className="student-info">

              <strong>{student.name}</strong>

              <p>GPA: {student.gpa}</p>

              <p>
                Courses: {Array.from(student.enrolledCourses).join(", ")}
              </p>

            </div>

            <button
              className="remove-btn"
              onClick={() => removeStudent(student.id)}
            >
              Remove
            </button>

          </li>

        ))}

      </ul>

      {/* UNIQUE COURSES */}

      <div className="courses">

        <h2>All Unique Courses</h2>

        <p>
          {Array.from(uniqueCourses).join(", ")}
        </p>

      </div>

    </div>
  );
}

export default App;