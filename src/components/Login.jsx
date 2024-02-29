import { React, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import loginpic from "../assets/loginpic.avif";
import { API_URL } from "./Products";
import { useLoginUserMutation } from "../redux/api";
import { useUserListQuery } from "../redux/api";

export default function Login(props) {
  const [userInfo, setUserInfo] = useState({
    username: "",
    password: "",
  });

  const [errorMsg, setError] = useState(null);
  const [login] = useLoginUserMutation();
  const navigate = useNavigate();

  async function handleClick(event) {
    event.preventDefault();
    const { data, error } = await login(userInfo);
    console.log("data", userInfo);
    if (error) {
      setError(error.data);
    } else {
      props.setToken(data.token);
      props.setUsername(userInfo.username);

      console.log("token", data.token);

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
              <label className="login-label">Username: johnd </label>
              <input
                value={userInfo.username}
                type="username"

                name="username"
                onChange={onUserInput}
                required
              />
            </span>
            <span className="login-span">
              <label className="login-label">Password: m38rmF$</label>
              <input
                value={userInfo.password}
                type="password"

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
