import React from "react";
import Navbar from "./Navbar";
import { FaTimes } from "react-icons/fa";

const CreatePost = () => {
  return (
    <div className="create-post-name">
      <Navbar />

      <div className="create-post-container">
        <header className="form-header">
          <h1>create new post</h1>
          <p>share your thoghts and Stories with the world</p>
        </header>

        <div className="post-form-card">
          <form>
            <div className="form-group">
              <label>post title</label>
              <div className="inpurt-wrapper">
                <FaHeading className="inpurt-icon" />
                <input
                  type="text"
                  name="title"
                  className="form-control"
                  placeholder="Enter a catchy title..."
                />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="">Auther Name</label>
              <div className="inpu-wrapper">
                <FaUser className="input-icon" />
                <input
                  type="text"
                  name="author"
                  className="form-control"
                  placeholder="your name"
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="">Description</label>
              <textarea
                name="description"
                className="form-control"
                placeholder="What on your mind? write your story here"
                id=""
              ></textarea>
            </div>

            <div className="form-group">
              <label htmlFor="">cover image</label>

              <div className="image-source-tabs">
                <button type="button" className="tab-btn active">
                  Image URL
                </button>

                <button type="button" className="tab-btn ">
                  uploade file
                </button>
              </div>

              <div className="input-wrapper">
                <FaLink className="inpurt-icon" />
                <input
                  type="url"
                  name="imageUrl"
                  className="form-control"
                  placeholder="paste image URl here()"
                />
              </div>

              <div className="image-upload-area">
                <FaCloudUploadAtl className="upload-icon" />
                <P>click to </P>
              </div>
              <div className="image-preview-container">
                <img src="" alt="preview" className="image-preview" />

                <button type="button" className="remove-image-btn">
                  <FaTimes />
                </button>
              </div>
            </div>

            <div className="form-action-row">
              <button type="submit" className="submit-btn">
                <FaRegpaperPlane /> Publish Post
              </button>

              <button type="button" className="cancel-btn">
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
