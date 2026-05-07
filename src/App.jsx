import React, { Suspense } from "react";
import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";

const Login_page = React.lazy(() => import("./Pages/Login_Page"));
const DashBoard_page = React.lazy(() => import("./Pages/DashBoard_Page"));
const App = () => {
  return (
    <Suspense fallback={<h1>Loading...</h1>}>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login_page />} />
        <Route path="/dashboard" element={<DashBoard_page />} />
      </Routes>
    </Suspense>
  );
};

export default App;