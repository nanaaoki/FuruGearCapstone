import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { API_URL } from "./Products";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useAddToCartMutation } from "../redux/api";
import { addToCart } from "../slice/cartSlice";
import { useAddToUserCartMutation } from "../redux/api";
import { useSingleProductQuery } from "../redux/api";
import { FaStar, FaRegStar, FaStarHalfStroke } from "react-icons/fa6";

export default function SingleProduct({ token }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [product, setProduct] = useState({});
  const [localCart, setLocalCart] = useState({});
  const { id } = useParams();
  const [errorMsg, setError] = useState(null);
  // const [addToCart] = useAddToCartMutation();

  const { data, error, isLoading } = useSingleProductQuery({});

  useEffect(() => {
    fetchSingleProduct();
  }, []);

  async function fetchSingleProduct() {
    try {
      const response = await fetch(`${API_URL}/products/${id}`);
      const json = await response.json();
      setProduct(json);
    } catch (err) {
      console.log("couldn't fetch that product");
    }
  }

  // useEffect(() => {
  //   const data = localStorage.getItem("ADD_TO_CART");
  //   if (data !== null) setLocalCart(JSON.parse(data));
  // }, []);

  // useEffect(() => {
  //   localStorage.setItem("ADD_TO_CART", JSON.stringify(localCart));
  // }, [localCart]);

  const reviewStars = (rate) => {
    const stars = [];
    for (let i = 0; i < Math.floor(rate); i++) {
      stars.push(
        <i className="review-star">
          <FaStar size={20} />
        </i>
      );
    }
    if (rate - Math.floor(rate) > 0.75) {
      stars.push(
        <i className="review-star">
          <FaStar size={20} />
        </i>
      );
    }
    if (rate - Math.floor(rate) > 0.25 && rate - Math.floor(rate) < 0.75) {
      stars.push(
        <i className="review-star">
          <FaStarHalfStroke size={20} />
        </i>
      );
    }
    if (rate - Math.floor(rate) < 0.25 && rate - Math.floor(rate) > 0) {
      stars.push(
        <i className="fas fa-star">
          <FaRegStar size={20} />
        </i>
      );
    }
    const remainder = 5 - Math.ceil(rate);
    for (let i = 0; i < remainder; i++) {
      stars.push(
        <i className="fas fa-star">
          <FaRegStar size={20} />
        </i>
      );
    }
    return <div>{stars}</div>;
  };

  async function handleClick(event) {
    event.preventDefault();
    
    dispatch(addToCart(product)); //dispatch calls the "addToCart" action (defined in cartSlice)

    navigate(token ? `/carts/${id}` : "/carts/guest");

  }

  //user logs in, fetch cart info. when you fetch cart info, console log.
  //Console log local storage then.

  // function to push productId into localCart


  return (
    <div className="sProduct-elements">
      <Link to="/products" className="">
        &#60; Continue Shopping
      </Link>
      <div className="photo-and-info-boxes">
        <div className="sProduct-photo-box">
          <img src={product.image} className="productPhoto" />
        </div>
        <div className="sProduct-info-box">
          <h2>{product.title}</h2>
          <div className="review">
            {reviewStars(product?.rating?.rate)}
            <div className="review-text">
              {product?.rating?.rate} ({product?.rating?.count} reviews)
            </div>
          </div>

          <h3 className="sProduct-price">${product?.price?.toFixed(2)}</h3>
          <button onClick={handleClick}>ADD TO BAG</button>
          <h3 className="sProduct-desc">{product.description}</h3>
        </div>
      </div>
    </div>
  );
}
