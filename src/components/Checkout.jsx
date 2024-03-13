// Cart

import { React, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useUserCartQuery } from "../redux/api";
import Cart from "./Cart";

export default function Checkout(props) {
  const [bAddress, setBAddress] = useState(false);
  const [billingForm, setBillingForm] = useState({
    name: "Elon Musk",
    address: "666 Space World",
    city: "Mars",
    state: "CA",
    zipcode: "01010",
  });
  console.log("props", props);
  console.log(props.token);

  const handleBillingFormChange = (e) =>
    setBillingForm({ ...billingForm, [e.target.name]: e.target.value });

  if (!props.token) {
    return (
      <p style={{ padding: "50px 100px" }}>
        Please log in to check out cart items.
      </p>
    );
  }

  return (
    <div className="checkoutAll">
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
              <button onClick={() => setBAddress(true)}>Save Address</button>
            </form>
          ) : (
            <div className="billing-address">
              <p className="billing-info">{billingForm.name}</p>
              <p className="billing-info">{billingForm.address}</p>
              <p className="billing-info">{billingForm.city}</p>
              <p className="billing-info">{billingForm.state}</p>
              <p className="billing-info">{billingForm.zipcode}</p>
              <button onClick={() => setBAddress(false)}>Edit Address</button>
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

      <div>
        <Cart token={props.token} userId={props.userId} />
      </div>
    </div>
  );
}
