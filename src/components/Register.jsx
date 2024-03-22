import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRegisterUserMutation } from "../redux/api";
import storedisplay from "../assets/storedisplay.jpeg";

export default function Register(props) {
  const navigate = useNavigate();
  const [register] = useRegisterUserMutation();
  const [errorMsg, setErrorMsg] = useState(null);
  const [nameForm, setNameForm] = useState({
    firstname: "",
    lastname: "",
  });
  const [addressForm, setAddressForm] = useState({
    number: "",
    street: "",
    city: "",
    zipcode: "",
  });
  const [userForm, setUserForm] = useState({
    email: "",
    username: "",
    password: "",
  });
  const [form, setForm] = useState({
    name: { ...nameForm },
    address: { ...addressForm },
    ...userForm,
  });

  //handle click for submitting registration form
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
    navigate("/auth/login");
  }

  const handleNameFormChange = (e) =>
    setNameForm({ ...nameForm, [e.target.name]: e.target.value });

  const handleUserFormChange = (e) =>
    setUserForm({ ...userForm, [e.target.name]: e.target.value });

  return (
    <div className="register-all-elements">
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
            <button className="SubmitBtn">Submit</button>
          </form>
        </div>
        <div className="register-pic-box">
          <img id="register-pic" src={storedisplay} />
        </div>
      </div>
    </div>
  );
}
