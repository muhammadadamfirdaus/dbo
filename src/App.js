import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Dashboard from "./pages/dashboard/Dashboard";
import Homepage from "./pages/homepage/Homepage";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import VerifyEmail from "./pages/auth/VerifyEmail";
import AuthSuccess from "./pages/auth/AuthSuccess";

import Profile from "./pages/profile";
import ProfileUpdate from "./pages/profile/profileUpdate";
import "./App.css";

import Customers from "./pages/customers/Customers";
import DetailCustomer from "./pages/customers/detailCustomer";
import Products from "./pages/products/Products";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/email-verification" element={<VerifyEmail />} />
          <Route path="/auth-success" element={<AuthSuccess />} />

          <Route path="/customers" element={<Customers />} />
          <Route path="/customers/:id" element={<DetailCustomer />} />
          <Route path="/products" element={<Products />} />

          <Route path="/profile" element={<Profile />} />
          <Route path="/profile-edit" element={<ProfileUpdate />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
