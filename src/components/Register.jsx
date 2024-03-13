import { useState } from "react";
import {useNavigate } from "react-router-dom";
import { useRegisterUserMutation } from "../redux/api";

export default function Register(props) {
  const navigate = useNavigate();
  const [nameForm, setNameForm] = useState({
    firstname: "fname",
    lastname: "lname",
  });

  const [addressForm, setAddressForm] = useState({
    number: "",
    street: "",
    city: "",
    zipcode: "",
  });
  const [userForm, setUserForm] = useState({
    email: "abc@abc.com",
    username: "test",
    password: "adfadsfadf",
  });

  const [form, setForm] = useState({
    name: { ...nameForm },
    address: { ...addressForm },
    ...userForm,
  });

  const [errorMsg, setErrorMsg] = useState(null);

  const [register] = useRegisterUserMutation();

  async function handleClick(event) {
    event.preventDefault();
    setForm({
      name: { ...nameForm },
      address: { ...addressForm },
      ...userForm,
    });
    const { data, error } = await register(form);
    if (error) {
      setErrorMsg(error.data.message);
    }        
    console.log("form", form )
    props.token ? navigate("/auth/me") : navigate("/auth/login")
  }

  const handleNameFormChange = (e) =>
    setNameForm({ ...nameForm, [e.target.name]: e.target.value });
  // const handleAddressFormChange = (e) =>
  // setNameForm({ ...nameForm, [e.target.name]: e.target.value});
  const handleUserFormChange = (e) =>
    setNameForm({ ...nameForm, [e.target.name]: e.target.value });

  return (
    <div className="register-elements">
      <div className="register-form-box">
        <h2 className="header"> Register </h2>
        {errorMsg && <p>{errorMsg}</p>}
        <form onSubmit={handleClick} className="registerform">
          <div className="inputgrid">
            <span className="register-span">
              <label className="register-label">First Name: </label>
              <input
                value={nameForm.firstname}
                type="text"
                className="registerInput"
                name="firstname"
                onChange={handleNameFormChange}
                required
              />
            </span>
            <span className="register-span">
              <label className="register-label">Last Name: </label>
              <input
                value={nameForm.lastname}
                type="text"
                className="registerInput"
                name="lastname"
                onChange={handleNameFormChange}
                required
              />
            </span>
            <span className="register-span">
              <label className="register-label">Email: </label>
              <input
                value={userForm.email}
                type="text"
                className="registerInput"
                name="email"
                onChange={handleUserFormChange}
                required
              />
            </span>
            <span className="register-span">
              <label className="register-label">Username: </label>
              <input
                value={userForm.username}
                type="text"
                className="registerInput"
                name="username"
                onChange={handleUserFormChange}
                required
              />
            </span>
            <span className="register-span">
              <label className="register-label">Password: </label>
              <input
                value={userForm.password}
                type="password"
                className="registerInput"
                name="password"
                onChange={handleUserFormChange}
                required
              />
            </span>
          </div>
          <button className="SubmitBtn">
            Submit
          </button>
        </form>
      </div>
      <div className="register-pic-box">IMAGE</div>
    </div>
  );
}
