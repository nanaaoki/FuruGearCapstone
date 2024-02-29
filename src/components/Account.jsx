import { React, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useUserListQuery } from "../redux/api";

export default function Account(props) {
  const navigate = useNavigate();

  const { data, error, isLoading } = useUserListQuery(props.token);

  const logoutUser = () => {
    props.setToken(null);
    navigate("/");
  };

  if (isLoading) {
    return <p>Loading Info...</p>;
  }
  if (error) {
    return <p>Could not load info...</p>;
  }


  // useEffect(()=> {
  //   const foundUser = data.find((user) => user.username === props.username);
  //   props.setId(foundUser.id);
  //   console.log("id", foundUser.id);
  // },[])


  const user = data.find((user) => user.username === props.username);
  props.setId(user.id)

  return (
    <div className="account-element">
      <h1>Account</h1>
      <button onClick={logoutUser} className="logout-btn">
        Log Out
      </button>

      <div className="Profile-box">
        <h2>Profile</h2>
        <h3>
          Name: {user.name.firstname} {user.name.lastname}
        </h3>
        <h3>Email: {user.email}</h3>
        <h3>Password: {user.password}</h3>
      </div>
      <div className="Address-box">
        <h2>Address</h2>
        <h3>
          Street: {user.address.number} {user.address.street}
        </h3>
        <h3>City: {user.address.city}</h3>
        <h3>Zipcode: {user.address.zipcode}</h3>
      </div>
    </div>
  );
}
