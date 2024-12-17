// src/pages/forum/PostCard.jsx
import React from "react";
import CommentSection from "./CommentSection";

const PostCard = ({ post, onDelete, toggleComments, showComments }) => {
  return (
    <div className="post-card">
      <div className="post-header">
        <h2>{post.title}</h2>
        <button
          className="delete-post-button"
          onClick={() => onDelete(post.id)}
        >
          Delete Post
        </button>
      </div>
      <p>{post.description}</p>
      {post.image_urls?.map((url, index) => (
        <img key={index} src={url} alt={`media-${index}`} />
      ))}
      <p>Posted by: {post.fullname}</p>
      <p>Created: {new Date(post.created_at).toLocaleString()}</p>
      <button onClick={toggleComments}>
        {showComments ? "Hide Comments" : "Show Comments"}
      </button>
      {showComments && <CommentSection comments={post.comments} />}
    </div>
  );
};

export default PostCard;
