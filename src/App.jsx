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

function App() {
  const [token, setToken] = useState(null);
  const [username, setUsername] = useState(null);
  const [id, setId] = useState(null);
  //can pass props down but not up. So can pass token to any that might need it.
  // endpoint users/me requires a token under "authorization"
  // PATCH has authorization piece.

  return (
    <>
      <BrowserRouter>
        <NavBar token={token} setToken={setToken} id={id} />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/products" element={<Products />}/>
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
            element={<Register setToken={setToken} />}
          />
          <Route
            path="/auth/me"
            element={
              <Account token={token} setToken={setToken} username={username} setId={setId} />
            }
          />
          <Route path="/carts/guest" element={<Cart />} />
          <Route path="/carts/user/:id" element={<Cart token={token} />} />
          <Route path="/users/checkout" element={<Checkout />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
