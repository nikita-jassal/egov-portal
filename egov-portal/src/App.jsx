import { Routes, Route } from "react-router-dom";
import { useState } from 'react'
import './App.css'

import Login from "./pages/Login";
import Register from "./pages/Register";
import CitizenDashboard from "./pages/citizen/CitizenDashboard";
import SubmitComplaint from "./pages/citizen/SubmitComplaint";
import MyComplaints from "./pages/citizen/MyComplaints";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AllComplaints from "./pages/admin/AllComplaints";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />

      <Route path="/register" element={<Register />} />
      <Route
        path="/citizen/dashboard"
        element={<CitizenDashboard />}
      />

      <Route
        path="/citizen/submit-complaint"
        element={<SubmitComplaint />}
      />

      <Route
      path="/citizen/my-complaints"
       element={<MyComplaints />}
      />

      <Route
     path="/admin/dashboard"
     element={<AdminDashboard />}
    />
     <Route
     path="/admin/complaints"
     element={<AllComplaints />}
    />

    </Routes>
  );
}

export default App;
