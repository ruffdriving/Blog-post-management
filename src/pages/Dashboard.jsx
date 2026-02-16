import React, { useEffect, useState } from "react";
import Navbar from "../component/Navbar";
import { FaPlus } from "react-icons/fa";
import { MdEdit, MdDelete } from "react-icons/md";
import "./Dashboard.css";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false); // Fix: initial false
  const [error, setError] = useState(null); // Fix: initial null
  const navigate = useNavigate();

  // ===============================
  // FETCH POSTS
  // ===============================
  const fetchPosts = async () => {
    try {
      setLoading(true);
      const response = await fetch("http://localhost:5000/posts");

      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

      const data = await response.json();
      setPosts(data);
    } catch (err) {
      setError(err.message);
      console.log("Error fetching posts:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  // ===============================
  // EDIT POST
  // ===============================
  const handleEdit = (postId) => {
    navigate(`/edit-post/${postId}`);
  };
   const handleRead = (postId) => {
    navigate(`/postdetails/${postId}`);
  };

  // ===============================
  // DELETE POST
  // ===============================
  const handleDelete = async (postId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this post?");
    if (!confirmDelete) return;

    try {
      const response = await fetch(`http://localhost:5000/posts/${postId}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete post");

      // Remove deleted post from UI instantly
      setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));

      alert("Post deleted successfully!");
    } catch (error) {
      console.log("Delete error:", error);
      alert("Error deleting post");
    }
  };

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
            <button className="create-shortcut-btn" onClick={() => navigate("/createpost")}>
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
                      <img src={post.image} alt={post.title} className="post-card-image" />

                      <div className="post-actions">
                        <button className="action-btn edit-btn" onClick={() => handleEdit(post.id)}>
                          <MdEdit size={22} color="#ffffff" />
                        </button>

                        <button className="action-btn delete-btn" onClick={() => handleDelete(post.id)}>
                          <MdDelete size={22} color="#ffffff" />
                        </button>
                      </div>
                    </div>

                    <div className="post-card-content">
                      <div className="post-meta">
                        <span className="post-author">By {post.author || "Admin"}</span>
                        <span className="post-date">{post.createdAt}</span>
                      </div>

                      <h3 className="post-card-title">{post.title}</h3>

                      <p className="post-card-description">{post.description}</p>

                      <button className="read-more-btn"   onClick={() => handleRead(post.id)}
>Read more</button>
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
