import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { MainContext } from "./Context/MainContext";

const Sidebar = () => {
  const { showMenu, setShowMenu } = useContext(MainContext);
  return (
    <div className={`sidebar_section ${showMenu ? "active" : ""}`}>
      <ul className="item_list">
        <NavLink
          to="/user"
          className={({ isActive }) => {
            return isActive ? "active_nav" : "";
          }}
        >
          <li className="item">کاربران</li>
        </NavLink>
        <NavLink
          to="/post"
          className={({ isActive }) => {
            return isActive ? "active_nav" : "";
          }}
        >
          <li className="item">پست ها</li>
        </NavLink>
        <NavLink
          to="/todo"
          className={({ isActive }) => {
            return isActive ? "active_nav" : "";
          }}
        >
          <li className="item">کار ها</li>
        </NavLink>
        <NavLink
          to="/gallery"
          className={({ isActive }) => {
            return isActive ? "active_nav" : "";
          }}
        >
          <li className="item">گالری</li>
        </NavLink>
      </ul>
    </div>
  );
};
export default Sidebar;
