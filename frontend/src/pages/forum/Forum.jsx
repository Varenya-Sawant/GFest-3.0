// src/pages/forum/Forum.jsx
import React, { useState } from "react";
import "./Forum.css";
import Post from "./Post";
import Comment from "./Comment";

const Forum = () => {
  const [posts, setPosts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [comments, setComments] = useState({});
  const [openPostId, setOpenPostId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const currentUser = "John Doe";

  const togglePostForm = () => setShowForm((prev) => !prev);

  const handleNewPost = (newPost) => {
    setPosts((prev) => [...prev, newPost]);
    setShowForm(false);
  };

  const handleDeletePost = (postId) => {
    setPosts((prev) => prev.filter((post) => post.id !== postId));
    setComments((prev) => {
      const newComments = { ...prev };
      delete newComments[postId];
      return newComments;
    });
    alert("Post Deleted");
  };

  const toggleComments = (postId) => {
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
