import './Forum.css'; // Updated CSS file

import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router';
import axios from 'axios';

const Forum = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const postsPerPage = 10;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(
          `http://192.168.6.58:3000/api/forum/posts?page=${page}&limit=${postsPerPage}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          }
        );
        setPosts(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching posts:', err);
        setError('Failed to load posts. Please log in and try again.');
        setLoading(false);
      }
    };

    fetchPosts();
  }, [page]);

  const handleCreatePost = () => {
    if (!localStorage.getItem('user_email')) {
      navigate('/login');
      return;
    }
    navigate('/forum/create');
  };

  if (loading) return <div className="forum-loading">Loading posts...</div>;
  if (error) return <div className="forum-error">{error}</div>;

  return (
    <div className="forum-container">
      <header className="forum-header">
        <h1>Forum</h1>
        <button className="create-post-button" onClick={handleCreatePost}>
          Create New Post
        </button>
      </header>
      {posts.length === 0 ? (
        <div className="no-posts">
          <p>No posts available. Be the first to create one!</p>
          <button className="create-post-button" onClick={handleCreatePost}>
            Create Post
          </button>
        </div>
      ) : (
        <div className="posts-grid">
          {posts.map((post) => (
            <Link to={`/forum/posts/${post.post_id}`} className="post-title">
              <div key={post.post_id} className="post-card">
                <h3>
                  <img src={post.post_image_name} alt="" width={100} style={{ objectFit: 'contain' }} />
                  {post.post_title}
                </h3>
                <p className="post-meta">
                  Posted by: <span className="post-author">{post.user_name}</span> on{' '}
                  <span className="post-date">
                    {new Date(post.createdAt).toLocaleString()}
                  </span>
                </p>
                <p className="post-preview">{post.post_content.substring(0, 150)}...</p>
              </div>
            </Link>
          ))}
        </div>
      )}
      {/* <div className="pagination">
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
          className="pagination-button"
        >
          Previous
        </button>
        <span className="pagination-info">Page {page}</span>
        <button
          onClick={() => setPage((prev) => prev + 1)}
          disabled={posts.length < postsPerPage}
          className="pagination-button"
        >
          Next
        </button>
      </div> */}
    </div>
  );
};

export default Forum;