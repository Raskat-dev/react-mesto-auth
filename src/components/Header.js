import React from "react";
import logoPath from "../images/logo1.svg";

function Header(props) {
  return (
    <header className="header">
      <img src={logoPath} alt="лого" className="logo" />
      <nav className="header__nav">
        {props.children}
      </nav>
    </header>
  );
}

export default Header;
