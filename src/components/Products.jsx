import { useState } from "react";
import { useNavigate } from "react-router-dom";
import FilterBar from "./FilterBar";
import { useProductListQuery } from "../redux/api";

export const API_URL = "https://fakestoreapi.com";

export default function Products() {
  const { data, isLoading } = useProductListQuery();
  const navigate = useNavigate();

  const [filters, setFilters] = useState([]);
  const [sortType, setSortType] = useState("none");

  let filteredProducts = [];

  if (data) {
    filteredProducts =
      filters.length === 0
        ? data
        : data?.filter((p) => filters.includes(p.category));
  }


  const sortedItems = [...filteredProducts]?.sort((a, b) => {
    if (sortType === "none") {
      return;
    } else if (sortType === "lowtohigh") {
      return a.price - b.price;
    } else if (sortType === "hightolow") {
      return b.price - a.price;
    } else if (sortType === "ratinghightolow") {
      return b.rating.rate - a.rating.rate;
    }
  });

  return (
    <div className="Products-All-Elements">
      <div className="shopAll">
        <h2>Shop All Products</h2>

        <div className="filter-and-products-boxes">
          <div className="filter-box">
            <FilterBar setFilters={setFilters} filters={filters} />
          </div>
          <div className="sort-and-products-box">
            <div className="sort-box">
              <select onChange={(e) => setSortType(e.target.value)}>
                <option value="none">Sort By</option>
                <option value="lowtohigh">Price: Low to High</option>
                <option value="hightolow">Price: High to Low</option>
                <option value="ratinghightolow">Top Seller</option>
              </select>
            </div>
            <div className="product-box-element">
              <div className="product-box">
                {sortedItems?.length ? (
                  sortedItems?.map((product) => {
                    return (
                      //productCarts
                      <div
                        key={product.id}
                        className="productCards"
                        onClick={() => navigate(`/products/${product.id}`)}
                        style={{ cursor: "pointer" }}
                      >
                        <img src={product.image} className="productPhotos" />
                        <div className="product-text">
                          <p className="productTitles">{product.title}</p>
                          <p className="productPrices">
                            ${product.price.toFixed(2)}
                          </p>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <h2 className="isLoading-error-msg">
                    {isLoading ? "Loading..." : ""}
                  </h2>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
