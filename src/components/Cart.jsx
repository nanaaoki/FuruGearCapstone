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

import useFetch from "react-fetch-hook";

//props = userId, token
export default function Cart(props) {
  // console.log("props", props); // returns token and userId
  const navigate = useNavigate();
  const [array, setArray] = useState([]);

  // let { id } = useParams();

  // const { data, error, isLoading } = useCartListQuery(props.token);
  const {
    data: cartData,
    error: cartError,
    isLoading: cartIsLoading,
  } = useUserCartQuery({ userId: props.userId, token: props.token });

  const {
    data: productData,
    error: productError,
    isLoading: productIsLoading,
  } = useProductListQuery();

  const idMatch = () => {
    console.log(productData);
    console.log(cartData);
    cartData?.map(({ products }) => {
      console.log(products);
      products.map(({productId}) => {
        const item = productData.find((product) => {
          console.log("product", product);
          console.log("product.id", product.id);
          console.log("productId", productId);
          console.log(
            "product.id === .productId",
            product.id === productId
          );
          return product.id === productId;
        });
        console.log("item", item);
        setArray([...array, item]);
      });
    });
    
  };
  
  useEffect(() => {
    idMatch();
  }, [productIsLoading, cartIsLoading]);
  
  if (cartIsLoading) {
    return <p>Loading...</p>;
  }
  if (cartError) {
    return <p> Could not load cart into...</p>;
  }
  
  const handleClick = () => {
    navigate("/users/checkout");
  };
  
  // console.log("cartData", cartData); //[]
  // console.log("cartdata.products", cartData.products); //[{}, {}]
  // // console.log("data.products[0]", cartData.products[0]); //{}
  // // console.log("data.products[0].productId", cartData.products[0].productId); //#
  // console.log("productData", productData); //[{}, {}]
  
  //local storage for guest user, stored in browser
  //store multiple carts via userId
  //clear only if user clears cart
  //replace assigned cart with new cart
  //key = cart, value = array of products
  //windows.set local storage and windows.get local storage
  //create cart from data from local storage

  console.log("array", array);
  
  return (
    <div>
      <Link to="/products">&#60;Continue Shopping</Link>
      <div>
        <div className="cart-box">
          This side for items
          <div className="cart-item">
            {cartData?.length ? (
              cartData?.map(({ products }) => {
                return products.map((cartItem) => (
                  <>
                    <p>Product ID: {cartItem.productId}</p>
                    <p>image here</p>
                    {/* <p>{cartItem.productId === cartData.product.id ? {product.image} : ""}</p> */}
                    <p>Quantity: {cartItem.quantity}</p>
                    <FaTrashAlt role="button" tabIndex="0" />
                  </>
                ));
              })
            ) : (
              <h2>{cartIsLoading ? "Loading..." : ""}</h2>
            )}
            {/* // <div>product 1:{data.products[0].productId}</div>
            // <div>product 1:{data.products[0].productId}</div>
            // <div>product 1:{data.products[0].productId}</div> */}
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
