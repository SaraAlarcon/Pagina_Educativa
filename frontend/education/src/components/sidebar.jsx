import React from "react";
import { Link } from "react-router-dom";
import {FaClipboardList, FaGraduationCap} from "react-icons/fa";
import "../stylescomponents/Sidebar.css";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <ul className="sidebar-menu">

        {/* Actividades */}
        <li className="sidebar-item">
          <Link to="/actividades" className="sidebar-link">
            <div className="sidebar-icon">
              <FaClipboardList />
            </div>
            <div className="sidebar-text">Actividades</div>
          </Link>
        </li>

        {/* Clases */}
        <li className="sidebar-item">
          <Link to="/clases" className="sidebar-link">
            <div className="sidebar-icon">
              <FaGraduationCap />
            </div>
            <div className="sidebar-text">Clases</div>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
