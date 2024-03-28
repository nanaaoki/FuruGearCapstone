import { React } from "react";

import { useAllCategoriesQuery } from "../redux/api";

export default function FilterBar({
  setFilters,
  filters,
  setPriceFilters,
  priceFilters,
}) {
  const { data, error, isLoading } = useAllCategoriesQuery();

  if (error) {
    return <p>Could not access categories</p>;
  }

  //adding checked category into the array. Getting a list of checked categories
  function updateFilters(checked, filter) {
    if (checked) {
      setFilters([...filters, filter]);
    }
    //if unchecked, filter through all the filters.
    //filter out all category not in the filter list,
    if (!checked) {
      const updatedFilter = filters.filter((category) => category !== filter);
      console.log("updatedfilter", updatedFilter);
      setFilters([...updatedFilter]);
    }
  }

  //function adding cheked price ranges into an array.
  //getting a list of checked prices
  function updatePriceFilters(checked, priceFilter) {
    //converting to number ("0-25" to ["0", "25"] to  [0, 25])
    let range = priceFilter.split("-").map((limit) => Number(limit));
    if (checked) {
      setPriceFilters([...priceFilters, range]);
    }
    if (!checked) {
      const updatedPriceFilter = priceFilters.filter((r) => {
        return range[0] !== r[0] && range[1] !== r[1];
      });
      setPriceFilters([...updatedPriceFilter]);
    }
  }

  return (
    <div className="Filter-bar">
      <label className="filter-checkbox">Categories</label>
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
        <h2 style={{ padding: "50px 100px" }}>{isLoading && "Loading..."}</h2>
      )}

      <label className="filter-checkbox">Price</label>
      <div className="filter-type">
        <input
          type="checkbox"
          name="price"
          className="checkbox"
          value="0-25"
          onChange={(e) => updatePriceFilters(e.target.checked, e.target.value)}
        />
        <label className="checkbox-label">$0-$25</label>
      </div>
      <div className="filter-type">
        <input
          type="checkbox"
          name="price"
          className="checkbox"
          value="25-50"
          onChange={(e) => updatePriceFilters(e.target.checked, e.target.value)}
        />
        <label className="checkbox-label">$25-$50</label>
      </div>
      <div className="filter-type">
        <input
          type="checkbox"
          name="price"
          className="checkbox"
          value="50-75"
          onChange={(e) => updatePriceFilters(e.target.checked, e.target.value)}
        />
        <label className="checkbox-label">$50-$75</label>
      </div>
      <div className="filter-type">
        <input
          type="checkbox"
          name="price"
          className="checkbox"
          value="75-100"
          onChange={(e) => updatePriceFilters(e.target.checked, e.target.value)}
        />
        <label className="checkbox-label">$75-$100</label>
      </div>
      <div className="filter-type">
        <input
          type="checkbox"
          name="price"
          className="checkbox"
          value="100-1000"
          onChange={(e) => updatePriceFilters(e.target.checked, e.target.value)}
        />
        <label className="checkbox-label">+$100</label>
      </div>
    </div>
  );
}
