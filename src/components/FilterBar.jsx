import { React } from "react";

import { useAllCategoriesQuery } from "../redux/api";

export default function FilterBar({ setFilters, filters }) {
  const { data, error, isLoading } = useAllCategoriesQuery();

  if (error) {
    return <p>Could not access categories</p>;
  }

  //adding checked category into the array. Getting a list of checked categories
  function updateFilters(checked, filter) {
    if (checked) {
      setFilters([...filters, filter]);
    }
    if (!checked) {
      const updatedFilter = filters.filter((category) => category !== filter);
      setFilters([...updatedFilter]);
    }
  }

  return (
    <div className="Filter-bar">
      <label className="category-checkbox">Categories</label>
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
        <h2 style={{ padding: "50px 100px" }}>
          {isLoading ? "Loading..." : ""}
        </h2>
      )}
    </div>
  );
}
