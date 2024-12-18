import React, { useState, useEffect } from "react";
import "./Forum.css";
import Post from "./Post";
import Comment from "./Comment";

// Backend endpoint URL
const API_URL = "http://localhost:5000/api";

const Forum = () => {
  const [posts, setPosts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [comments, setComments] = useState({});
  const [openPostId, setOpenPostId] = useState(null);

  const currentUser = "John Doe";

  const togglePostForm = () => setShowForm((prev) => !prev);

  const fetchPosts = async () => {
    try {
      const response = await fetch(`${API_URL}/posts`);
      const data = await response.json();
      setPosts(data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleNewPost = async (newPost) => {
    try {
      const response = await fetch(`${API_URL}/posts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newPost),
      });

      if (!response.ok) {
        throw new Error("Could not create post");
      }

      const savedPost = await response.json();
      setPosts((prev) => [...prev, savedPost]);
      setShowForm(false);
    } catch (error) {
      console.error("Error submitting post:", error);
    }
  };

  const handleDeletePost = async (postId) => {
    try {
      const response = await fetch(`${API_URL}/posts/${postId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Could not delete post");
      }

      setPosts((prev) => prev.filter((post) => post.id !== postId));
      setComments((prev) => {
        const newComments = { ...prev };
        delete newComments[postId];
        return newComments;
      });
      alert("Post Deleted");
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  const toggleComments = async (postId) => {
    if (!comments[postId]) {
      try {
        const response = await fetch(`${API_URL}/comments/${postId}`);
        const data = await response.json();
        setComments((prev) => ({
          ...prev,
          [postId]: data,
        }));
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    }
    setOpenPostId(openPostId === postId ? null : postId);
  };

  return (
    <div className="forum-container">
      <h1>Forum</h1>

      <button className="create-post-button" onClick={togglePostForm}>
        {showForm ? "Cancel" : "Create Post"}
      </button>

      {showForm && (
        <Post
          onSubmit={handleNewPost}
          closeForm={togglePostForm}
          currentUser={currentUser}
        />
      )}

      <div className="post-list">
        {posts.length === 0 && <p>No posts yet, be the first to create one!</p>}

        {posts.map((post) => (
          <div key={post.id} className="post-card">
            <h2>{post.title}</h2>
            <p>{post.description}</p>
            {post.image_urls?.map((url, index) => (
              <img key={index} src={url} alt={`image-${index}`} />
            ))}
            <button
              className="toggle-comments-button"
              onClick={() => toggleComments(post.id)}
            >
              {openPostId === post.id ? "Hide Comments" : "View Comments"}
            </button>
            {openPostId === post.id && (
              <Comment
                postId={post.id}
                comments={comments[post.id] || []}
                setComments={setComments}
                currentUser={currentUser}
              />
            )}
            <button
              className="delete-post-button"
              onClick={() => handleDeletePost(post.id)}
            >
              Delete Post
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Forum;
