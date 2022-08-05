import React from "react";
import logo from "../images/logo.svg";

function Header(props) {
  return (
    <header className="header">
      <p>Привет</p>
      <img className="header__logo" src={logo} alt="логотип Место" />
    </header>
  );
}

export default Header;
