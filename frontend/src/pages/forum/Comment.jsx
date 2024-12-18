// src/pages/forum/Comment.jsx
import React, { useState } from "react";

const Comment = ({ postId, comments, setComments, currentUser }) => {
  const [commentText, setCommentText] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [editingComment, setEditingComment] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!commentText.trim()) {
      alert("Comment cannot be empty!");
      return;
    }

    if (editMode && editingComment) {
      // Edit logic
      setComments((prev) => ({
        ...prev,
        [postId]: prev[postId].map((comment) =>
          comment.id === editingComment.id
            ? { ...comment, comment: commentText, edited_at: new Date() }
            : comment
        ),
      }));
      setEditMode(false);
      setEditingComment(null);
      setCommentText("");
    } else {
      const newComment = {
        id: Date.now(),
        comment: commentText,
        user: currentUser,
        created_at: new Date(),
      };

      setComments((prev) => ({
        ...prev,
        [postId]: [...(prev[postId] || []), newComment],
      }));

      setCommentText("");
    }
  };

  const handleEditClick = (comment) => {
    setEditMode(true);
    setEditingComment(comment);
    setCommentText(comment.comment);
  };

  const handleDeleteClick = (commentId) => {
    setComments((prev) => ({
      ...prev,
      [postId]: prev[postId].filter((comment) => comment.id !== commentId),
    }));
    alert("Comment deleted!");
  };

  return (
    <div className="comments-section">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder={editMode ? "Edit your comment..." : "Add a comment..."}
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
        />
        <button type="submit">{editMode ? "Save" : "Comment"}</button>
      </form>
      {comments.length > 0 ? (
        comments.map((comment) => (
          <div key={comment.id} className="comment">
            <strong>{comment.user}: </strong>
            {comment.comment}
            <p>
              Created: {new Date(comment.created_at).toLocaleString()}
              {comment.edited_at && (
                <span style={{ color: "gray", fontStyle: "italic" }}>
                  {" "}
                  | Edited: {new Date(comment.edited_at).toLocaleString()}
                </span>
              )}
            </p>
            {comment.user === currentUser && (
              <>
                <button
                  className="edit-comment-button"
                  onClick={() => handleEditClick(comment)}
                >
                  Edit
                </button>
                <button
                  className="delete-comment-button"
                  onClick={() => handleDeleteClick(comment.id)}
                >
                  Delete
                </button>
              </>
            )}
          </div>
        ))
      ) : (
        <p>No comments yet...</p>
      )}
    </div>
  );
};

export default Comment;
