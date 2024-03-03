function Register() {
  const [nameForm, setNameForm] = useState({
    firstname: "",
    lastname: "",
  });
  const [geoLocationForm, setGeoLocationForm] = useState({
    lat: "",
    long: "",
  });
  const [addressForm, setAddressForm] = useState({
    city: "",
    street: "",
    number: "",
    zipcode: "",
  });
  const [userForm, setUserForm] = useState({
    email: "",
    username: "",
    password: "",
    phone: "",
  });

  const [form, setForm] = useState({
    name: { ...nameForm },
    address: { geolocation: { ...geoLocationForm }, ...addressForm },
    ...userForm,
  });
  const [errorMsg, setError] = useState(null);
  const [register] = useRegisterMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // form values are {nameForm, geoLocationForm, userForm, addressForm}
    // register(nameForm, geoLocationForm, userForm, addressForm)
    // console.log("this is handle submit", data);
    setForm({
      name: { ...nameForm },
      address: { geolocation: { ...geoLocationForm }, ...addressForm },
      ...userForm,
    });

    const { data, error } = await register(form);

    console.log("this is data", data);
    if (error) {
      //error.data.message --> error message
      setError(error.data.message);
      console.log(`error ${JSON.stringify(error.data.message)}`);
    } //else {
    //     // console.log(props)
    //     //data.token --> has token value
    //     // props.setToken(data.token);
    //     console.log(`data ${JSON.stringify(data)}`);
    //   }
  };
  const handleChangeName = (e) =>
    setNameForm({ ...nameForm, [e.target.name]: e.target.value });

  const handleChangeGeolocation = (e) => {
    setGeoLocationForm({ ...geoLocationForm, [e.target.name]: e.target.value });
  };
  const handleChangeAddress = (e) => {
    setAddressForm({ ...addressForm, [e.target.name]: e.target.value });
  };
  const handleChangeUserForm = (e) => {
    setUserForm({ ...userForm, [e.target.name]: e.target.value });
  };
  return (
    <div>
      <h2>Register Form</h2>
      {/* error message */}
      {errorMsg ? <p>{errorMsg}</p> : <span />}
      <form onClick={handleSubmit}>
        <label htmlFor="email">Email: </label>
        <input
          type="text"
          value={userForm.email}
          name="email"
          onChange={handleChangeUserForm}
          placeholder="Email"
        />

        <label htmlFor="username">Username:</label>
        <input
          type="text"
          value={userForm.username}
          name="username"
          onChange={handleChangeUserForm}
          placeholder="Username"
        />

        <label htmlFor="password">Password: </label>
        <input
          type="password"
          value={userForm.password}
          name="password"
          onChange={handleChangeUserForm}
          placeholder="Password"
        />
        <label htmlFor="name">Firstname:</label>
        <input
          type="text"
          value={nameForm.firstname}
          name="firstname"
          onChange={handleChangeName}
          placeholder="Firstname"
        />

        <label htmlFor="name">Lastname: </label>
        <input
          type="text"
          value={nameForm.lastname}
          name="lastname"
          onChange={handleChangeName}
          placeholder="Lastname"
        />
        <label htmlFor="address">City:</label>
        <input
          type="text"
          value={addressForm.city}
          name="city"
          onChange={handleChangeAddress}
          placeholder="City"
        />

        <label htmlFor="address">Street:</label>
        <input
          type="text"
          value={addressForm.street}
          name="street"
          onChange={handleChangeAddress}
          placeholder="Street"
        />
        <label htmlFor="address">Number:</label>
        <input
          type="text"
          value={geoLocationForm.number}
          name="number"
          onChange={handleChangeAddress}
          placeholder="Number"
        />

        <label htmlFor="address">Zipcode:</label>
        <input
          type="text"
          value={geoLocationForm.zipcode}
          name="zipcode"
          onChange={handleChangeAddress}
          placeholder="Zipcode"
        />
        <label htmlFor="geolocation">Latitude:</label>
        <input
          type="text"
          name="lat"
          //   data-subfield="lat"
          value={geoLocationForm.lat}
          onChange={handleChangeGeolocation}
          placeholder="Latitude"
        />

        <label htmlFor="geolocation">Longitude:</label>
        <input
          type="text"
          name="long"
          value={geoLocationForm.long}
          onChange={handleChangeGeolocation}
          placeholder="Longitude"
        />
        <label htmlFor="phone">Phone Number:</label>
        <input
          type="number"
          value={userForm.phone}
          name="phone"
          onChange={handleChangeUserForm}
          placeholder="Phone Number"
        />

        <button>Submit</button>
      </form>
    </div>
  );
}
export default Register;
