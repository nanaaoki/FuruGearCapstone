import { React, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { getCart, clearCart } from "../slice/cartSlice";

import reactSelect from "react-select";

export default function Checkout(props) {
  const currentCart = useSelector(getCart);
  const dispatch = useDispatch();
  const [orderConf, setOrderConf] = useState(false);
  const [bAddress, setBAddress] = useState(false);
  const [location, setLocation] = useState(false);
  const [billingForm, setBillingForm] = useState({
    name: "",
    address: "",
    city: "",
    state: "",
    zipcode: "",
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

  const handleLocationChange = (event) => {
    setLocation(event.target.value);
  };

  return (
    <div className="checkout-elements">
      {orderConf === false ? (
        <div className="checkoutAll">
          <Link
            to={props.token ? `/carts/${props.userId}` : `/carts/guest`}
            className="ReturnToCartText"
          >
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
                    name="zipcode"
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
                  <button
                    onClick={() => setBAddress(false)}
                    className="edit-ba-btn"
                  >
                    Edit Address
                  </button>
                </div>
              )}
            </div>
            <div className="pickup-box">
              <h4 className="billing-h4">SELECT PICK UP LOCATION:</h4>

              <select
                className="pickup-dropdown"
                name="gym"
                onChange={handleLocationChange}
                required
              >
                <option value="">Select Gym</option>
                <option value="Brooklyn Boulders Queensbridge">
                  Brooklyn Boulders Queensbridge
                </option>
                <option value="Bouldeing Project @ Gowanus">
                  Bouldering Project @ Gowanus
                </option>
                <option value="Central Rock Gym @ Manhattan">
                  Central Rock Gym @ Manhattan
                </option>
                <option value="GP-81 @ Bushwick">GP-81 @ Bushwick</option>
                <option value="Movement @ Long Island City">
                  Movement @ Long Island City
                </option>
                <option value="Movement @ Gowanus">Movement @ Gowanus</option>
                <option value="Movement @ Harlem">Movement @ Harlem</option>
                <option value="Vital @ Upper East Side">
                  Vital @ Upper East Side
                </option>
                <option value="Vital @ West Harlem">Vital @ West Harlem</option>
                <option value="Vital @ Williamsburg">
                  Vital @ Williamsburg
                </option>
              </select>
            </div>
          </div>

          <div className="checkout-cart-and-order-boxes">
            <div className="checkout-cart-box">
              {currentCart?.length ? (
                currentCart?.map((products) => {
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
                <h2 className="cart-empty">Your cart is empty.</h2>
              )}
            </div>
            <div className="checkout-order-box">
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
        <div>
          <div className="checkout-confirmation">
            <h2>Thank you for your purchase!</h2>
            <p>
              Please coordinate with seller for drop-off / pick-up day at&nbsp;
              {location}.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
