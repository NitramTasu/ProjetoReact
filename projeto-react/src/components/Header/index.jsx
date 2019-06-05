import React from "react";
import logo from "../../assets/logo.png";
import { Link } from "react-router-dom";

import SearchComponent from "../../components/Search";
import "./style.css";

const Header = () => (
  <div>
    <header className="header">
      <div className="mdl-grid">
        <div className="mdl-cell--2-col">
          <Link to="/">
            <img alt="Logo" src={logo} className="header__logo" />
          </Link>
        </div>
        <div className="mdl-cell--6-col">
          <SearchComponent />
        </div>
      </div>
    </header>
  </div>
);

export default Header;
