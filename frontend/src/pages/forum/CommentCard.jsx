// src/pages/forum/CommentCard.jsx
import React, { useState } from "react";

const CommentCard = ({ comment, onDelete, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newText, setNewText] = useState(comment.comment);

  return (
    <div className="comment-card">
      {isEditing ? (
        <>
          <textarea
            value={newText}
            onChange={(e) => setNewText(e.target.value)}
          />
          <button
            onClick={() => {
              onEdit(comment.id, newText);
              setIsEditing(false);
            }}
          >
            Save
          </button>
          <button onClick={() => setIsEditing(false)}>Cancel</button>
        </>
      ) : (
        <>
          <p>
            <strong>{comment.user}:</strong> {comment.comment}
          </p>
          <p>
            Created: {new Date(comment.created_at).toLocaleString()}
            {comment.edited_at && (
              <span style={{ fontStyle: "italic" }}> | Edited: {new Date(comment.edited_at).toLocaleString()}</span>
            )}
          </p>
          <button onClick={() => setIsEditing(true)}>Edit</button>
          <button onClick={() => onDelete(comment.id)}>Delete</button>
        </>
      )}
    </div>
  );
};

export default CommentCard;
