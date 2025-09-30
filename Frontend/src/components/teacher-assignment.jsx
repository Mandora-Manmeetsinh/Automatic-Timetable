import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function TeacherAssignment() {
  const [teachers, setTeachers] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [classes, setClasses] = useState([]);
  const [assignments, setAssignments] = useState([]);

  const [selectedTeacher, setSelectedTeacher] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [selectedClass, setSelectedClass] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [teachersRes, subjectsRes, classesRes, assignmentsRes] = await Promise.all([
          axios.get("/api/teachers"),
          axios.get("/api/subjects"),
          axios.get("/api/classes"),
          axios.get("/api/assignments"),
        ]);

        setTeachers(teachersRes.data);
        setSubjects(subjectsRes.data);
        setClasses(classesRes.data);
        setAssignments(assignmentsRes.data);
      } catch (err) {
        console.error("Error fetching data", err);
      }
    };

    fetchData();
  }, []);

  const handleSave = async () => {
    if (!selectedTeacher || !selectedSubject || !selectedClass) {
      alert("Please select all fields before saving.");
      return;
    }

    try {
      const newAssignment = {
        teacherId: selectedTeacher,
        subjectId: selectedSubject,
        classId: selectedClass,
      };

      await axios.post("/api/assignments", newAssignment);

      const res = await axios.get("/api/assignments");
      setAssignments(res.data);

      setSelectedTeacher("");
      setSelectedSubject("");
      setSelectedClass("");
    } catch (err) {
      console.error("Error saving assignment", err);
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto bg-white shadow-lg rounded-xl">
      <h2 className="text-2xl font-bold mb-4">Teacher Assignment</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <select
          value={selectedTeacher}
          onChange={(e) => setSelectedTeacher(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="">Select Teacher</option>
          {teachers.map((t) => (
            <option key={t.id} value={t.id}>{t.name}</option>
          ))}
        </select>

        <select
          value={selectedSubject}
          onChange={(e) => setSelectedSubject(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="">Select Subject</option>
          {subjects.map((s) => (
            <option key={s.id} value={s.id}>{s.name}</option>
          ))}
        </select>

        <select
          value={selectedClass}
          onChange={(e) => setSelectedClass(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="">Select Class</option>
          {classes.map((c) => (
            <option key={c.id} value={c.id}>{c.name}</option>
          ))}
        </select>
      </div>

      <button
        onClick={handleSave}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Save Assignment
      </button>

      <div className="mt-6">
        <h3 className="text-xl font-semibold mb-2">Assigned Teachers</h3>
        <table className="w-full border-collapse border">
          <thead>
            <tr className="bg-gray-200">
              <th className="border px-4 py-2">Teacher</th>
              <th className="border px-4 py-2">Subject</th>
              <th className="border px-4 py-2">Class</th>
            </tr>
          </thead>
          <tbody>
            {assignments.map((a, idx) => (
              <tr key={idx}>
                <td className="border px-4 py-2">{a.teacherName}</td>
                <td className="border px-4 py-2">{a.subjectName}</td>
                <td className="border px-4 py-2">{a.className}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-6 text-right">
        <button
          onClick={() => navigate("/batch-assignment")}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Next → Batch Assignment
        </button>
      </div>
    </div>
  );
}

export default TeacherAssignment;
