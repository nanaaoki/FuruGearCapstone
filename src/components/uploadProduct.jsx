import { React, useState } from "react";

export default function Upload(props) {

  const [uploadConf, setUploadConf] = useState(false);
  const [uploadForm, setUploadForm] = useState({
    title: "",
    price: "",
    description: "",
    category: "",
    image: "",
  });
  const [uploadedImageUrl, setUploadedImageUrl] = useState();



  const handleUploadFormChange = (e) => {
    setUploadForm({
      ...uploadForm,
      [e.target.name]: e.target.value,
    });
  };

  async function handleClick(e) {
    e.preventDefault();
    setUploadConf(true);
  }

  const handleUploadedFile = (e) => {
    const file = e.target.files[0];
    const imageUrl = URL.createObjectURL(file);
    setUploadedImageUrl(imageUrl);
    setUploadForm((prev) => ({ ...prev, image: imageUrl }));
  };

  const handleCloseBtn = (e) => {
    setUploadForm({
      title: "",
      price: "",
      description: "",
      category: "",
      image: "",
    });
    setUploadConf(false);
  };


  return (
    <div className="upload-elements">
      {uploadConf === false ? (
        <div className="upload-form-box">
          <h2>Upload Item to Sell</h2>
          <form className="uploadform" onSubmit={handleClick}>
            <label className="upload-label">Title</label>
            <input
              type="text"
              name="title"
              value={uploadForm.title}
              onChange={handleUploadFormChange}
              className="uploadInput"
              required
            />

            <label className="upload-label">Price</label>
            <input
              type="number"
              name="price"
              value={uploadForm.price}
              onChange={handleUploadFormChange}
              className="uploadInput"
              placeholder=""
              required
            />

            <label className="upload-label">Description</label>
            <textarea
              type="text"
              rows="2"
              name="description"
              value={uploadForm.description}
              onChange={handleUploadFormChange}
              className="uploadInput upload-desc"
              required
            />

            <label className="upload-label">Category</label>
            <input
              type="text"
              name="category"
              value={uploadForm.category}
              onChange={handleUploadFormChange}
              className="uploadInput"
              required
            />

            <label className="upload-label">Upload Image</label>
            <input
              type="file"
              accept="image/png, image/jpeg, image/avif"
              name="image"
              onChange={handleUploadedFile}
              className="uploadInput"
            />

            <button>Upload Item</button>
          </form>
        </div>
      ) : (
        <div className="ul-prod-box">
          <h2 className="thank-you">Thank you for your submission!</h2>
          <div className="uploaded-photo-box">
            <img src={uploadForm.image} className="uploadedPhoto" />
          </div>
          <div className="uploaded-product-text">
            <p className="uploadedTitle">{uploadForm.title}</p>
            <p className="uploadedPrice">${uploadForm.price}</p>
            <p className="uploadedDescription">{uploadForm.description}</p>
            <button onClick={handleCloseBtn}>CLOSE</button>
          </div>
        </div>
      )}
    </div>
  );
}
