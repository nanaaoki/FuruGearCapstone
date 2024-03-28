import { useState } from "react";
import { useNavigate } from "react-router-dom";
import FilterBar from "./FilterBar";
import { useProductListQuery } from "../redux/api";

export const API_URL = "https://fakestoreapi.com";

export default function Products(props) {
  const { data, isLoading } = useProductListQuery();
  const navigate = useNavigate();
  const [filters, setFilters] = useState([]);
  const [priceFilters, setPriceFilters] = useState([]);
  const [sortType, setSortType] = useState("none");

  let priceFilteredProducts = [];

  //creating a new array of filtered products
  let filteredProducts = [];
  if (data) {
    filteredProducts =
      filters.length === 0
        ? data
        : data?.filter((p) => filters.includes(p.category));

    priceFilteredProducts =
      priceFilters.length === 0
        ? filteredProducts
        : filteredProducts?.filter(
            (p) =>
            // !! = returns True or False. 
            //if True, returns the product and adds to filteredProducts
            //without !!, would return the range (ex. [0-25])
              !!priceFilters.find((range) => {
                return (p.price - range[0]) * (p.price - range[1]) <= 0;
              })
          );
  }

  const sortedItems = [...priceFilteredProducts]?.sort((a, b) => {
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

  //filtering through all products and converting both data and search input to lowercase.
  const searchResults = data?.filter((el) => {
    if (props.searchInput === "") {
      return el;
    } else {
      return el?.title.toLowerCase().includes(props.searchInput.toLowerCase());
    }
  });

  return (
    <div className="Products-All-Elements">
      <div className="shopAll">
        <h2>Shop All Products</h2>

        <div className="filter-and-products-boxes">
          <div className="filter-box">
            <FilterBar
              setFilters={setFilters}
              filters={filters}
              setPriceFilters={setPriceFilters}
              priceFilters={priceFilters}
            />
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
                {/* If anything is in the search, show results. Otherwise, if anything is in sortedItems, show results */}
                {props.searchInput ? (
                  searchResults?.map((result) => {
                    return (
                      <div
                        key={result.id}
                        className="productCards"
                        onClick={() => navigate(`/products/${result.id}`)}
                        style={{ cursor: "pointer" }}
                      >
                        <img src={result.image} className="productPhotos" />
                        <div className="product-text">
                          <p className="productTitles">{result.title}</p>
                          <p className="productPrices">
                            ${result.price.toFixed(2)}
                          </p>
                        </div>
                      </div>
                    );
                  })
                ) : sortedItems?.length ? (
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
