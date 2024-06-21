/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState } from "react";
import AdminDashboardHeader from "./AdminDashboardPageComponents/AdminDashboardHeader.jsx";
import AdminDashboardHome from "./AdminDashboardPageComponents/AdminDashboardHome.jsx";
import AdminDashboardSidebar from "./AdminDashboardPageComponents/AdminDashboardSidebar.jsx";
import "./AdminDashboardPageComponents/AdminDashboardCss.css";
import { useNavigate } from "react-router-dom";

const AdminDashboardPage = ({
  city,
  onCityChange,
  companyName,
  onCompanyNameChange,
  packages,
  onPackagesChange,
}) => {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);
  const [selectedOption, setSelectedOption] = useState("Dashboard");

  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    navigate("/");
  };
  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };

  const handleMenuClick = (option) => {
    setSelectedOption(option);
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2" style={{marginLeft:"-20px"}}>
          <AdminDashboardSidebar
            openSidebarToggle={openSidebarToggle}
            OpenSidebar={OpenSidebar}
            handleMenuClick={handleMenuClick}
            handleLogout={handleLogout}
          />
        </div>
        <div className="col-md-10">
          <AdminDashboardHeader OpenSidebar={OpenSidebar} />
          <AdminDashboardHome
            city={city}
            onCityChange={onCityChange}
            companyName={companyName}
            onCompanyNameChange={onCompanyNameChange}
            packages={packages}
            onPackagesChange={onPackagesChange}
            selectedOption={selectedOption}
          />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
