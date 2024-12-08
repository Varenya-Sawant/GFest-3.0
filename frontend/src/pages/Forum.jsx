// src/pages/Forum.js

import React, { useState } from "react";
import "./Forum.css"; // Import the CSS file

const Forum = () => {
  const [posts, setPosts] = useState([]);
  const [showForm, setShowForm] = useState(false); // State to toggle form visibility
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [openPostId, setOpenPostId] = useState(null); // State to track which post is open
  const [comments, setComments] = useState({}); // State to hold comments for each post
  
  // Simulated current user name
  const currentUser = "John Doe"; // Replace with the actual logged-in user name

  // Handle submitting a new post
  const handleSubmit = (e) => {
    e.preventDefault();

    const newPost = {
      id: posts.length + 1,
      title,
      description,
      image_url: URL.createObjectURL(imageFile), // Create a URL for the uploaded file
      fullname: currentUser,
      created_at: new Date(),
    };

    // Add the new post to the list
    setPosts([...posts, newPost]);

    // Reset the form fields
    setTitle("");
    setDescription("");
    setImageFile(null);
    setShowForm(false); // Hide the form after submission
  };

  // Handle commenting on a post
  const handleCommentSubmit = (e, postId) => {
    e.preventDefault();
    const comment = e.target.comment.value;
    if (comment) {
      setComments((prevComments) => ({
        ...prevComments,
        [postId]: [...(prevComments[postId] || []), { comment, user: currentUser }],
      }));
      e.target.reset(); // Clear the comment input
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
            accept="image/*" // Accept image files only
            onChange={(e) => setImageFile(e.target.files[0])} // Store the selected file
            required
          />
          <button type="submit">Submit Post</button>
        </form>
      )}
      
      {/* Displaying posts as cards */}
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
                <form onSubmit={(e) => handleCommentSubmit(e, post.id)} onClick={(e) => e.stopPropagation()}>
                  <input 
                    type="text" 
                    name="comment" 
                    placeholder="Add a comment..." 
                    required 
                  />
                  <button type="submit">Comment</button>
                </form>
                <div>
                  {comments[post.id]?.map((c, index) => (
                    <div key={index}>
                      <strong>{c.user}: </strong>{c.comment}
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
