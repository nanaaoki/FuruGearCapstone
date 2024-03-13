import { React, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Upload(props) {
  const navigate = useNavigate();
  console.log(props)

  return (
    <div className="upload-elements">
      <div className="upload-form-box">
        <h2>Upload Item to Sell</h2>
        <form className="uploadform" >
          <label className="upload-label">Title</label>
          <input className="uploadInput" type="text" />

          <label className="upload-label">Price</label>
          <input className="uploadInput" type="number" />

          <label className="upload-label ">Description</label>
          <input className="uploadInput upload-desc" />

          <label className="upload-label">Category</label>
          <input className="uploadInput" type="text" />

          <label className="upload-label">Upload Image</label>
          <input className="uploadInput" type="file" />

          <button>Upload Item</button>
        </form>
      </div>
    </div>
  );
}
