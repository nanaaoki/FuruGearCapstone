import { React, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useUserCartQuery } from "../redux/api";
import { getCart, clearCart } from "../slice/cartSlice";
import Cart from "./Cart";

export default function Checkout(props) {
  const currentCart = useSelector(getCart);
  const dispatch = useDispatch();
  const [orderConf, setOrderConf] = useState(false);
  const [bAddress, setBAddress] = useState(false);
  const [billingForm, setBillingForm] = useState({
    name: "Elon Musk",
    address: "666 Space World",
    city: "Mars",
    state: "CA",
    zipcode: "01010",
  });

  const handleBillingFormChange = (e) =>
    setBillingForm({ ...billingForm, [e.target.name]: e.target.value });

  if (!props.token) {
    return (
      <p style={{ padding: "50px 100px" }}>
        Please log in or create an account to check out cart items.
      </p>
    );
  }

  const cartSum = currentCart.reduce((accum, currentValue) => {
    return accum + currentValue.price;
  }, 0);

  const handleOrder = () => {
    setOrderConf(true);
    dispatch(clearCart());
  };

  return (
    <div>
      {orderConf === false ? (
        <div className="checkoutAll">
          <Link to={props.token ? `/carts/${props.userId}` : `/carts/guest`}>
            &#60;Return to Cart
          </Link>
          <h2>Checkout</h2>
          <div className="billing-and-pickup-box">
            <div className="billing-box">
              <h4 className="billing-h4">BILLING ADDRESS:</h4>
              {bAddress === false ? (
                <form className="billingform">
                  <label>Name</label>
                  <input
                    className="billingInput"
                    type="text"
                    value={billingForm.name}
                    placeholder={billingForm.name}
                    name="name"
                    onChange={handleBillingFormChange}
                    required
                  />
                  <label>Address</label>
                  <input
                    className="billingInput"
                    type="text"
                    value={billingForm.address}
                    placeholder={billingForm.address}
                    name="address"
                    onChange={handleBillingFormChange}
                    required
                  />
                  <label>City</label>
                  <input
                    className="billingInput"
                    type="text"
                    value={billingForm.city}
                    placeholder={billingForm.city}
                    name="city"
                    onChange={handleBillingFormChange}
                    required
                  />
                  <label>State</label>
                  <input
                    className="billingInput"
                    type="text"
                    value={billingForm.state}
                    placeholder={billingForm.state}
                    name="state"
                    onChange={handleBillingFormChange}
                    required
                  />
                  <label>Zipcode</label>
                  <input
                    className="billingInput"
                    type="text"
                    value={billingForm.zipcode}
                    placeholder={billingForm.zipcode}
                    name="state"
                    onChange={handleBillingFormChange}
                    required
                  />
                  <button onClick={() => setBAddress(true)}>
                    Save Address
                  </button>
                </form>
              ) : (
                <div className="billing-address">
                  <p className="billing-info">{billingForm.name}</p>
                  <p className="billing-info">{billingForm.address}</p>
                  <p className="billing-info">{billingForm.city}</p>
                  <p className="billing-info">{billingForm.state}</p>
                  <p className="billing-info">{billingForm.zipcode}</p>
                  <button onClick={() => setBAddress(false)}>
                    Edit Address
                  </button>
                </div>
              )}
            </div>
            <div className="pickup-box">
              <h4 className="billing-h4">SELECT PICK UP LOCATION:</h4>
              <div>
                <select className="pickup-dropdown">
                  <option value="none">Select Gym</option>
                  <option value="LIC">Long Island City</option>
                  <option value="QB">Queensbridge</option>
                  <option value="GOW">Gowanus</option>
                  <option value="GP">GP</option>
                </select>
              </div>
            </div>
          </div>

          <div className="cart-and-order-boxes">
            <div className="cart-box">
              {currentCart?.length ? (
                currentCart?.map((products) => {
                  // console.log(products)

                  return (
                    <div className="cart-items" key={products.id}>
                      <img src={products.image} width={"100px"} />
                      <div className="cart-info">
                        <p>{products.title}</p>
                        <p>${products.price.toFixed(2)}</p>
                      </div>
                    </div>
                  );
                })
              ) : (
                <h2>Your cart is empty.</h2>
              )}
            </div>
            <div className="order-box">
              <h4>ORDER SUMMARY</h4>
              <div className="order-summary">
                <p>Cart Total </p>
                <p>${cartSum.toFixed(2)}</p>
              </div>

              <button className="popup" onClick={handleOrder}>
                PLACE ORDER
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="">
          <h2>Thank you for your order. </h2>
          <p>Please coordinate with seller for drop-off / pick up day.</p>
        </div>
      )}
    </div>
  );
}
