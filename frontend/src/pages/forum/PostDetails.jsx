import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router';
import './PostDetails.css';

const PostDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [editComment, setEditComment] = useState('');
  const [editingComment, setEditingComment] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const currentUserEmail = localStorage.getItem('user_email');

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`http://192.168.152.58:3000/api/forum/posts/${id}`);
        setPost(response.data.post);
        setComments(response.data.comments);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching post:', err);
        setError('Failed to load post');
        setLoading(false);
      }
    };
    fetchPost();
  }, [id]);

  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!currentUserEmail) {
      navigate('/login');
      return;
    }

    try {
      await axios.post(
        'http://192.168.152.58:3000/api/forum/comments',
        { post_id: id, comment_content: newComment, email: currentUserEmail },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        }
      );
      setComments([
        ...comments,
        {
          user_email: currentUserEmail,
          post_id: id,
          comment_content: newComment,
          createdAt: new Date(),
          user_name: currentUserEmail || localStorage.getItem('user_name'),
        },
      ]);
      setNewComment('');
    } catch (err) {
      console.error('Error adding comment:', err);
      alert(err.response?.data?.message || 'Failed to add comment');
    }
  };

  const handleEditComment = async () => {
    try {
      await axios.put(
        'http://192.168.152.58:3000/api/forum/comments',
        { post_id: id, comment_content: editComment, email: currentUserEmail },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        }
      );

      setComments(
        comments.map((comment) =>
          comment.user_email === currentUserEmail
            ? { ...comment, comment_content: editComment }
            : comment
        )
      );
      setEditingComment(false);
      setEditComment('');
    } catch (err) {
      console.error('Error updating comment:', err);
      alert('Failed to update comment');
    }
  };

  const handleDeleteComment = async (commenterEmail) => {
    try {
      await axios.delete('http://192.168.152.58:3000/api/forum/comments', {
        data: { post_id: id, commenter_email: commenterEmail },
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setComments(comments.filter((comment) => comment.user_email !== commenterEmail));
    } catch (err) {
      console.error('Error deleting comment:', err);
      alert('Failed to delete comment');
    }
  };

  const handleDeletePost = async () => {
    if (confirm('Are you sure you want to delete this post?')) {
      try {
        await axios.delete(`http://192.168.152.58:3000/api/forum/posts/${id}`, {
          data: { email: currentUserEmail }
        }, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        navigate('/forum');
      } catch (err) {
        console.error('Error deleting post:', err);
        alert('Failed to delete post');
      }
    }
  };

  if (loading) return <div>Loading post...</div>;
  if (error) return <div>{error}</div>;
  if (!post) return <div>Post not found</div>;

  const isPostAuthor = currentUserEmail === post.user_email;

  return (
    <div className="post-details-container">
      <h2>{post.post_title}</h2>
      <p>
        Posted by: {post.user_name} on {new Date(post.createdAt).toLocaleString()}
      </p>
      <p className="post-content">{post.post_content}</p>
      {post.post_image_name && (
        <div className="post-images">
          {
            <img
              src={post.post_image_name}
              alt={post.post_title}
              className="post-image"
            />
          }
        </div>
      )}
      {isPostAuthor && (
        <div className="post-actions">
          <button onClick={() => navigate(`/forum/edit/${id}`)}>Edit Post</button>
          <button onClick={handleDeletePost}>Delete Post</button>
        </div>
      )}
      <h3>Comments</h3>
      {comments.length === 0 ? (
        <p>No comments yet.</p>
      ) : (
        <div className="comments-list">
          {comments.map((comment) => (
            <div key={`${comment.user_email}-${comment.post_id}`} className="comment">
              <p>
                <strong>{comment.user_name}</strong> on{' '}
                {new Date(comment.createdAt).toLocaleString()}:
              </p>
              {editingComment && comment.user_email === currentUserEmail ? (
                <div>
                  <textarea
                    value={editComment}
                    onChange={(e) => setEditComment(e.target.value)}
                  />
                  <button onClick={handleEditComment}>Save</button>
                  <button onClick={() => setEditingComment(false)}>Cancel</button>
                </div>
              ) : (
                <p>{comment.comment_content}</p>
              )}
              {(comment.user_email === currentUserEmail || isPostAuthor) && (
                <div className="comment-actions">
                  {comment.user_email === currentUserEmail && !editingComment && (
                    <button
                      onClick={() => {
                        setEditingComment(true);
                        setEditComment(comment.comment_content);
                      }}
                    >
                      Edit
                    </button>
                  )}
                  <button onClick={() => handleDeleteComment(comment.user_email)}>
                    Delete
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
      {currentUserEmail && !comments.some((c) => c.user_email === currentUserEmail) && (
        <div className="add-comment">
          <h4>Add a Comment</h4>
          <form onSubmit={handleAddComment}>
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              required
            />
            <button type="submit">Submit Comment</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default PostDetails;