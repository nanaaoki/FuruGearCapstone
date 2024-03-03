/* TODO - add your code to create a functional React component 
that renders a registration form */

import { useState } from "react";
import { useRegisterUserMutation } from "../redux/api";

export default function Register() {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newUsername, setNewUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState(null);

  const [register] = useRegisterUserMutation();

  async function handleSubmit(event) {
    event.preventDefault();

    
  }
// const { data, error } = await register(form);

  return (
    <div className="register-elements">
      <div className="register-form-box">
        <h2 className="header"> Register </h2>
        {error && <p>{error}</p>}
        <form onSubmit={handleSubmit} className="registerform">
          <div className="inputgrid">
            <span className="register-span">
              <label className="register-label">First Name: </label>
              <input
                value={firstname}
                type="text"
                onChange={(event) => setFirstname(event.target.value)}
                required
              />
            </span>
            <span className="register-span">
              <label className="register-label">Last Name: </label>
              <input
                value={lastname}
                type="text"
                onChange={(event) => setLastname(event.target.value)}
                required
              />
            </span>
            <span className="register-span">
              <label className="register-label">Email: </label>
              <input
                value={newEmail}
                type="text"
                onChange={(event) => setNewEmail(event.target.value)}
                required
              />
            </span>
            <span className="register-span">
              <label className="register-label">Username: </label>
              <input
                value={newUsername}
                type="text"
                onChange={(event) => setNewUsername(event.target.value)}
                required
              />
            </span>
            <span className="register-span">
              <label className="register-label">Password: </label>
              <input
                value={newPassword}
                type="password"
                onChange={(event) => setNewPassword(event.target.value)}
                required
              />
            </span>
          </div>
          <button className="SubmitBtn">Submit</button>
        </form>
      </div>
      <div className="register-pic-box">IMAGE</div>
    </div>
  );
}
