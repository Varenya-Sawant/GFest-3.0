import React, { useState } from "react";
import Comment from "./Comment";

const Post = ({
  post,
  currentUser,
  handleDeletePost,
  comments,
  setComments,
  openPostId,
  setOpenPostId,
}) => {
  const handleCommentSubmit = (e, postId) => {
    e.preventDefault();
    const commentText = e.target.comment.value.trim();

    if (!commentText) {
      alert("Comment cannot be empty!");
      return;
    }

    const newComment = {
      id: Date.now(),
      comment: commentText,
      user: currentUser,
      created_at: new Date(),
      edited_at: null,
    };

    setComments((prev) => ({
      ...prev,
      [postId]: [...(prev[postId] || []), newComment],
    }));

    e.target.reset();
  };

  const handleDeleteComment = (commentId, postId) => {
    setComments((prev) => ({
      ...prev,
      [postId]: prev[postId].filter((comment) => comment.id !== commentId),
    }));
    alert("Comment Deleted!");
  };

  const handleSaveEdit = (postId, commentId, editedComment) => {
    setComments((prev) => ({
      ...prev,
      [postId]: prev[postId].map((comment) =>
        comment.id === commentId
          ? { ...comment, comment: editedComment, edited_at: new Date() }
          : comment
      ),
    }));
  };

  const handleToggleComments = () => {
    setOpenPostId(openPostId === post.id ? null : post.id);
  };

  return (
    <div className={`post-card ${openPostId === post.id ? "open" : ""}`}>
      {post.fullname === currentUser && (
        <button
          className="delete-post-button"
          onClick={(e) => {
            e.stopPropagation();
            handleDeletePost(post.id);
          }}
        >
          Delete Post
        </button>
      )}

      <h2>{post.title}</h2>
      <p>{post.description}</p>
      {post.image_urls?.map((url, index) => (
        <img key={index} src={url} alt={`Post Media ${index + 1}`} />
      ))}
      <p>Posted by: {post.fullname}</p>
      <p>{new Date(post.created_at).toLocaleString()}</p>

      <button className="toggle-comments-button" onClick={handleToggleComments}>
        {openPostId === post.id ? "Hide Comments" : "Show Comments"}
      </button>

      {openPostId === post.id && (
        <div>
          <h3>Comments</h3>
          <form
            onSubmit={(e) => handleCommentSubmit(e, post.id)}
            onClick={(e) => e.stopPropagation()}
          >
            <input
              type="text"
              name="comment"
              placeholder="Add a comment..."
              required
            />
            <button type="submit">Comment</button>
          </form>

          <div>
            {comments[post.id]?.length === 0 ? (
              <p>No comments yet. Be the first to comment!</p>
            ) : (
              comments[post.id]?.map((comment) => (
                <Comment
                  key={comment.id}
                  comment={comment}
                  postId={post.id}
                  currentUser={currentUser}
                  handleDeleteComment={handleDeleteComment}
                  handleSaveEdit={handleSaveEdit}
                />
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Post;
