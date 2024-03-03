/* TODO - add your code to create a functional React component 
that renders a navigation bar for the different views 
in your single page application. 
You may consider conditionally rendering some options - 
for example 'Login' should be available if someone has not logged in yet. */

import { React, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAllCategoriesQuery } from "../redux/api";

import cartIcon from "../assets/cartIcon.png";

//filter by:
// categories
// price ($0-$25, $25-$50, $50-$100, $100+)
//When new filter added, button shows up

//sort by:
// Top Rated (high to low)
// Price (low to high, high to low)

export default function FilterBar({ setFilters, filters }) {
  const { data, error, isLoading } = useAllCategoriesQuery();

  //need function so that when a category is checked, it only shows that category
  //when another category is checked, that category also shows up

  function updateFilters(checked, filter) {
    if (checked) {
      // const duplicatedCategory = filters.filter((category) => category === filter);
      setFilters([...filters, filter]);
    }
    if (!checked) {
      const updatedFilter = filters.filter((category) => category !== filter);
      setFilters([...updatedFilter]);
    }
  }

  return (
    <div>
      <label className="category-checkbox">Category</label>
      {data?.length ? (
        data?.map((category, index) => {
          return (
            <div className="filter-type" key={index}>
              <input
                type="checkbox"
                name="category"
                className="checkbox"
                onChange={(e) => updateFilters(e.target.checked, category)}
              />
              <label className="checkbox-label">{category}</label>
            </div>
          );
        })
      ) : (
        <h2>{isLoading ? "Loading..." : ""}</h2>
      )}
      {/* <label>Prices</label>
      <div className="filter-type">
        <input type="checkbox" name="price" />
        $0-$25
        <input type="checkbox" name="price" />
        $25-$50
        <input type="checkbox" name="price" />
        $50-$100
        <input type="checkbox" name="price" />
        $100+
      </div> */}
    </div>
  );
}
