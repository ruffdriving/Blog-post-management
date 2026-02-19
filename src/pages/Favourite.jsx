import React from "react";
import Navbar from "../component/Navbar";
import { MdOpenInNew, MdDeleteSweep } from "react-icons/md";
import "./Favourite.css";
import { FaRegStar } from "react-icons/fa";


const Favourite = () => {
  return (
    <div className="favourite-page-container">
      <Navbar />
      <main className="favourites-main">
        <div className="favourite-hero">
          <div className="hero-content">
            <h1>Your Reading List</h1>
            <p>Enjoy the collection of dtories you've curated.</p>
          </div>
        </div>
        <div className="favourites-content">
          <div className="favourite-header">
            <h2>
              Curated Collection
              <span className="count-badge">3</span>
            </h2>
            <button className="clear-all-btn">
              <MdDeleteSweep size={20} />
              Clear List
            </button>
          </div>

          <div className="fav-empty-wrapper">
            <div className="empty-icon-wrapper">
              <FaRegStar className="empty-icon" />
            </div>
            <h3>Your List Is empty</h3>
            <p>Discover interesting posts and save them to read later </p>
            <button className="browser-btn">Explore Stories</button>
          </div>

          <div className="favourite-grid">
            <div className="fav-card">
              <div className="fav-card-image">
                <img
                  src="data:image/webp;base64,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"
                  alt=""
                />
                <div className="fav-card-overlay">
                  <button className="read-btn">
                    <MdOpenInNew /> Read Article
                  </button>
                </div>
              </div>
              <div className="fav-card-body">
                <div className="fav-meta">
                  <span className="fav-author">Author name </span>
                  <span className="fav-date">Recent </span>
                </div>
                <h3 className="fav-title">Sample post title </h3>
                <p className="fav-excerpt">
                  this is a sample description of the post used only{" "}
                </p>

                <button className="remove-fav-btn">Remove</button>
              </div>
            </div>

            
          </div>
        </div>
      </main>
    </div>
  );
};

export default Favourite;
