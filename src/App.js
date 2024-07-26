import React from "react";
import { Routes, BrowserRouter, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Setting from "./pages/Setting/Setting.jsx";
import Account from "./pages/Account/Account.jsx";
import Login from "./pages/Auth/Login.jsx";
import ProtectedRoute from "./pages/Auth/ProtectedRoute.jsx";
import Signup from "./pages/Auth/Register.jsx";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route
          path="/about"
          element={
            <ProtectedRoute>
              <Account />
            </ProtectedRoute>
          }
        />
        <Route
          path="/setting"
          element={
            <ProtectedRoute>
              <Setting />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Register"
          element={
            <ProtectedRoute>
              <Signup />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
