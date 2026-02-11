import React from "react";
import Navbar from "../component/Navbar";
import { FaPlus } from "react-icons/fa";
import { MdEdit,MdDelete } from "react-icons/md";

const Dashboard = () => {
  return (
    <div className="dashboard-page">
      <Navbar />

      <main className="dashboard-main">
        <div className="dashboard-welcome">
          <div className="welcome-text">
            <h1>Welcomne to your dashboard</h1>
            <p>manage your posts , track engagement , and connect will</p>
          </div>
        </div>
        <div className="dashboard-stats-overview">
          <div className="dash-card">
            <h3>total posts</h3>
            <span className="dash-number">10</span>
          </div>
          <div className="dash-card">
            <h3>your stories</h3>
            <span className="dash-number">5</span>
          </div>
          <div className="dash-card">
            <h3>community posts</h3>
            <span className="dsh-number">10</span>
          </div>
        </div>

        <section className="posts-section">
          <div className="section-header">
            <h2 className="section-title">recent feed</h2>
            <button className="create-shortcut-btn">
              <FaPlus />
              New Post
            </button>
          </div>

          <div className="posts-grid">
            <div className="post-card">
              <div className="post-image-container">
                <img src="" alt="" className="post-card-image" />

                <div className="post-action">
                  <button className="action-btn edt-btn" title="edit post">
                    <MdEdit size={22} color="#ffffff" />
                  </button>

                  <button className="action-btn delete-btn" title="delete post">
                    <MdEdit size={22} color="#ffffff" />
                  </button>
                </div>
              </div>

              <div className="post-card-content">
                <div className="post-meta">
                  <span className="post-author">By Admin</span>
                  <span className="post-date">Recent</span>
                </div>
                <h3 className="post-card-title">Sample Post title</h3>
                <p className="post-card-description">
                  this is a sample static description to maintain the UI design
                  without
                </p>

                <button className="read-more-btn">Read more</button>
              </div>
            </div>

            <div className="post-card">
              <div className="post-image-container">
                <img src="" alt="" className="post-card-image" />
                <div className="post-action">
                  <button className="action-btn edit-btn">
                    <MdEdit size={22} color="#fffff" />
                  </button>

                  <button className="action-btn delete-btn">
                    <MdDelete size={22} color="#fffff" />
                  </button>
                </div>
              </div>

              <div className="post-card-content">
                <div className="post-meta">
                  <span className="post-author">By User</span>
                  <span className="post-date">Recent</span>
                </div>
                <h3 className="post-card-title">Another static post</h3>
                <p className="post-card-description">
                  Static content to keep the dashboard layout and style
                </p>

                <button className="read-more-btn">Read more</button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;

