import React from "react";
import { Link } from "react-router-dom";

const Sidebar = ({ userRoles }) => {
  const getMenuItems = () => {
    
    const menuItemsByRole = {
      Mozo: [
        { to: "/Ventas", label: "Ventas" },
      ],
      Gerente: [
        { to: "/Ventas", label: "Ventas" },
        { to: "/Mesas", label: "Mesas" },
        { to: "/AltaMozos", label: "Alta de mozos" },
      ],
      CEO: [
        { to: "/Ventas", label: "Ventas" },
        { to: "/Mesas", label: "Mesas" },
        { to: "/AltaMozos", label: "Mozos" },
        { to: "/personal", label: "Personal" },
        { to: "/historial-de-ventas", label: "Historial de ventas" },
      ],
    };

  
    const userMenuItems = userRoles.reduce(
      (acc, role) => acc.concat(menuItemsByRole[role] || []),
      []
    );


    const uniqueMenuItems = Array.from(new Set(userMenuItems.map(item => item.to)));

    return uniqueMenuItems.map((to, index) => userMenuItems.find(item => item.to === to));
  };

  const menuItems = getMenuItems();

  return (
    <div className="sidebar">
      <ul>
        {menuItems.map((item, index) => (
          <li key={index}>
            <Link to={item.to}>{item.label}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
