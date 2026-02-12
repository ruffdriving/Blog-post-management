import React, { useEffect, useState } from "react";
import Navbar from "../component/Navbar";
import { FaPlus } from "react-icons/fa";
import { MdEdit, MdDelete } from "react-icons/md";
import "./Dashboard.css";

const Dashboard = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState();  // Loading state
  const [error, setError] = useState();      // Error state

  // Async function to fetch posts
  const fetchPosts = async () => {
    try {
      setLoading(true);
      const response = await fetch("http://localhost:5000/posts");

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setPosts(data);
    } catch (err) {
      setError(err.message);
      console.log("Error fetching posts:", err);
    } finally {
      setLoading(false);
    }
  };

  // Call fetchPosts on component mount
  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="dashboard-page">
      <Navbar />

      <main className="dashboard-main">

        {/* Welcome */}
        <div className="dashboard-welcome">
          <div className="welcome-text">
            <h1>Welcome to your dashboard</h1>
            <p>Manage your posts, track engagement, and connect well</p>
          </div>
        </div>

        {/* Stats */}
        <div className="dashboard-stats-overview">
          <div className="dash-card">
            <h3>Total Posts</h3>
            <span className="dash-number">{posts.length}</span>
          </div>
          <div className="dash-card">
            <h3>Your Stories</h3>
            <span className="dash-number">{posts.length}</span>
          </div>
          <div className="dash-card">
            <h3>Community Posts</h3>
            <span className="dash-number">{posts.length}</span>
          </div>
        </div>

        {/* Posts Section */}
        <section className="posts-section">
          <div className="section-header">
            <h2 className="section-title">Recent Feed</h2>
            <button className="create-shortcut-btn">
              <FaPlus /> New Post
            </button>
          </div>

          {loading ? (
            <p>Loading posts...</p>
          ) : error ? (
            <p style={{ color: "red" }}>Error: {error}</p>
          ) : (
            <div className="posts-grid">
              {posts.length === 0 ? (
                <p>No posts found.</p>
              ) : (
                posts.map((post) => (
                  <div className="post-card" key={post.id}>

                    <div className="post-image-container">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="post-card-image"
                      />

                      <div className="post-action">
                        <button className="action-btn edit-btn">
                          <MdEdit size={22} color="#ffffff" />
                        </button>

                        <button className="action-btn delete-btn">
                          <MdDelete size={22} color="#ffffff" />
                        </button>
                      </div>
                    </div>

                    <div className="post-card-content">
                      <div className="post-meta">
                        <span className="post-author">
                          By {post.author || "Admin"}
                        </span>
                        <span className="post-date">{post.createdAt}</span>
                      </div>

                      <h3 className="post-card-title">{post.title}</h3>

                      <p className="post-card-description">
                        {post.description}
                      </p>

                      <button className="read-more-btn">Read more</button>
                    </div>

                  </div>
                ))
              )}
            </div>
          )}

        </section>

      </main>
    </div>
  );
};

export default Dashboard;
