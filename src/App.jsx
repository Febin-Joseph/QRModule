/* eslint-disable no-unused-vars */
// labby-labs\frontEnd\src\App.jsx
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage";
import UserDetailsPage from "./components/UserDetailsPage";
import ReportsPage from "./components/ReportsPage";
import AdminPage from "./components/AdminPage";
import AdminDashboardPage from "./components/AdminDashboardPage.jsx";
import "./App.css";
import axios from "axios";


function App() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [userData, setUserData] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [city, setCity] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [packages, setPackages] = useState({
    package1: "",
    package2: "",
    package3: "",
    package4: "",
  });

  const handlePhoneNumberSubmit = async (number) => {
    setPhoneNumber(number);
    try {
      const response = await axios.post("https://pavancheckmedbackend-2.onrender.com/api/user", {
        phoneNumber: number,
      });
      setUserData(response.data);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const handleAdminLogin = async (username, password) => {
    try {
      const response = await axios.post(
        "https://pavancheckmedbackend-2.onrender.com/api/admin/login",
        {
          username,
          password,
        }
      );
      if (response.status === 200) {
        setIsAdmin(true);
      }
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  const handleCityUpdate = (newCity) => {
    setCity(newCity);
  };

  const handleCompanyNameUpdate = (newCompanyName) => {
    setCompanyName(newCompanyName);
  };

  const handlePackagesUpdate = (newPackages) => {
    setPackages(newPackages);
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<AdminPage onAdminLogin={handleAdminLogin} />}
        />
        <Route
          path="/admin-dashboard"
          element={
            <AdminDashboardPage
              isAdmin={isAdmin}
              city={city}
              onCityChange={handleCityUpdate}
              companyName={companyName}
              onCompanyNameChange={handleCompanyNameUpdate}
              packages={packages}
              onPackagesChange={handlePackagesUpdate}
            />
          }
        />
        <Route
          path="/home-page/:city/:companyName"
          element={
            <HomePage onPhoneNumberSubmit={handlePhoneNumberSubmit} />
          }
        />
        <Route
          path="/user-details/:city/:companyName"
          element={
            <UserDetailsPage
              phoneNumber={phoneNumber}
              userData={userData}
              packages={packages}
            />
          }
        />
        <Route
          path="/reports"
          element={<ReportsPage phoneNumber={phoneNumber} userData={userData} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
