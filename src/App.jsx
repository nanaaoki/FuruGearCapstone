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
import Checkout from "./components/CheckOut";
import Upload from "./components/uploadProduct";
import Footer from "./components/Footer";

function App() {
  const [token, setToken] = useState(null);

  const [username, setUsername] = useState(null);
  const [userId, setUserId] = useState(null);
  const [productId, setProductId] = useState(null);
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

  

  // const [cartItems, setCartItems] = useState(() => {
  //   const storedCartItems = localStorage.getItem("cartItems");
  //   return storedCartItems ? JSON.parse(storedCartItems) : [];
  // });



  //can pass props down but not up. So can pass token to any that might need it.
  // endpoint users/me requires a token under "authorization"
  // PATCH has authorization piece.

  return (
    <>
      <BrowserRouter>
        <div className="all-but-footer">
          <NavBar token={token} setToken={setToken} userId={userId} />

          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/products" element={<Products />} />
            <Route
              path="/products/:id"
              element={<SingleProduct token={token} />}
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
            {/* <Route path="/carts/guest" element={<Cart />} /> */}
            <Route
              path={token ? "/carts/:userId" : "/carts/guest"}
              element={<Cart token={token} userId={userId} />}
            />
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
