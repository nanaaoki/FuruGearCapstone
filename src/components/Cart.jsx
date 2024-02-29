import { useState, useEffect } from "react";
import { API_URL } from "./Products";
import { useParams, Link, useNavigate } from "react-router-dom";
import { FaTrashAlt } from "react-icons/fa";
import {
  useCartListQuery,
  useUserCartQuery,
  useAddToCartMutation,
  useDeleteCartItemMutation,
  useAddToUserCartMutation,
  useDeleteUserCartItemMutation,
} from "../redux/api";

export default function Cart(props) {
  const navigate = useNavigate();
  let { id } = useParams();

  // const { data, error, isLoading } = useCartListQuery(props.token);
  const { data, error, isLoading } = useUserCartQuery(id, props.token);
  // const { data, error, isLoading } = useAddToCartMutation(props.token);
  // const { data, error, isLoading } = useDeleteCartItemMutation(props.token);
  // const { data, error, isLoading } = useAddToUserCartMutation(props.token);
  // const { data, error, isLoading } = useDeleteUserCartItemMutation(props.token);

  const handleClick = () => {
    navigate("/users/checkout");
  };

  //  useEffect(() => {
  //   fetchUserCart()
  //  }, []);

  //   async function fetchUserCart() {
  //     try {
  //       const response = await fetch(`${API_URL}/carts/${id}`);
  //       const json = await response.json();
  //       setUserCart(json);
  //     } catch(err) {
  //       console.log("error")
  //     }
  //   }

  //local storage for guest user, stored in browser
  //store multiple carts via userId
  //clear only if user clears cart
  //replace assigned cart with new cart
  //key = cart, value = array of products
  //windows.set local storage and windows.get local storage
  //create cart from data from local storage

  return (
    <div>
      <Link to="/products">&#60;Continue Shopping</Link>
      <div>
        <div className="cart-box">
          This side for items
          <div className="cart-item">
            <FaTrashAlt role="button" tabIndex="0" />
          </div>
        </div>
        <div className="order-box">
          This side for order summary
          <button onClick={handleClick}>Check Out</button>
        </div>
      </div>
    </div>
  );
}
