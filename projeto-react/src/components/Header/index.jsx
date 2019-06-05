import React from "react";

import logo from "../../assets/logo.png";

import "./style.css";

import SearchComponent from "../../components/Search";

const Header = () => (
  <div>
    <header className="header">
      <div className="mdl-grid">
        <div className="mdl-cell--2-col">
          <img alt="Logo" src={logo} className="header__logo" />
        </div>
        <div className="mdl-cell--3-col">
          <SearchComponent />
        </div>
      </div>
    </header>
  </div>
);

export default Header;
