import React from "react";
import { NavLink } from "react-router-dom";
import "./Navigation.scss";
type Props = {};

const Navigation = (props: Props) => {
  return (
    <nav className="navigation">
      <NavLink to="/home"> home </NavLink>
      <a>/</a>
      <NavLink to="/organizer"> organizer </NavLink>
      <a>/</a>
      <NavLink to="/about"> about </NavLink>
    </nav>
  );
};

export default Navigation;
