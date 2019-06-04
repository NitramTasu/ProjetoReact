import React from "react";

import logo from "../../assets/logo.png";

import "./style.css";

import Example from "../../components/Demo";

const Header = () => (
  <div>
    <header className="header">
      <div className="mdl-grid">
        <div className="mdl-cell--12-col">
          <img alt="Logo" src={logo} className="header__logo" />
        </div>
        <div />
      </div>
    </header>
  </div>
);

export default Header;
