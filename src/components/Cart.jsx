import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getCart, removeFromCart } from "../slice/cartSlice";

import { useParams, Link, useNavigate } from "react-router-dom";
import { FaRegTrashAlt } from "react-icons/fa";
import { useUserCartQuery, useProductListQuery } from "../redux/api";
import { current } from "@reduxjs/toolkit";

//props = userId, token
export default function Cart(props) {
  //useSelector() takes in fx that returns part of the state you want
  const currentCart = useSelector(getCart);
  const { userId, guest } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [array, setArray] = useState([]);
  const localStorageUserId = JSON.parse(localStorage.getItem("userId"));
  const localStorageToken = JSON.parse(localStorage.getItem("token"));

  const {
    data: cartData, //[{},{}]
    error: cartError,
    isLoading: cartIsLoading,
  } = useUserCartQuery({
    userId: props.userId || localStorageUserId,
    token: props.token || localStorageToken,
  });

  console.log("cart prop", props);

  // const {
  //   data: productData, //[{},{}]
  //   error: productError,
  //   isLoading: productIsLoading,
  // } = useProductListQuery();

  //function to get new array of products that match id
  // const idMatch = () => {
  //   const cart = [];
  //   cartData?.map(({ products }) => {
  //     products.map(({ productId }) => {
  //       const item = productData.find((product) => {
  //         return product.id === productId;
  //       });
  //       cart.push(item);
  //     });
  //   });
  //   const output = [];
  //   cart.map((p) => {
  //     const doesExist = output.find((op) => op === p);
  //     if (!doesExist) output.push(p);
  //   });
  //   setArray(output); //array of all the items in the cart.
  // };

  // useEffect(() => {
  //   idMatch();
  // }, [productIsLoading, cartIsLoading]);

  if (cartIsLoading) {
    return <p style={{ padding: "50px 100px" }}>Loading...</p>;
  }
  // if (cartError) {
  //   return (
  //     <p style={{ padding: "50px 100px" }}>
  //       Please log in to access your cart.
  //     </p>
  //   );
  // }

  //handle removing item from cart
  const handleDelete = async (productId) => {
    console.log("cart data", cartData);
    dispatch(removeFromCart(productId));
  };

  //handle checkout button
  const handleClick = () => {
    navigate("/users/checkout");
  };

  const btnDisabled = () => {
    return cartSum === 0;
  };

  const cartSum = currentCart.reduce((accum, currentValue) => {
    return accum + currentValue.price;
  }, 0);

  console.log("currentcart", currentCart);

  return (
    <div className="all-cart-elements">
      <Link to="/products">&#60;Continue Shopping</Link>
      <h2>Your Cart</h2>
      <div className="cart-and-order-boxes">
        <div className="cart-box">
          {currentCart?.length ? (
            currentCart?.map((products) => {
              return (
                <div className="cart-items" key={products.id}>
                  <img src={products.image} width={"100px"} />
                  <div className="cart-info">
                    <p>{products.title}</p>
                    <p>${products.price.toFixed(2)}</p>
                  </div>
                  <FaRegTrashAlt
                    className="trash-icon"
                    role="button"
                    tabIndex="0"
                    cursor="pointer"
                    onClick={() => handleDelete(products.id)}
                  />
                </div>
              );
            })
          ) : (
            <h2>{cartIsLoading ? "Loading..." : "Your cart is empty."}</h2>
          )}
        </div>

        <div className="order-box">
          <h4>ORDER SUMMARY</h4>
          <div className="order-summary">
            <p>Cart Total </p>
            <p>${cartSum.toFixed(2)}</p>
          </div>
          <button onClick={handleClick} disabled={btnDisabled}>
            CHECK OUT
          </button>
        </div>
      </div>
    </div>
  );
}
