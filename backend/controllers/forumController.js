const connection = require('../mysql');
const path = require('path');
const fs = require('fs').promises;

const getAllPosts = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  const offset = (page - 1) * limit;

  try {
    /* const [posts] = await connection.query(
      `SELECT p.post_id, p.post_title, p.post_content, p.user_email, p.createdAt, u.user_name
       FROM posts p
       JOIN users u ON p.user_email = u.user_email
       ORDER BY p.createdAt DESC
       LIMIT ? OFFSET ?`,
      [parseInt(limit), parseInt(offset)]
    ); */

    const [posts] = await connection.query(
      `SELECT p.post_id, p.post_title, p.post_content, p.user_email, p.createdAt, u.user_name, pi.post_image_name
      FROM posts p
      JOIN users u ON p.user_email = u.user_email
      LEFT JOIN post_image_name pi ON p.post_id = pi.post_id
      ORDER BY p.createdAt DESC;`
    );

    posts.forEach((post) => {
      post.post_image_name = 'http://192.168.152.58:3000/uploads/post/' + post.post_image_name;
    });

    res.status(200).json(posts);
  } catch (error) {
    console.error('Error fetching posts:', error);
    res.status(500).json({ message: 'Server error fetching posts' });
  }
};

const createPost = async (req, res) => {
  const { id } = req.params;

  const { post_title, post_content, email: user_email, update } = req.body;
  const post_image_name = JSON.parse(req.body.post_image_name_details);

  try {
    // Title validation
    const titleRegex = /^(?![0-9\s!@#$%^&*()_+\-=\[\]{};':"\\|,.<>/?]*$).{3,}$/;
    if (!titleRegex.test(post_title)) {
      return res.status(400).json({
        message: 'Title must not be only numbers or special characters and must be at least 3 characters long.',
      });
    };

    if (update == 'true') {
      await connection.query(
        'UPDATE posts SET post_title = ?, post_content = ?, createdAt = NOW() WHERE post_id = ?',
        [post_title, post_content, id]
      );

      // Handle image upload (replace existing images)
      if (post_image_name) {
        // Delete existing images
        await connection.query('DELETE FROM post_image_name WHERE post_id = ?', [id]);

        await connection.query(
          'INSERT INTO post_image_name (post_id, post_image_name) VALUES (?, ?)',
          [id, post_image_name.name]
        );
      }

      res.status(200).json({ message: 'Post updated successfully' });

      return;
    };

    // Insert post
    const [result] = await connection.query(
      'INSERT INTO posts (post_title, post_content, user_email) VALUES (?, ?, ?)',
      [post_title, post_content, user_email]
    );
    const post_id = result.insertId;

    // Handle image upload
    await connection.query(
      'INSERT INTO post_image_name (post_id, post_image_name) VALUES (?, ?)',
      [post_id, post_image_name.name]
    );

    res.status(201).json({ message: 'Post created successfully', post_id });
  } catch (error) {
    console.error('Error creating post:', error);
    res.status(500).json({ message: 'Server error creating post', error: error.message });
  }
};

const getPostById = async (req, res) => {
  const { id } = req.params;

  try {
    // Fetch post details
    /* const [posts] = await connection.query(
      `SELECT p.post_id, p.post_title, p.post_content, p.user_email, p.createdAt, u.user_name,
              GROUP_CONCAT(pin.post_image_name) AS image_links
       FROM posts p
       JOIN users u ON p.user_email = u.user_email
       LEFT JOIN post_image_name pin ON p.post_id = pin.post_id
       WHERE p.post_id = ?
       GROUP BY p.post_id`,
      [id]
    ); */

    const [posts] = await connection.query(
      `SELECT p.post_id, p.post_title, p.post_content, p.user_email, p.createdAt, pi.post_image_name
       FROM posts p
       JOIN post_image_name pi ON p.post_id = pi.post_id
       WHERE p.post_id = ?`,
      [id]
    );

    if (posts.length === 0) {
      return res.status(404).json({ message: 'Post not found' });
    }

    const post = posts[0];
    post.post_image_name = 'http://192.168.152.58:3000/uploads/post/' + post.post_image_name;

    // Fetch comments
    const [comments] = await connection.query(
      `SELECT ucop.user_email, ucop.post_id, ucop.comment_content, ucop.createdAt, u.user_name
       FROM user_comment_on_posts ucop
       JOIN users u ON ucop.user_email = u.user_email
       WHERE ucop.post_id = ?`,
      [id]
    );

    res.status(200).json({ post, comments });
  } catch (error) {
    console.error('Error fetching post:', error);
    res.status(500).json({ message: 'Server error fetching post' });
  }
};

/* const updatePost = async (req, res) => {
  const { id } = req.params;
  const { post_title, post_content, email: user_email } = req.body;

  try {
    // Title validation
    const titleRegex = /^(?![0-9\s!@#$%^&*()_+\-=\[\]{};':"\\|,.<>/?]*$).{3,}$/;
    if (!titleRegex.test(post_title)) {
      return res.status(400).json({
        message: 'Title must not be only numbers or special characters and must be at least 3 characters long.',
      });
    }

    // Verify post ownership
    const [post] = await connection.query(
      'SELECT user_email FROM posts WHERE post_id = ?',
      [id]
    );
    if (post.length === 0 || post[0].user_email !== user_email) {
      return res.status(403).json({ message: 'Unauthorized to update this post' });
    }

    // Update post
    await connection.query(
      'UPDATE posts SET post_title = ?, post_content = ?, createdAt = NOW() WHERE post_id = ?',
      [post_title, post_content, id]
    );

    // Handle image upload (replace existing images)
    if (post_image) {
      const uploadDir = path.join(__dirname, '../uploads/post');
      await fs.mkdir(uploadDir, { recursive: true });
      const fileName = `${id}_${Date.now()}_${post_image.originalname}`;
      const filePath = path.join(uploadDir, fileName);
      await post_image.mv(filePath);

      // Delete existing images
      await connection.query('DELETE FROM post_image_name WHERE post_id = ?', [id]);
      await connection.query(
        'INSERT INTO post_image_name (post_id, post_image_name) VALUES (?, ?)',
        [id, `/uploads/post/${fileName}`]
      );
    }

    res.status(200).json({ message: 'Post updated successfully' });
  } catch (error) {
    console.error('Error updating post:', error);
    res.status(500).json({ message: 'Server error updating post' });
  }
}; */

const deletePost = async (req, res) => {
  const { id } = req.params;
  const user_email = req.body.email;

  try {
    // Verify post ownership
    const [post] = await connection.query(
      'SELECT user_email FROM posts WHERE post_id = ?',
      [id]
    );
    if (post.length === 0 || post[0].user_email !== user_email) {
      return res.status(403).json({ message: 'Unauthorized to delete this post' });
    };

    // Delete post, comments, and images
    await connection.query('DELETE FROM user_comment_on_posts WHERE post_id = ?', [id]);
    await connection.query('DELETE FROM post_image_name WHERE post_id = ?', [id]);
    await connection.query('DELETE FROM posts WHERE post_id = ?', [id]);

    res.status(200).json({ message: 'Post deleted successfully' });
  } catch (error) {
    console.error('Error deleting post:', error);
    res.status(500).json({ message: 'Server error deleting post' });
  }
};

const addComment = async (req, res) => {
  const { post_id, comment_content, email: user_email } = req.body;

  try {
    // Check if user has already commented
    const [existingComment] = await connection.query(
      'SELECT * FROM user_comment_on_posts WHERE post_id = ? AND user_email = ?',
      [post_id, user_email]
    );
    if (existingComment.length > 0) {
      return res.status(400).json({ message: 'You have already commented on this post' });
    };

    // Add comment
    await connection.query(
      'INSERT INTO user_comment_on_posts (post_id, user_email, comment_content) VALUES (?, ?, ?)',
      [post_id, user_email, comment_content]
    );

    res.status(201).json({ message: 'Comment added successfully' });
  } catch (error) {
    console.error('Error adding comment:', error);
    res.status(500).json({ message: 'Server error adding comment' });
  }
};

const updateComment = async (req, res) => {
  const { post_id, comment_content, email: user_email } = req.body;

  try {
    // Verify comment ownership
    const [comment] = await connection.query(
      'SELECT * FROM user_comment_on_posts WHERE post_id = ? AND user_email = ?',
      [post_id, user_email]
    );
    if (comment.length === 0) {
      return res.status(404).json({ message: 'Comment not found or unauthorized' });
    }

    // Update comment
    await connection.query(
      'UPDATE user_comment_on_posts SET comment_content = ?, createdAt = NOW() WHERE post_id = ? AND user_email = ?',
      [comment_content, post_id, user_email]
    );

    res.status(200).json({ message: 'Comment updated successfully' });
  } catch (error) {
    console.error('Error updating comment:', error);
    res.status(500).json({ message: 'Server error updating comment' });
  }
};

const deleteComment = async (req, res) => {
  const { post_id, commenter_email } = req.body;
  // const user_email = req.user.email;

  try {
    // Check if user is the commenter or post author
    /* const [post] = await connection.query(
      'SELECT user_email FROM posts WHERE post_id = ?',
      [post_id]
    );
    if (post.length === 0) {
      return res.status(404).json({ message: 'Post not found' });
    } */

    // const isPostAuthor = post[0].user_email === user_email;
    // const isCommenter = commenter_email === user_email;

    /* if (!isPostAuthor && !isCommenter) {
      return res.status(403).json({ message: 'Unauthorized to delete this comment' });
    } */

    // Delete comment
    await connection.query(
      'DELETE FROM user_comment_on_posts WHERE post_id = ? AND user_email = ?',
      [post_id, commenter_email]
    );

    res.status(200).json({ message: 'Comment deleted successfully' });
  } catch (error) {
    console.error('Error deleting comment:', error);
    res.status(500).json({ message: 'Server error deleting comment' });
  }
};

module.exports = {
  getAllPosts,
  createPost,
  getPostById,
  // updatePost,
  deletePost,
  addComment,
  updateComment,
  deleteComment,
};