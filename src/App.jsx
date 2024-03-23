import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import "./index.css";
import NavBar from "./components/Navigations";
import Homepage from "./components/Homepage";
import Products from "./components/Products";
import SingleProduct from "./components/SingleProduct";
import Login from "./components/Login";
import Register from "./components/Register";
import Account from "./components/Account";
import Cart from "./components/Cart";
import Checkout from "./components/Checkout";
import Upload from "./components/uploadProduct";
import Footer from "./components/Footer";


function App() {
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [searchInput, setSearchInput] = useState("");

  const [username, setUsername] = useState(
    localStorage.getItem("username") || null
  );

  const [userId, setUserId] = useState(localStorage.getItem("userId") || null);

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

  return (
    <>
      <BrowserRouter>
        <div className="all-but-footer">
          <NavBar
            token={token}
            setToken={setToken}
            userId={userId}
            setSearchInput={setSearchInput}
            searchInput={searchInput}
          />

          <Routes>
            <Route
              path={token ? "/carts/:userId" : "/carts/guest"}
              element={<Cart token={token} userId={userId} />}
            />

            <Route path="/" element={<Homepage />} />
            <Route
              path="/products"
              element={<Products searchInput={searchInput} />}
            />
            <Route
              path="/products/:id"
              element={<SingleProduct token={token} userId={userId} />}
            />
            <Route
              path="/auth/login"
              element={<Login setToken={setToken} setUsername={setUsername} />}
            />
            <Route
              path="/auth/register"
              element={<Register setToken={setToken} setForm={setForm} />}
            />
            <Route
              path="/auth/me"
              element={
                <Account
                  token={token}
                  setToken={setToken}
                  username={username}
                  setUserId={setUserId}
                  setForm={setForm}
                />
              }
            />
            <Route path="/auth/upload" element={<Upload token={token} />} />
            <Route
              path="/users/checkout"
              element={<Checkout token={token} userId={userId} />}
            />
          </Routes>
        </div>

        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
