// src/pages/forum/PostForm.jsx
import React, { useState } from "react";

const PostForm = ({ handleNewPost }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageFiles, setImageFiles] = useState([]);

  const handleSubmit = () => {
    if (!title.trim() || !description.trim()) {
      alert("All fields must be filled!");
      return;
    }

    const newPost = {
      id: Date.now(),
      title,
      description,
      fullname: "John Doe",
      created_at: new Date().toISOString(),
      comments: [],
      image_urls: imageFiles.map((file) => URL.createObjectURL(file)),
    };

    handleNewPost(newPost);
    setTitle("");
    setDescription("");
    setImageFiles([]);
  };

  return (
    <div className="post-form">
      <input
        type="text"
        placeholder="Post Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder="Write a description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <input
        type="file"
        accept="image/*"
        multiple
        onChange={(e) => setImageFiles(Array.from(e.target.files))}
      />
      <button className="submit-button" onClick={handleSubmit}>
        Submit Post
      </button>
    </div>
  );
};

export default PostForm;
