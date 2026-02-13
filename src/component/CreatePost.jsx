import React, { useState } from "react";
import Navbar from "./Navbar";
import "./CreatePost.css";
import { useNavigate } from "react-router-dom";

import {
  FaCloudUploadAlt,
  FaHeading,
  FaLink,
  FaRegPaperPlane,
  FaTimes,
  FaUser,
} from "react-icons/fa";

const CreatePost = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    author: "",
    description: "",
    imageUrl: "",
  });

  const [imageTab, setImageTab] = useState("url");
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);

  // INPUT CHANGE
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // IMAGE URL
  const handleImageUrlChange = (e) => {
    const url = e.target.value;
    setFormData({ ...formData, imageUrl: url });
    if (url) setImagePreview(url);
  };

  // IMAGE UPLOAD
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setFormData({ ...formData, imageUrl: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  // REMOVE IMAGE
  const removeImage = () => {
    setImagePreview(null);
    setFormData({ ...formData, imageUrl: "" });
  };

  // SUBMIT FORM (ONLY CONSOLE)
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    const authData = JSON.parse(localStorage.getItem("authData") || "{}");
    const authorName = authData?.username || formData.author || "Anonymous";

    const newPost = {
      title: formData.title,
      author: authorName,
      description: formData.description,
      image: formData.imageUrl || "https://via.placeholder.com/600x400",
      createdAt: new Date().toISOString(),
    };

    // ✅ CONSOLE OUTPUT
    console.log("POST DATA 👉", newPost);

    alert("Post data printed in console");

    setLoading(false);
    navigate("/dashboard");
  };

  // CLEAR FORM
  const handleClearForm = () => {
    setFormData({
      title: "",
      author: "",
      description: "",
      imageUrl: "",
    });
    setImagePreview(null);
  };

  return (
    <div className="create-post-page">
      <Navbar
        onLogout={() => {
          localStorage.removeItem("authData");
          navigate("/login");
        }}
      />

      <div className="create-post-container">
        <header className="form-header">
          <h1>Create New Post</h1>
          <p>Share your thoughts and stories with the world</p>
        </header>

        <div className="post-form-card">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Post Title</label>
              <div className="input-wrapper">
                <FaHeading className="input-icon" />
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="Enter a catchy title..."
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label>Author Name</label>
              <div className="input-wrapper">
                <FaUser className="input-icon" />
                <input
                  type="text"
                  name="author"
                  value={formData.author}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="Your name"
                />
              </div>
            </div>

            <div className="form-group">
              <label>Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="form-control"
                placeholder="What's on your mind? Write your story here."
                required
              ></textarea>
            </div>

            <div className="form-group">
              <label>Cover Image</label>

              <div className="image-source-tabs">
                <button
                  type="button"
                  className={imageTab === "url" ? "tab-btn-active" : "tab-btn"}
                  onClick={() => setImageTab("url")}
                >
                  Image URL
                </button>
                <button
                  type="button"
                  className={
                    imageTab === "upload" ? "tab-btn-active" : "tab-btn"
                  }
                  onClick={() => setImageTab("upload")}
                >
                  Upload File
                </button>
              </div>

              {imageTab === "url" && (
                <div className="input-wrapper">
                  <FaLink className="input-icon" />
                  <input
                    type="url"
                    name="imageUrl"
                    value={formData.imageUrl}
                    onChange={handleImageUrlChange}
                    className="form-control"
                    placeholder="Paste image URL here."
                  />
                </div>
              )}

              {imageTab === "upload" && (
                <div
                  className="image-upload-area"
                  onClick={() =>
                    document.getElementById("imageUpload").click()
                  }
                >
                  <FaCloudUploadAlt className="upload-icon" />
                  <p>Click to upload image from your device</p>
                  <input
                    id="imageUpload"
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    style={{ display: "none" }}
                  />
                </div>
              )}

              {imagePreview && (
                <div className="image-preview-container">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="image-preview"
                  />
                  <button
                    type="button"
                    className="remove-image-btn"
                    onClick={removeImage}
                  >
                    <FaTimes />
                  </button>
                </div>
              )}
            </div>

            <div className="form-actions-row">
              <button type="submit" className="submit-btn" disabled={loading}>
                <FaRegPaperPlane />{" "}
                {loading ? "Publishing..." : "Publish Post"}
              </button>
              <button
                type="button"
                className="cancel-btn"
                onClick={handleClearForm}
              >
                Clear Form
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
