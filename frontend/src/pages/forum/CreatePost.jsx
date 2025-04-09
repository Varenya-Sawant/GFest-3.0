import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router';
import './CreatePost.css';

const CreatePost = () => {
  const { id } = useParams(); // For editing (if id exists)
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [images, setImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (id) {
      // Fetch post for editing
      const fetchPost = async () => {
        try {
          const response = await axios.get(`http://localhost:3000/api/forum/posts/${id}`);
          const { post } = response.data;
          setTitle(post.post_title);
          setContent(post.post_content);
        } catch (err) {
          console.error('Error fetching post:', err);
          setError('Failed to load post for editing');
        };
      };
      fetchPost();
    };
  }, [id]);

  // Handle image upload
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);
    const previews = files.map((file) => URL.createObjectURL(file));
    setImagePreviews(previews);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!localStorage.getItem('user_email')) {
      navigate('/login');
      return;
    }

    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append('post_title', title);
    formData.append('post_content', content);
    formData.append('email', localStorage.getItem('user_email'));

    images.forEach((image, index) => {
      formData.append('post_image_name', image);
      formData.append('post_image_name_details', JSON.stringify({
        uri: imagePreviews[index],
        type: image.type,
        name: image.name
      }));
    });

    try {
      if (id) {
        formData.append('update', true);

        // Update post
        await axios.post(`http://localhost:3000/api/forum/posts/${id}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        alert('Post updated successfully!');
      } else {
        formData.append('update', false);

        // Create post
        await axios.post('http://localhost:3000/api/forum/posts', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        alert('Post created successfully!');
      }
      navigate('/forum');
    } catch (err) {
      console.error('Error saving post:', err);
      setError(err.response?.data?.message || 'Failed to save post');
      setLoading(false);
    }
  };

  return (
    <div className="create-post-container">
      <h2>{id ? 'Edit Post' : 'Create Post'}</h2>
      {error && <div className="error">{error}</div>}
      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </label>
        <label>
          Content:
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </label>
        <label>
          Image:
          <input type="file" onChange={handleImageChange} required />

          <div className="image-previews">
            {imagePreviews.map((preview, index) => (
              <img key={index} src={preview} alt="Preview" style={{ width: '500px', margin: '5px', objectFit: 'contain' }} />
            ))}
          </div>
        </label>
        <button type="submit" disabled={loading}>
          {loading ? 'Saving...' : id ? 'Update Post' : 'Create Post'}
        </button>
      </form>
    </div>
  );
};

export default CreatePost;