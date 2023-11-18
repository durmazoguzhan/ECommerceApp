import React from "react";
import { NavLink } from "react-router-dom";

//NaveItems constructor ına parametre gönderiyorum
//NaveItems const componeninden bir nesne oluştulduğunda props ile buna veri gönderimi yapılıyor

const NaveItems = (props) => {
  return (
    <>
      {
        <li className="has-drowdown">
          {/* Menü Ana Başlıkları*/}
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
