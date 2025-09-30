import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function BatchAssignment() {
  const [batches, setBatches] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [assignments, setAssignments] = useState([]);

  const [selectedBatch, setSelectedBatch] = useState("");
  const [selectedTeacher, setSelectedTeacher] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [batchesRes, teachersRes, assignmentsRes] = await Promise.all([
          axios.get("/api/batches"),
          axios.get("/api/teachers"),
          axios.get("/api/batch-assignments"),
        ]);

        setBatches(batchesRes.data);
        setTeachers(teachersRes.data);
        setAssignments(assignmentsRes.data);
      } catch (err) {
        console.error("Error fetching data", err);
      }
    };

    fetchData();
  }, []);

  const handleSave = async () => {
    if (!selectedBatch || !selectedTeacher) {
      alert("Please select both teacher and batch before saving.");
      return;
    }

    try {
      const newAssignment = {
        batchId: selectedBatch,
        teacherId: selectedTeacher,
      };

      await axios.post("/api/batch-assignments", newAssignment);

      const res = await axios.get("/api/batch-assignments");
      setAssignments(res.data);

      setSelectedBatch("");
      setSelectedTeacher("");
    } catch (err) {
      console.error("Error saving batch assignment", err);
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto bg-white shadow-lg rounded-xl">
      <h2 className="text-2xl font-bold mb-4">Batch Assignment</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <select
          value={selectedBatch}
          onChange={(e) => setSelectedBatch(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="">Select Batch</option>
          {batches.map((b) => (
            <option key={b.id} value={b.id}>{b.name}</option>
          ))}
        </select>

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
      </div>

      <button
        onClick={handleSave}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Save Batch Assignment
      </button>

      <div className="mt-6">
        <h3 className="text-xl font-semibold mb-2">Assigned Batches</h3>
        <table className="w-full border-collapse border">
          <thead>
            <tr className="bg-gray-200">
              <th className="border px-4 py-2">Batch</th>
              <th className="border px-4 py-2">Teacher</th>
            </tr>
          </thead>
          <tbody>
            {assignments.map((a, idx) => (
              <tr key={idx}>
                <td className="border px-4 py-2">{a.batchName}</td>
                <td className="border px-4 py-2">{a.teacherName}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-6 text-right">
        <button
          onClick={() => navigate("/teacher-assignment")}
          className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
        >
          ← Back to Teacher Assignment
        </button>
      </div>
    </div>
  );
}

export default BatchAssignment;
