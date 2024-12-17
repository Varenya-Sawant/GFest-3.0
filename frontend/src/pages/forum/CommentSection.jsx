// src/pages/forum/CommentSection.jsx
import React, { useState } from "react";
import CommentCard from "./CommentCard";

const CommentSection = ({ comments }) => {
  const [commentList, setCommentList] = useState(comments);
  const [commentText, setCommentText] = useState("");

  const handleCommentDelete = (commentId) => {
    setCommentList(commentList.filter((comment) => comment.id !== commentId));
  };

  const handleCommentEdit = (commentId, newText) => {
    setCommentList(
      commentList.map((comment) =>
        comment.id === commentId
          ? { ...comment, comment: newText, edited_at: new Date().toISOString() }
          : comment
      )
    );
  };

  const handleCommentSubmit = () => {
    if (!commentText.trim()) return; // Prevent empty submissions

    const newComment = {
      id: Date.now(),
      user: "Anonymous",
      comment: commentText,
      created_at: new Date().toISOString(),
      edited_at: null,
    };

    setCommentList([...commentList, newComment]);
    setCommentText(""); // Clear the text box after submission
  };

  return (
    <div className="comments-container">
      <div>
        <input
          type="text"
          placeholder="Write a comment..."
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
        />
        <button onClick={handleCommentSubmit}>Submit Comment</button>
      </div>
      {commentList.map((comment) => (
        <CommentCard
          key={comment.id}
          comment={comment}
          onDelete={handleCommentDelete}
          onEdit={handleCommentEdit}
        />
      ))}
    </div>
  );
};

export default CommentSection;
