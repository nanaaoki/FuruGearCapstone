/* TODO - add your code to create a functional React component 
that renders a navigation bar for the different views 
in your single page application. 
You may consider conditionally rendering some options - 
for example 'Login' should be available if someone has not logged in yet. */

import { React, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import BrandLogo from "../assets/logo.png";
import { FaBagShopping } from "react-icons/fa6";
import { FaRegUser } from "react-icons/fa";
import { API_URL } from "./Products";
import { MdOutlineSell } from "react-icons/md";

export default function NavBar(props) {
  const navigate = useNavigate();

  const logoutUser = () => {
    props.setToken(null);
    navigate("/");
  };

  return (
    <div className="navBar-container">
      <div className="navBar">
        <div className="leftNav">
          <Link to="/" className="navLinkL">
            <img id="logo-image" src={BrandLogo} />
          </Link>
          <Link to="/products" className="navLinkL navtext">
            Shop All
          </Link>
        </div>
        <div className="rightNav">
          {props.token && (
            <Link to={`/auth/upload`} className="navLinkR">
              <MdOutlineSell role="button" className="navIcon" />
            </Link>
          )}

          <Link
            to={props.token ? "/auth/me" : "/auth/login"}
            className="navLinkR"
          >
            <FaRegUser role="button" className="navIcon" />
          </Link>

          <Link
            to={props.token ? `/carts/${props.userId}` : "/carts/guest"}
            className="navLinkR"
          >
            <FaBagShopping role="button" className="navIcon" />
          </Link>
        </div>
      </div>
      <div className="searchBar">
        test
      </div>
    </div>
  );
}
