/* TODO - add your code to create a functional React component 
that renders a navigation bar for the different views 
in your single page application. 
You may consider conditionally rendering some options - 
for example 'Login' should be available if someone has not logged in yet. */

import { React, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import BrandLogo from "../assets/brandlogo.png";
import cartIcon from "../assets/cartIcon.png";
import accountIcon from "../assets/accountIcon.png";
import { FaTrashAlt } from "react-icons/fa";
import { API_URL } from "./Products";

export default function NavBar(props) {
  const navigate = useNavigate();


  const logoutUser = () => {
    props.setToken(null);
    navigate("/");
  };


  return (
    <div className="navBar">
      <div>
        <Link to="/">
          <img id="logo-image" src={BrandLogo} />
        </Link>
      </div>
      <Link to="/products" className="navLink">
        All Products
      </Link>
      <div>
        <Link to={props.token ? "/auth/me" : "/auth/login"} className="navLink">
          <img id="accountIcon" src={accountIcon} width="30" />
        </Link>

        <Link to={props.token ? `/carts/user/${props.id}`: "/carts/guest"} className="navLink">
          <img id="cartIcon" src={cartIcon} width="30" />
        </Link>
      </div>
      <div></div>
    </div>
  );
}
