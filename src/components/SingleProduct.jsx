import { useDispatch } from "react-redux";
import { Link, useParams, useNavigate } from "react-router-dom";
import { addToCart } from "../slice/cartSlice";
import { FaStar, FaRegStar, FaStarHalfStroke } from "react-icons/fa6";
import { useSingleProductQuery } from "../redux/api";

export default function SingleProduct(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const { data, isLoading } = useSingleProductQuery(id);

  if (isLoading) {
    return <p style={{ padding: "50px 100px" }}>Loading...</p>;
  }

  const reviewStars = (rate) => {
    const stars = [];
    for (let i = 0; i < Math.floor(rate); i++) {
      stars.push(
        <i className="review-star" key={i}>
          <FaStar size={20} />
        </i>
      );
    }
    if (rate - Math.floor(rate) > 0.75) {
      stars.push(
        <i className="review-star" key="fastar">
          <FaStar size={20} />
        </i>
      );
    }
    if (rate - Math.floor(rate) > 0.25 && rate - Math.floor(rate) < 0.75) {
      stars.push(
        <i className="review-star" key="fastarhalf">
          <FaStarHalfStroke size={20} />
        </i>
      );
    }
    if (rate - Math.floor(rate) < 0.25 && rate - Math.floor(rate) > 0) {
      stars.push(
        <i className="fas fa-star" key="fasstar">
          <FaRegStar size={20} />
        </i>
      );
    }
    const remainder = 5 - Math.ceil(rate);
    for (let i = 0; i < remainder; i++) {
      stars.push(
        <i className="fas fa-star" key={i+10}>
          <FaRegStar size={20} />
        </i>
      );
    }
    return <div>{stars}</div>;
  };

  //handle add to cart button
  async function handleClick(event) {
    event.preventDefault();
    dispatch(addToCart(data)); //dispatch calls the "addToCart" action (defined in cartSlice.js)
    navigate(props.token ? `/carts/${props.userId}` : "/carts/guest");
  }

  return (
    <div className="SProduct-All-Elements">
      <div className="sProduct-elements">
        <Link to="/products" className="ContinueShopText">
          &#60; Continue Shopping
        </Link>
        <div className="photo-and-info-boxes">
          <div className="sProduct-photo-box">
            <img src={data?.image} className="productPhoto" />
          </div>
          <div className="sProduct-info-box">
            <h2 className="sProduct-title">{data?.title}</h2>
            <div className="review">
              {reviewStars(data?.rating?.rate)}
              <div className="review-text">
                {data?.rating?.rate} ({data?.rating?.count} reviews)
              </div>
            </div>

            <h3 className="sProduct-price">${data?.price?.toFixed(2)}</h3>
            <button onClick={handleClick}>ADD TO BAG</button>
            <h3 className="sProduct-desc">{data?.description}</h3>
          </div>
        </div>
      </div>
    </div>
  );
}
