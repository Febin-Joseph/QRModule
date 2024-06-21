/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
// labby-labs\frontEnd\src\components\AdminDashboardPageComponents\AdminDashboardSidebar.jsx
import React from "react";
import {
  BsGrid1X2Fill,
  BsPeopleFill,
  BsFillGearFill,
} from "react-icons/bs";
import { MdLogout } from "react-icons/md";
import { RiAiGenerate } from "react-icons/ri";
import { TbReportAnalytics } from "react-icons/tb";
import checkMedLogo from "../../assets/checkmed_newlogo.png";

const AdminDashboardSidebar = ({
  openSidebarToggle,
  OpenSidebar,
  handleMenuClick,
  handleLogout,
}) => {
  return (
    <aside
      id="sidebar"
      className={openSidebarToggle ? "sidebar-responsive" : ""}
    >
      <div className="sidebar-title">
        <div className="sidebar-brand">
          <img src={checkMedLogo} style={{ width: "140px" }} alt="" />
        </div>
        <span className="icon close_icon" onClick={OpenSidebar}>
          X
        </span>
      </div>

      <ul className="sidebar-list">
        <li
          className="sidebar-list-item"
          onClick={() => handleMenuClick("Dashboard")}
        >
          <a href="#">
            <BsGrid1X2Fill className="icon" /> Dashboard
          </a>
        </li>
        <li
          className="sidebar-list-item"
          onClick={() => handleMenuClick("GenerateQR")}
        >
          <a href="#">
            <RiAiGenerate className="icon" /> Generate QR
          </a>
        </li>
        <li
          className="sidebar-list-item"
          onClick={() => handleMenuClick("Reports")}
        >
          <a href="#">
            <TbReportAnalytics className="icon" /> Reports
          </a>
        </li>
        <li
          className="sidebar-list-item"
          onClick={() => handleMenuClick("ForSomeUse")}
        >
          <a href="#">
            <BsPeopleFill className="icon" /> For Some Use
          </a>
        </li>
        <li className="sidebar-list-item" onClick={handleLogout}>
          <a href="#">
            <MdLogout className="icon" /> LogOut
          </a>
        </li>
        <li
          className="sidebar-list-item"
          onClick={() => handleMenuClick("Settings")}
        >
          <a href="#">
            <BsFillGearFill className="icon" /> Settings
          </a>
        </li>
      </ul>
    </aside>
  );
};

export default AdminDashboardSidebar;
