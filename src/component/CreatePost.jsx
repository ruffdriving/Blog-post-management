import React, { useState, useEffect, useRef } from "react";
import Navbar from "./Navbar";
import "./CreatePost.css";
import { useNavigate, useParams } from "react-router-dom";

import { FaCloudUploadAlt, FaHeading, FaLink, FaRegPaperPlane, FaTimes, FaUser } from "react-icons/fa";

const CreatePost = ({ authData, name }) => {
  const navigate = useNavigate();
  const { id } = useParams(); 

  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false); 
  const [imagePreview, setImagePreview] = useState(null); 
  const fileInput = useRef(null);

  //  state
  const [postData, setPostData] = useState({
    title: "",
    author: authData ? name : "",
    description: "",
    imageUrl: "",
    imageType: "url", 
  });


  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPostData((prev) => ({ ...prev, [name]: value }));
  };



  const changeImageType = (type) => {
    setPostData((prev) => ({ ...prev, imageType: type }));
    setImagePreview(type === "url" ? postData.imageUrl : null);
  };


  const handleImageUrl = (e) => {
    const url = e.target.value;
    setPostData((prev) => ({ ...prev, imageUrl: url }));
    setImagePreview(url);
  };

 

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => setImagePreview(reader.result);
    reader.readAsDataURL(file);
  };



  const removeImage = () => {
    setImagePreview(null);
    if (postData.imageType === "url") setPostData((prev) => ({ ...prev, imageUrl: "" }));
    if (fileInput.current) fileInput.current.value = "";
  };



  const clearForm = () => {
    setPostData({
      title: "",
      author: authData ? name : "",
      description: "",
      imageUrl: "",
      imageType: "url",
    });
    setImagePreview(null);
  };

useEffect(() => {

  if (!id) {
    setIsEditing(false);
    return;
  }

  setIsEditing(true);

  const fetchPost = async () => {
    try {
      const res = await fetch(`http://localhost:5000/posts/${id}`);
      if (!res.ok) throw new Error("Failed to fetch post");

      const post = await res.json();

      setPostData({
        title: post.title || "",
        author: post.author || "",
        description: post.description || "",
        imageUrl: post.image || "",
        imageType: "url",
      });

      setImagePreview(post.image || null);
    } catch (err) {
      console.log("Error fetching post:", err);
    }
  };

  fetchPost();
}, [id]);


  // ---------------------------
  // Form submit (create ya update)
  // ---------------------------
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

const dataToSend = {
  title: postData.title,
  author: postData.author,
  description: postData.description,
  image: imagePreview || postData.imageUrl,
  createdAt: new Date().toLocaleDateString()
};

    try {
      const url = isEditing ? `http://localhost:5000/posts/${id}` : "http://localhost:5000/posts";
      const method = isEditing ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataToSend),
      });

      if (!res.ok) throw new Error("Failed to save post");

      alert(isEditing ? "Post updated!" : "Post published!");
      navigate("/dashboard"); // Dashboard pe wapas le jao
    } catch (err) {
      console.log("Error saving post:", err);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
    <Navbar/>
    <div className="create-post-container">
      <header className="form-header">
        <h1>{isEditing ? "Edit Post" : "Create New Post"}</h1>
        <p>Share your thoughts and stories with the world</p>
      </header>

      <div className="post-form-card">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Title</label>
            <div className="input-wrapper">
              <FaHeading />
              <input type="text" name="title" value={postData.title} onChange={handleInputChange} placeholder="Enter title" required />
            </div>
          </div>

          <div className="form-group">
            <label>Author</label>
            <div className="input-wrapper">
              <FaUser />
              <input type="text" name="author" value={postData.author} onChange={handleInputChange} placeholder="Your name" />
            </div>
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea name="description" value={postData.description} onChange={handleInputChange} placeholder="Write something..." required></textarea>
          </div>

          <div className="form-group">
            <label>Cover Image</label>
            {!imagePreview ? (
              <>
                <div className="image-source-tabs">
                  <button type="button" onClick={() => changeImageType("url")} className={postData.imageType === "url" ? "active" : ""}>
                    URL
                  </button>
                  <button type="button" onClick={() => changeImageType("file")} className={postData.imageType === "file" ? "active" : ""}>
                    Upload
                  </button>
                </div>

                {postData.imageType === "url" ? (
                  <div className="input-wrapper">
                    <FaLink />
                    <input type="url" value={postData.imageUrl} onChange={handleImageUrl} placeholder="Paste image URL" />
                  </div>
                ) : (
                  <div className="image-upload-area" onClick={() => fileInput.current.click()}>
                    <FaCloudUploadAlt />
                    <p>Click to upload</p>
                    <input type="file" ref={fileInput} accept="image/*" onChange={handleFileUpload} style={{ display: "none" }} />
                  </div>
                )}
              </>
            ) : (
              <div className="image-preview-container">
                <img src={imagePreview} alt="Preview" />
                <button type="button" onClick={removeImage}>
                  <FaTimes />
                </button>
              </div>
            )}
          </div>

          {/* Buttons */}
          <div className="form-actions-row">
            <button type="submit" disabled={loading}>
              <FaRegPaperPlane /> {loading ? (isEditing ? "Updating..." : "Publishing...") : isEditing ? "Update Post" : "Publish Post"}
            </button>
            <button type="button" onClick={clearForm}>
              Clear
            </button>
          </div>
        </form>
      </div>
    </div>
    </>
  );
};

export default CreatePost;
