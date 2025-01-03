import React, { useState } from "react";
import Post from "./Post";
import "./Forum.css";

const Posts = ({ posts, setPosts, comments, setComments, currentUser }) => {
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageFiles, setImageFiles] = useState([]);
  const [openPostId, setOpenPostId] = useState(null);

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
    setPosts(posts.filter((post) => post.id !== postId));
    setComments((prev) => {
      const updatedComments = { ...prev };
      delete updatedComments[postId];
      return updatedComments;
    });
    alert("Post deleted successfully!");
  };

  return (
    <div>
      <button
        className="create-post-button"
        onClick={() => setShowForm(!showForm)}
      >
        {showForm ? "Cancel" : "Create Post"}
      </button>

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

      <div className="post-list">
        {posts.length === 0 ? (
          <p>No posts yet. Be the first to create one!</p>
        ) : (
          posts.map((post) => (
            <Post
              key={post.id}
              post={post}
              currentUser={currentUser}
              handleDeletePost={handleDeletePost}
              comments={comments}
              setComments={setComments}
              openPostId={openPostId}
              setOpenPostId={setOpenPostId}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default Posts;
