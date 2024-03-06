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
  useProductListQuery,
} from "../redux/api";

//props = userId, token
export default function Cart(props) {
  const navigate = useNavigate();
  const [array, setArray] = useState([]);

  const {
    data: cartData, //[{},{}]
    error: cartError,
    isLoading: cartIsLoading,
  } = useUserCartQuery({ userId: props.userId, token: props.token });

  const {
    data: productData, //[{},{}]
    error: productError,
    isLoading: productIsLoading,
  } = useProductListQuery();

  //function to get new array of products that match id
  const idMatch = () => {
    const cart = [];
    cartData?.map(({ products }) => {
      products.map(({ productId }) => {
        const item = productData.find((product) => {
          return product.id === productId;
        });
        cart.push(item);
      });
    });
    const output = [];
    cart.map((p) => {
      const doesExist = output.find((op) => op === p);
      if (!doesExist) output.push(p);
    });
    setArray(output); //array of all the items in the cart.
  };

  useEffect(() => {
    idMatch();
  }, [productIsLoading, cartIsLoading]);

  if (cartIsLoading) {
    return <p>Loading...</p>;
  }
  if (cartError) {
    return <p> Please log in to access your cart.</p>;
  }

  const handleClick = () => {
    navigate("/users/checkout");
  };

  //local storage for guest user, stored in browser
  //store multiple carts via userId
  //clear only if user clears cart
  //replace assigned cart with new cart
  //key = cart, value = array of products
  //windows.set local storage and windows.get local storage
  //create cart from data from local storage

  console.log("array", array);

  const cartSum = array.reduce((accum, currentValue) => {
    return accum + currentValue.price;
  },0)
  console.log("cartsum", cartSum)
  

  return (
    <div>
      <Link to="/products">&#60;Continue Shopping</Link>
      <div>
        <div className="cart-box">
          This side for items
          {array?.length ? (
            array?.map((products) => {
              // console.log(products)

              return (
                <div className="cart-item">
                  <img src={products.image} width={"100px"} />
                  <p>${products.price.toFixed(2)}</p>
                  <FaTrashAlt role="button" tabIndex="0" />
                </div>
              );
            })
          ) : (
            <h2>{cartIsLoading ? "Loading..." : ""}</h2>
          )}
        </div>

        <div className="order-box">
          This side for order summary
          <p className="order-sum">
            Cart Total ${cartSum.toFixed(2)}
          </p>
          <button onClick={handleClick}>Check Out</button>
        </div>
      </div>
    </div>
  );
}
