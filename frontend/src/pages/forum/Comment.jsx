import React, { useState } from "react";

// Frontend comment handler interacting with the backend API
const Comment = ({ postId, comments, setComments, currentUser }) => {
  const [commentText, setCommentText] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [editingComment, setEditingComment] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!commentText.trim()) {
      alert("Comment cannot be empty!");
      return;
    }

    if (editMode && editingComment) {
      // Edit Logic
      try {
        const response = await fetch(
          `http://localhost:5000/api/posts/${postId}/comments/${editingComment.id}`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ comment: commentText }),
          }
        );

        if (!response.ok) {
          throw new Error("Failed to edit the comment.");
        }

        const updatedComment = await response.json();
        setComments((prev) => ({
          ...prev,
          [postId]: prev[postId].map((comment) =>
            comment.id === editingComment.id
              ? { ...comment, comment: commentText }
              : comment
          ),
        }));

        setEditMode(false);
        setEditingComment(null);
        setCommentText("");
      } catch (error) {
        alert(error.message);
      }
    } else {
      // Create Logic
      try {
        const response = await fetch(
          `http://localhost:5000/api/posts/${postId}/comments`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              user: currentUser,
              comment: commentText,
            }),
          }
        );

        if (!response.ok) {
          throw new Error("Failed to submit the comment.");
        }

        const newComment = await response.json();
        setComments((prev) => ({
          ...prev,
          [postId]: [...(prev[postId] || []), newComment],
        }));

        setCommentText("");
      } catch (error) {
        alert(error.message);
      }
    }
  };

  const handleEditClick = (comment) => {
    setEditMode(true);
    setEditingComment(comment);
    setCommentText(comment.comment);
  };

  const handleDeleteClick = async (commentId) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/posts/${postId}/comments/${commentId}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete the comment.");
      }

      setComments((prev) => ({
        ...prev,
        [postId]: prev[postId].filter((comment) => comment.id !== commentId),
      }));
      alert("Comment deleted!");
    } catch (error) {
      alert(error.message);
    }
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
