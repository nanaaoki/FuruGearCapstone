import { useSelector, useDispatch } from "react-redux";
import { getCart, removeFromCart } from "../slice/cartSlice";
import { Link, useNavigate } from "react-router-dom";
import { FaRegTrashAlt } from "react-icons/fa";

//props = userId, token
export default function Cart(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const currentCart = useSelector(getCart);

  // const localStorageUserId = JSON.parse(localStorage.getItem("userId"));
  // const localStorageToken = JSON.parse(localStorage.getItem("token"));

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
      <div className="continue-shopping-container">
        <Link to="/products" className="ContinueShopText">
          &#60;Continue Shopping
        </Link>
      </div>
      <h2>Your Cart</h2>
      <div className="cart-and-order-boxes">
        <div className="cart-box">
          {currentCart?.length ? (
            currentCart?.map((product) => {
              return (
                <div className="cart-items" key={product.id}>
                  <img
                    src={product.image}
                    width={"100px"}
                    onClick={() => navigate(`/products/${product.id}`)}
                    style={{ cursor: "pointer" }}
                  />
                  <div className="cart-info">
                    <p>{product.title}</p>
                    <p>${product.price.toFixed(2)}</p>
                  </div>
                  <FaRegTrashAlt
                    className="trash-icon"
                    role="button"
                    tabIndex="0"
                    cursor="pointer"
                    onClick={() => handleDelete(product.id)}
                  />
                </div>
              );
            })
          ) : (
            <h2 className="cart-empty">Your cart is empty.</h2>
          )}
        </div>

        <div className="order-box">
          <h4>ORDER SUMMARY</h4>
          <div className="order-summary">
            <p>Cart Total </p>
            <p>${cartSum.toFixed(2)}</p>
          </div>
          {cartSum !== 0 ? (
            <button onClick={handleClick}>CHECK OUT</button>
          ) : (
            <button disabled>CHECK OUT</button>
          )}
        </div>
      </div>
    </div>
  );
}
