import React from 'react';
import { NavLink } from "react-router-dom";

const SideBarNavLink = ({children,ariaLabel,role,to}) => {
  return (
    <NavLink
      to={to}
      aria-label={ariaLabel}
      role={role}
      className={({ isActive }) =>
        `flex items-center mt-1 space-x-2 ${
          isActive ? "p-3 text-lg  rounded-full bg-gray-200" : " p-3 text-lg  rounded-full hover:bg-gray-200"
        }`
      }
    >
             {children} 
    </NavLink>
  )
}

export default SideBarNavLink