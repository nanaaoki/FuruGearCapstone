import { useState, useEffect } from "react";
import { API_URL } from "./Products";
import {
  Link,
  useParams,
  useNavigate,
  useNavigationType,
} from "react-router-dom";
import { useAddToCartMutation } from "../redux/api";

export default function SingleProduct({ token }) {
  const navigate = useNavigate();
  const [product, setProduct] = useState({});
  const [cart, setCart] = useState({});
  const { id } = useParams();
  const [errorMsg, setError] = useState(null);
  const [addToCart] = useAddToCartMutation();

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

  async function handleClick(event) {
    event.preventDefault();
    const { data, error } = await addToCart({ product, token });
    if (error) {
      setError(error.data);
    } else {
      setCart({ ...cart, product });
      navigate(token ? `/carts/user/${id}` : "/carts/guest");
    }
  }

  return (
    <div>
      <Link to="/products">&#60;Continue Shopping</Link>

      <div className="">
        <div className="single-product">
          <img src={product.image} className="productPhoto" />
        </div>

        <div className="single-product2">
          <h2>Title: {product.title}</h2>
          <h3>Price: ${product?.price?.toFixed(2)}</h3>
          {token ? <button onClick={handleClick}>ADD TO BAG</button> : <></>}
          <h3>Description: {product.description}</h3>
        </div>
      </div>
    </div>
  );
}
