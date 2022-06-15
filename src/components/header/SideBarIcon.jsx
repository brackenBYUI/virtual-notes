import React from "react";
import { Link } from "react-router-dom";

const SideBarIcon = ({ icon, text = "tooltip", link }) => (
  <div>
    <Link to={link} className="sidebar-icon group">
      {icon}
      <span className="sidebar-tooltip group-hover:scale-100">{text}</span>
    </Link>
  </div>
);

export default SideBarIcon;
