import React from "react";
import { Routes, Route} from 'react-router-dom';
import Dashboard from "./Pages/Dashboard";
import Landing from "./Pages/Landing";
import Login from "./Pages/Login";

function App() {
  return (
    <>
    <Routes>
      <Route path="/" element={<Landing />}/>
      <Route path="/admin/login" element={<Login />}/>
      <Route path="/dashboard" element={<Dashboard />}/>
    </Routes>
    </>
  );
}

export default App;
