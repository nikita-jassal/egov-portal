import { Routes, Route } from "react-router-dom";
import { useState } from 'react'
import './App.css'
import Navbar from './Components/Navbar'
import Hero from './Components/Hero'
import HowWork from './Components/HowWork'
import Login from './pages/Login'


function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <HowWork/>
      
    </>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}



export default App
