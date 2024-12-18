// src/pages/forum/Post.jsx
import React, { useState } from "react";

const Post = ({ onSubmit, closeForm, currentUser }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageFiles, setImageFiles] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title.trim() || !description.trim() || imageFiles.length === 0) {
      alert("Please fill all fields!");
      return;
    }

    const newPost = {
      id: Date.now(),
      title,
      description,
      image_urls: imageFiles.map((file) => URL.createObjectURL(file)),
      fullname: currentUser,
      created_at: new Date(),
    };

    onSubmit(newPost);

    setTitle("");
    setDescription("");
    setImageFiles([]);
  };

  return (
    <form className="post-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setImageFiles(Array.from(e.target.files))}
        multiple
      />
      <button type="submit">Submit</button>
      <button type="button" onClick={closeForm}>
        Cancel
      </button>
    </form>
  );
};

export default Post;
