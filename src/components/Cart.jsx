import { useState, useEffect } from "react";
import { API_URL } from "./Products";
import { useParams, Link, useNavigate } from "react-router-dom";
import { FaRegTrashAlt } from "react-icons/fa";
import {
  useCartListQuery,
  useUserCartQuery,
  useAddToCartMutation,
  useDeleteCartItemMutation,
  useAddToUserCartMutation,
  useDeleteUserCartItemMutation,
  useProductListQuery,
  useUpdateUserCartMutation,
} from "../redux/api";

//props = userId, token
export default function Cart(props) {
  const { userId, guest } = useParams();
  const navigate = useNavigate();
  const [array, setArray] = useState([]);
  const [deleteItem] = useDeleteCartItemMutation();
  const [updateCart] = useUpdateUserCartMutation();
  const [cartProduct, setCartProduct] = useState([]);

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
    return <p style={{ padding: "50px 100px" }}>Loading...</p>;
  }
  // if (cartError) {
  //   return (
  //     <p style={{ padding: "50px 100px" }}>
  //       Please log in to access your cart.
  //     </p>
  //   );
  // }

console.log("props", props)

  const handleDelete = async (productId) => {
    console.log("cart data", cartData);
    const { data: updatedItem } = await updateCart({
      userId: cartData[0].userId,
      productId,
      token: props.token,
    });
    console.log("updateitem", updatedItem);
  };

  const handleClick = () => {
    props.token ? navigate("/users/checkout") : navigate("/auth/login");
  };

  //local storage for guest user, stored in browser
  //store multiple carts via userId
  //clear only if user clears cart
  //replace assigned cart with new cart
  //key = cart, value = array of products
  //windows.set local storage and windows.get local storage
  //create cart from data from local storage

  const cartSum = array.reduce((accum, currentValue) => {
    return accum + currentValue.price;
  }, 0);

  return (
    <div className="all-cart-elements">
      {userId || guest ? <Link to="/products">&#60;Continue Shopping</Link> : null}
      {userId ? <h2>Your Cart</h2> : null}

      <div className="cart-and-order-boxes">
        <div className="cart-box">
          {array?.length ? (
            array?.map((products) => {
              // console.log(products)

              return (
                <div className="cart-items">
                  <img src={products.image} width={"100px"} />
                  <div className="cart-info">
                    <p>{products.title}</p>
                    <p>${products.price.toFixed(2)}</p>
                  </div>
                  <FaRegTrashAlt
                    className="trash-icon"
                    role="button"
                    tabIndex="0"
                    onClick={() => handleDelete(products.id)}
                  />
                </div>
              );
            })
          ) : (
            <h2>{cartIsLoading ? "Loading..." : ""}</h2>
          )}
        </div>

        <div className="order-box">
          <h4>ORDER SUMMARY</h4>
          <div className="order-summary">
            <p>Cart Total </p>
            <p>${cartSum.toFixed(2)}</p>
          </div>
          {userId ? (
            <button onClick={handleClick}>CHECK OUT</button>
          ) : (
            <button onClick={handleClick}>PLACE ORDER</button>
          )}
        </div>
      </div>
    </div>
  );
}
