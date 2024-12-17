// src/pages/forum/Forum.jsx
import React, { useState } from "react";
import PostForm from "./PostForm";
import PostCard from "./PostCard";
import "./Forum.css";

// Example mock data
const mockPosts = [
  {
    id: 1,
    title: "Welcome to the forum",
    description: "Feel free to share your thoughts here!",
    fullname: "John Doe",
    created_at: "2024-12-17T12:00:00",
    comments: [],
    showComments: false,
  },
];

const Forum = () => {
  const [posts, setPosts] = useState(mockPosts);
  const [showPostForm, setShowPostForm] = useState(false);

  const handleNewPost = (newPost) => {
    setPosts([newPost, ...posts]);
    setShowPostForm(false);
  };

  const deletePost = (postId) => {
    const updatedPosts = posts.filter((post) => post.id !== postId);
    setPosts(updatedPosts);
  };

  const toggleComments = (postId) => {
    const updatedPosts = posts.map((post) =>
      post.id === postId
        ? { ...post, showComments: !post.showComments }
        : post
    );
    setPosts(updatedPosts);
  };

  return (
    <div className="forum-container">
      <h1>Forum</h1>
      <button
        className="create-post-button"
        onClick={() => setShowPostForm(!showPostForm)}
      >
        {showPostForm ? "Cancel" : "Create Post"}
      </button>

      {showPostForm && <PostForm handleNewPost={handleNewPost} />}

      <div className="posts-container">
        {posts.length > 0 ? (
          posts.map((post) => (
            <PostCard
              key={post.id}
              post={post}
              onDelete={deletePost}
              toggleComments={() => toggleComments(post.id)}
              showComments={post.showComments}
            />
          ))
        ) : (
          <p>No posts yet. Be the first to post!</p>
        )}
      </div>
    </div>
  );
};

export default Forum;
