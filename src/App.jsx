import React, { Suspense } from "react";
import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";

const Login_page = React.lazy(() => import("./Pages/Login_Page"));
const DashBoard_page = React.lazy(() => import("./Pages/DashBoard_Page"));

const isAuthenticated = () => {
  return !!localStorage.getItem("taskUser");
};

// Redirect to /dashboard if already logged in
const PublicRoute = ({ children }) => {
  return isAuthenticated() ? <Navigate to="/dashboard" replace /> : children;
};

// Redirect to /login if not logged in
const ProtectedRoute = ({ children }) => {
  return isAuthenticated() ? children : <Navigate to="/login" replace />;
};

const App = () => {
  return (
    <Suspense fallback={<h1>Loading...</h1>}>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />

        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login_page />
            </PublicRoute>
          }
        />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashBoard_page />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Suspense>
  );
};

export default App;