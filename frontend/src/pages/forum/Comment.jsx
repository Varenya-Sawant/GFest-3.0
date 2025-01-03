import React, { useState } from "react";
import "./Forum.css";

const Comment = ({
  comment,
  postId,
  currentUser,
  handleDeleteComment,
  handleEditComment,
  handleSaveEdit,
}) => {
  const [editedComment, setEditedComment] = useState(comment.comment);
  const [isEditing, setIsEditing] = useState(false);

  const handleEditSubmit = (e) => {
    e.preventDefault();
    handleSaveEdit(postId, comment.id, editedComment);
    setIsEditing(false);  // Exit edit mode after saving
  };

  return (
    <div className="comment">
      {comment.user === currentUser && !isEditing && (
        <button
          className="edit-comment-button"
          onClick={() => setIsEditing(true)}
        >
          Edit
        </button>
      )}
      {comment.user === currentUser && (
        <button
          className="delete-comment-button"
          onClick={() => handleDeleteComment(comment.id, postId)}
        >
          Delete
        </button>
      )}

      {!isEditing ? (
        <>
          <p>{comment.comment}</p>
          {comment.edited_at && (
            <p className="edited">
              Edited: {new Date(comment.edited_at).toLocaleString()}
            </p>
          )}
        </>
      ) : (
        <form onSubmit={handleEditSubmit}>
          <input
            type="text"
            value={editedComment}
            onChange={(e) => setEditedComment(e.target.value)}
            required
          />
          <button type="submit">Save</button>
        </form>
      )}
    </div>
  );
};

export default Comment;
