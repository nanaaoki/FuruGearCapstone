import { React } from "react";
import { Link, useNavigate } from "react-router-dom";
import BrandLogo from "../assets/logo.png";
import { FaBagShopping } from "react-icons/fa6";
import { FaRegUser } from "react-icons/fa";
import { MdOutlineSell } from "react-icons/md";
import { FaSistrix } from "react-icons/fa6";

export default function NavBar(props) {
  const navigate = useNavigate();

  const logoutUser = () => {
    props.setToken(null);
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("userId");
    dispatch(clearCart());
    navigate("/");
  };

  const localStorageToken = JSON.parse(localStorage.getItem("token"));
  const localStorageUserId = JSON.parse(localStorage.getItem("userId"));

  //SEARCH BAR: only navigates to the products endpoint if there are alphabets. not spaces or numbers.
  const handleChange = (e) => {
    e.preventDefault();
    if (("abcdefghijklmnopqrstuvwxyz").includes(props.searchInput)) {
      navigate("/products")
    }
    props.setSearchInput(e.target.value);
  };

  return (
    <div className="navBar-container">
      <div className="navBar">
        <div className="leftNav">
          <Link to="/" className="navLinkL">
            <img id="logo-image" src={BrandLogo} />
          </Link>
          {/* Search bar */}
          <div className="searchbar-wrapper">
            <FaSistrix id="search-icon" />
            <input
              type="text"
              placeholder="type to search"
              value={props.searchInput}
              onChange={handleChange}
              className="searchInput"
            />
          </div>
        </div>
        <div className="rightNav">
          <div className="rRightNav">
            <Link
              to={localStorageToken || props.token ? "/auth/me" : "/auth/login"}
              className="navLinkR"
            >
              <FaRegUser role="button" className="navIcon" />
            </Link>

            <Link
              to={
                props.token || localStorageToken
                  ? `/carts/${localStorageUserId}`
                  : "/carts/guest"
              }
              className="navLinkR"
            >
              <FaBagShopping role="button" className="navIcon" />
            </Link>
          </div>
          <div className="lRightNav">
            {(props.token || localStorageToken) && (
              <Link to={`/auth/upload`} className="navLinkR">
                <MdOutlineSell role="button" className="navIcon uploadIcon" />
              </Link>
            )}
          </div>
        </div>
      </div>
      <div className="secondBar">
        <Link to="/products" className="shop-all-nav navtext">
          Shop All
        </Link>

        {(props.token || localStorageToken) && (
          <div className="LogoutBar">
            <Link to={`/`} onClick={logoutUser} className="logoutText">
              Logout
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
