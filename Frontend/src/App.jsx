import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/dashboard";
import Santri from "./pages/santri"; 
import Mudaris from "./pages/mudaris"
import Subjects from "./pages/subjects";
import Dorms from "./pages/dorms";
import DormAssignment from "./pages/DormAssignment";
import Classrooms from "./pages/classroom";
import Login from "./login/index";
import Grades from "./pages/grades";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/santri" element={<Santri />} /> 
        <Route path="/asrama" element={<Dorms />} />
        <Route path="/pembagian-kamar" element={<DormAssignment />} />
        <Route path="/ustadz" element={<Mudaris />} />
        <Route path="/jadwal" element={<Subjects />} />
        <Route path="/ruang-kelas" element={<Classrooms />} />
        <Route path="/nilai" element={<Grades />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
