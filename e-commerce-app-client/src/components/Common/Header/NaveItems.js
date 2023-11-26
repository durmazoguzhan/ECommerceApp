import React from "react";
import { NavLink } from "react-router-dom";

export const NaveItems = (props) => {
  return (
    <>
      {
        <li>
          <a href="#!" className="main-menu-link">
            {props.item.name}
            <i className="fa fa-angle-down"></i>
          </a>
          <ul className="sub-menu">
            {props.item.children.map((subMenu, subMenuIndex) => (
              <li key={subMenuIndex}>
                <NavLink to={subMenu.href}>{subMenu.name}</NavLink>
              </li>
            ))}
          </ul>
        </li>
      }
    </>
  );
};

export default NaveItems;
