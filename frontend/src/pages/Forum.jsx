import React, { useState } from "react";
import "./Forum.css";

const Forum = () => {
  const [posts, setPosts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [openPostId, setOpenPostId] = useState(null);
  const [comments, setComments] = useState({});

  const currentUser = "John Doe";

  // Handle new post submission
  const handleSubmit = (e) => {
    e.preventDefault();

    const newPost = {
      id: posts.length + 1,
      title,
      description,
      image_url: URL.createObjectURL(imageFile),
      fullname: currentUser,
      created_at: new Date(),
    };

    setPosts([...posts, newPost]);
    setTitle("");
    setDescription("");
    setImageFile(null);
    setShowForm(false);
  };

  // Handle new comment submission
  const handleCommentSubmit = (e, postId) => {
    e.preventDefault();
    const commentText = e.target.comment.value;

    if (commentText) {
      const newComment = {
        id: Date.now(), // unique ID for each comment
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
    }
  };

  // Handle comment edit
  const handleCommentEdit = (postId, commentId) => {
    const newCommentText = prompt("Edit your comment:");

    if (newCommentText) {
      setComments((prev) => ({
        ...prev,
        [postId]: prev[postId].map((c) =>
          c.id === commentId
            ? { ...c, comment: newCommentText, edited_at: new Date() }
            : c
        ),
      }));
    }
  };

  return (
    <div className="forum-container">
      <h1>Forums</h1>

      {/* Create Post Button */}
      <button className="create-post-button" onClick={() => setShowForm(!showForm)}>
        {showForm ? "Cancel" : "Create Post"}
      </button>

      {/* Post Form */}
      {showForm && (
        <form className="post-form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImageFile(e.target.files[0])}
            required
          />
          <button type="submit">Submit Post</button>
        </form>
      )}

      {/* Display posts as cards */}
      <div className="post-list">
        {posts.map((post) => (
          <div
            key={post.id}
            className="post-card"
            onClick={() => setOpenPostId(openPostId === post.id ? null : post.id)}
          >
            <h2>{post.title}</h2>
            <p>{post.description}</p>
            {post.image_url && <img src={post.image_url} alt="Post" />}
            <p>Posted by: {post.fullname}</p>
            <p>{new Date(post.created_at).toLocaleString()}</p>

            {/* Comments Section */}
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
                  {comments[post.id]?.map((c) => (
                    <div key={c.id} className="comment">
                      <strong>{c.user}:</strong> {c.comment}
                      <p>
                        Created: {new Date(c.created_at).toLocaleString()}
                        {c.edited_at && ` | Edited: ${new Date(c.edited_at).toLocaleString()}`}
                      </p>
                      <button
                        className="edit-button"
                        onClick={() => handleCommentEdit(post.id, c.id)}
                      >
                        Edit
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Forum;
