import { useSelector, useDispatch } from "react-redux";
import { getCart, removeFromCart } from "../slice/cartSlice";

import { Link, useNavigate } from "react-router-dom";
import { FaRegTrashAlt } from "react-icons/fa";
import { useUserCartQuery } from "../redux/api";


//props = userId, token
export default function Cart(props) {

  const currentCart = useSelector(getCart);

  const navigate = useNavigate();
  const dispatch = useDispatch();

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


  if (cartIsLoading) {
    return <p style={{ padding: "50px 100px" }}>Loading...</p>;
  }

  //handle removing item from cart
  const handleDelete = async (productId) => {
 
    dispatch(removeFromCart(productId));
  };

  //handle checkout button
  const handleClick = () => {
    navigate("/users/checkout");
  };



  const cartSum = currentCart.reduce((accum, currentValue) => {
    return accum + currentValue.price;
  }, 0);



  return (
    <div className="all-cart-elements">
      <Link to="/products" className="ContinueShopText">&#60;Continue Shopping</Link>
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
            <h2 className="cart-empty">{cartIsLoading ? "Loading..." : "Your cart is empty."}</h2>
          )}
        </div>

        <div className="order-box">
          <h4>ORDER SUMMARY</h4>
          <div className="order-summary">
            <p>Cart Total </p>
            <p>${cartSum.toFixed(2)}</p>
          </div>
          <button onClick={handleClick}>
            CHECK OUT
          </button>
        </div>
      </div>
    </div>
  );
}
