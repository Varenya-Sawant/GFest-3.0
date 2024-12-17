import React, { useState } from "react";
import "./Forum.css";

const Forum = () => {
  const [posts, setPosts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageFiles, setImageFiles] = useState([]);
  const [openPostId, setOpenPostId] = useState(null);
  const [comments, setComments] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentEditText, setCurrentEditText] = useState("");
  const [currentEditPostId, setCurrentEditPostId] = useState(null);
  const [currentEditCommentId, setCurrentEditCommentId] = useState(null);

  const currentUser = "John Doe";

  // Handle new post submission
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title.trim() || !description.trim() || imageFiles.length === 0) {
      alert("All fields are required!");
      return;
    }

    const newPost = {
      id: posts.length + 1,
      title,
      description,
      image_urls: imageFiles.map((file) => URL.createObjectURL(file)),
      fullname: currentUser,
      created_at: new Date(),
    };

    setPosts([...posts, newPost]);
    setTitle("");
    setDescription("");
    setImageFiles([]);
    setShowForm(false);
  };

  const handleDeletePost = (postId) => {
    const filteredPosts = posts.filter((post) => post.id !== postId);
    setPosts(filteredPosts);
    delete comments[postId];
    alert("Post deleted successfully!");
  };

  // Handle comment submission
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

  const openEditModal = (postId, commentId, commentText) => {
    setCurrentEditPostId(postId);
    setCurrentEditCommentId(commentId);
    setCurrentEditText(commentText);
    setIsModalOpen(true);
  };

  const closeEditModal = () => {
    setIsModalOpen(false);
    setCurrentEditText("");
    setCurrentEditPostId(null);
    setCurrentEditCommentId(null);
  };

  const handleSaveEdit = () => {
    setComments((prev) => ({
      ...prev,
      [currentEditPostId]: prev[currentEditPostId].map((c) =>
        c.id === currentEditCommentId
          ? { ...c, comment: currentEditText, edited_at: new Date() }
          : c
      ),
    }));
    closeEditModal();
  };

  const handleDeleteComment = (postId, commentId) => {
    setComments((prev) => ({
      ...prev,
      [postId]: prev[postId].filter((comment) => comment.id !== commentId),
    }));
    alert("Comment Deleted!");
  };

  return (
    <div className="forum-container">
      <h1>Forums</h1>

      <button
        className="create-post-button"
        onClick={() => setShowForm(!showForm)}
      >
        {showForm ? "Cancel" : "Create Post"}
      </button>

      <div className={`post-form-container ${showForm ? "show" : ""}`}>
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
              onChange={(e) => setImageFiles(Array.from(e.target.files))}
              multiple
              required
            />
            <button type="submit">Submit Post</button>
          </form>
        )}
      </div>

      <div className="post-list">
        {posts.length === 0 ? (
          <p>No posts yet. Be the first to create one!</p>
        ) : (
          posts.map((post) => (
            <div
              key={post.id}
              className={`post-card ${openPostId === post.id ? "open" : ""}`}
              onClick={() =>
                setOpenPostId(openPostId === post.id ? null : post.id)
              }
            >
              {/* Delete Post Button */}
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
                      comments[post.id]?.map((c) => (
                        <div key={c.id} className="comment">
                          <strong>{c.user}:</strong> {c.comment}
                          <p>
                            Created: {new Date(c.created_at).toLocaleString()}
                            {c.edited_at && (
                              <span style={{ color: "gray", fontStyle: "italic" }}>
                                {" "}
                                | Edited: {new Date(c.edited_at).toLocaleString()}
                              </span>
                            )}
                          </p>
                          <button
                            className="edit-button"
                            onClick={() =>
                              openEditModal(post.id, c.id, c.comment)
                            }
                          >
                            Edit
                          </button>
                          {c.user === currentUser && (
                            <button
                              className="delete-button"
                              onClick={() => handleDeleteComment(post.id, c.id)}
                            >
                              Delete
                            </button>
                          )}
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>

      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close-button" onClick={closeEditModal}>
              &times;
            </span>
            <h3>Edit Comment</h3>
            <textarea
              value={currentEditText}
              onChange={(e) => setCurrentEditText(e.target.value)}
              rows="4"
            ></textarea>
            <button onClick={handleSaveEdit}>Save Changes</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Forum;
