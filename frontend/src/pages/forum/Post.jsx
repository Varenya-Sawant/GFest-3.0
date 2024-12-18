import React, { useState } from "react";

// Backend endpoint URL
const API_URL = "http://localhost:5000/api";

const Post = ({ onSubmit, closeForm, currentUser }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageFiles, setImageFiles] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim() || !description.trim()) {
      alert("Please fill all fields!");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("fullname", currentUser);

    imageFiles.forEach((file, index) => {
      formData.append(`images[${index}]`, file);
    });

    try {
      const response = await fetch(`${API_URL}/posts`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to submit post");
      }

      const result = await response.json();
      onSubmit(result);

      // Reset form fields on success
      setTitle("");
      setDescription("");
      setImageFiles([]);
      closeForm();
    } catch (error) {
      console.error("Error submitting post:", error);
    }
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
