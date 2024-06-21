/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from "react";
import Dashboard from "./HomeOptions/Dashboard";
import GenerateQR from "./HomeOptions/GenerateQR";
import GetReports from "./HomeOptions/GetReports";
import Settings from "./HomeOptions/Settings";

const AdminDashboardHome = ({
  city,
  onCityChange,
  companyName,
  onCompanyNameChange,
  packages,
  onPackagesChange,
  selectedOption,
}) => {
  const renderComponent = () => {
    switch (selectedOption) {
      case "Dashboard":
        return <Dashboard />;
      case "GenerateQR":
        return (
          <GenerateQR
            city={city}
            onCityChange={onCityChange}
            companyName={companyName}
            onCompanyNameChange={onCompanyNameChange}
            packages={packages}
            onPackagesChange={onPackagesChange}
          />
        );
      case "Reports":
        return <GetReports />;
      case "Settings":
        return <Settings />;
      default:
        return null;
    }
  };

  return <>{renderComponent()}</>;
};

export default AdminDashboardHome;
