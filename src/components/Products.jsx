/* TODO - add your code to create a functional React component 
that displays all of the available products in the library's catalog. 
Fetch the product data from the provided API. 
Users should be able to click on an individual product to navigate to the 
SingleProduct component and view its details. */

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import FilterBar from "./FilterBar";
import { useProductListQuery } from "../redux/api";



export const API_URL = "https://fakestoreapi.com";

export default function Products() {
  const [filters, setFilters] = useState([]);
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const { data, error, isLoading } = useProductListQuery();




const filteredProducts =
filters.length === 0
? data 
: data?.filter((p) => filters.includes(p.category));


  return (
    <div>
      <h2>All Products</h2>

      <div className="filter-and-products-boxes">
        <div className="filter-box">
          <FilterBar setFilters={setFilters} filters={filters}/>
        </div>
        <div className="product-box">

          {filteredProducts?.length ? (
            filteredProducts?.map((product) => {
              return (
                // <div className="product-card-holder">
                <div key={product.id} className="productCards">
                  <img
                    src={product.image}
                    className="productPhotos"
                    onClick={() => navigate(`/products/${product.id}`)}
                    style={{ cursor: "pointer" }}
                  />

                  <p
                    className="productTitles"
                    onClick={() => navigate(`/products/${product.id}`)}
                    style={{ cursor: "pointer" }}
                  >
                    {product.title}
                  </p>

                  <p className="productPrices">${product.price.toFixed(2)}</p>
                </div>
                // </div>
              );
            })
          ) : (
            <h2>{isLoading ? "Loading..." : ""}</h2>
          )}
        </div>
      </div>
    </div>
  );
}