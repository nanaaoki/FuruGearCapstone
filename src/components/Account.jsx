import { React, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useUserListQuery } from "../redux/api";
import { useDispatch } from "react-redux";
import { clearCart } from "../slice/cartSlice";

//props = token, setToken, username, setId
export default function Account(props) {
  console.log("props", props); //returns token, username, settoken, and setUserId
  const navigate = useNavigate();
  const [edit, setEdit] = useState(false);
  const dispatch = useDispatch();

  const { data, error, isLoading } = useUserListQuery({ token: props.token });

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

  const logoutUser = () => {
    props.setToken(null);
    localStorage.setItem("RESET_CART", []);
    dispatch(clearCart());
    navigate("/");
  };

  if (isLoading) {
    return <p>Loading Info...</p>;
  }
  if (error) {
    return <p>Could not load info...</p>;
  }
  if (!props.token) {
    navigate("/auth/login/");
  }

  const user = data.find((user) => user.username === props.username);

  //delays the execution of setUserId
  setTimeout(() => {
    props.setUserId(user.id);
  });

  const handleAddressFormChange = (e) =>
    setAddressForm({ ...addressForm, [e.target.name]: e.target.value });

  const handleNameFormChange = (e) =>
    setNameForm({ ...nameForm, [e.target.name]: e.target.value });

  const handleUserFormChange = (e) =>
    setUserForm({ ...userForm, [e.target.name]: e.target.value });

  const handleSave = (e) => {
    e.preventDefault();
    setForm({
      name: { ...nameForm },
      address: { ...addressForm },
      ...userForm,
    });
    setEdit((prev) => false);
  };

  console.log("form", form);
  console.log("user", user);
  return (
    <div>
      {edit === false ? (
        <div className="accountAll">
          <h2>hi, {user.name.firstname}! </h2>
          <button onClick={logoutUser} className="logout-btn">
            Log Out
          </button>

          <div className="account-boxes">
            <div className="Profile-box">
              <h2>Profile</h2>
              <label className="profile-info">
                Name: {user.name.firstname} {user.name.lastname}
              </label>
              <label className="profile-info">Email: {user.email}</label>
              <label className="profile-info">Password: {user.password}</label>

              <h2>Address</h2>
              <label className="profile-info">
                Street: {user.address.number} {user.address.street}
              </label>
              <label className="profile-info">City: {user.address.city}</label>
              <label className="profile-info">Zipcode: {user.address.zipcode}</label>

              <button onClick={() => setEdit(true)}>edit</button>
            </div>
          </div>
        </div>
      ) : (
        //EDIT FIELDS
        <div className="Edit-box">
          <div className="Edit-Profile-box">
            <h2>Edit Profile</h2>
            <form onSubmit={handleSave} className="editform">
              <div className="form-input">
                <div className="user-edit">
                  <label className="edit-label">First Name:</label>
                  <input
                    type="text"
                    value={nameForm.firstname}
                    className="editInput"
                    name="firstname"
                    onChange={handleNameFormChange}
                    placeholder={user.name.firstname}
                  />
                  <label className="edit-label">Last Name:</label>
                  <input
                    type="text"
                    value={nameForm.lastname}
                    className="editInput"
                    name="lastname"
                    onChange={handleNameFormChange}
                    placeholder={user.name.lastname}
                  />
                  <label className="edit-label">Username:</label>
                  <input
                    type="text"
                    value={userForm.username}
                    className="editInput"
                    name="username"
                    onChange={handleUserFormChange}
                    placeholder={user.username}
                  />

                  <label className="edit-label">Email:</label>
                  <input
                    type="email"
                    value={userForm.email}
                    className="editInput"
                    name="email"
                    onChange={handleUserFormChange}
                    placeholder={user.email}
                  />
                  <label className="edit-label">Password:</label>

                  <input
                    type="password"
                    value={userForm.password}
                    className="editInput"
                    name="password"
                    onChange={handleUserFormChange}
                    placeholder={user.password}
                  />
                </div>
                <div className="address-edit">
                  <label className="edit-label">Number:</label>
                  <input
                    type="text"
                    value={addressForm.number}
                    className="editInput"
                    name="number"
                    onChange={handleAddressFormChange}
                    placeholder={user.address.number}
                  />

                  <label className="edit-label">Street:</label>
                  <input
                    type="text"
                    value={addressForm.street}
                    className="editInput"
                    name="street"
                    onChange={handleAddressFormChange}
                    placeholder={user.address.street}
                  />
                  <label className="edit-label">City:</label>
                  <input
                    type="text"
                    value={addressForm.city}
                    className="editInput"
                    name="city"
                    onChange={handleAddressFormChange}
                    placeholder={user.address.city}
                  />
                  <label className="edit-label">Zipcode:</label>
                  <input
                    type="text"
                    value={addressForm.zipcode}
                    className="editInput"
                    name="zipcode"
                    onChange={handleAddressFormChange}
                    placeholder={user.address.zipcode}
                  />
                </div>
              </div>
              <button className="save-edit-btn">Save</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
