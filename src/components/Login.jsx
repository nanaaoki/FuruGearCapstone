import { React, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import loginpic from "../assets/loginpic.avif";
import { API_URL } from "./Products";
import { useLoginUserMutation } from "../redux/api";
import { useUserListQuery } from "../redux/api";
import { useDispatch } from "react-redux";

export default function Login(props) {
  const dispatch = useDispatch();
  const [userInfo, setUserInfo] = useState({
    username: "johnd",
    password: "m38rmF$",
  });

  const [errorMsg, setError] = useState(null);
  const [login] = useLoginUserMutation();
  const navigate = useNavigate();

  async function handleClick(event) {
    event.preventDefault();
    const { data, error } = await login(userInfo);
    if (error) {
      setError(error.data);
    } else {
      props.setToken(data.token);
      props.setUsername(userInfo.username);
      localStorage.setItem("token", JSON.stringify(data.token));
      localStorage.setItem("username", JSON.stringify(userInfo.username));
      navigate("/auth/me");
    }
  }

  const onUserInput = (e) => {
    if (errorMsg) {
      setError(null);
    }
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };

  return (
    <div className="login-elements">
      <div className="login-form-box">
        <h2 className="header"> Log In</h2>
        {errorMsg ? <p>{errorMsg}</p> : <span />}
        <form onSubmit={handleClick} className="loginform">
          <div className="inputgrid">
            <span className="login-span">
              <label className="login-label">Username:</label>
              <input
                value={userInfo.username}
                type="text"
                className="loginInput"
                name="username"
                onChange={onUserInput}
                required
              />
            </span>
            <span className="login-span">
              <label className="login-label">Password:</label>
              <input
                value={userInfo.password}
                type="password"
                className="loginInput"
                name="password"
                onChange={onUserInput}
                required
              />
            </span>
          </div>
          <button className="SubmitBtn">Submit</button>
          <p className="login-span">
            <span>Don't have an account?</span>
            <span className="login-span">
              <Link to="/auth/register" className="navLink">
                Create One Now
              </Link>
            </span>
          </p>
        </form>
      </div>
      <div className="login-pic-box">
        <img id="login-pic" src={loginpic} />
      </div>
    </div>
  );
}
