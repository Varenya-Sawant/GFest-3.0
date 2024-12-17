let posts = [
  {
    id: 1,
    title: "First Post",
    description: "Initial forum post.",
    fullname: "John Doe",
    created_at: new Date().toISOString(),
    comments: [],
  },
  {
    id: 2,
    title: "Another Post",
    description: "Another post example.",
    fullname: "Jane Doe",
    created_at: new Date().toISOString(),
    comments: [],
  },
];

// Fetch all posts
const getAllPosts = (req, res) => {
  res.json(posts);
};

// Create a new forum post
const createPost = (req, res) => {
  const { title, description, fullname } = req.body;
  const newPost = {
    id: posts.length + 1,
    title,
    description,
    fullname,
    created_at: new Date().toISOString(),
    comments: [],
  };
  posts.push(newPost);
  res.status(201).json(newPost);
};

// Delete a post
const deletePost = (req, res) => {
  const postId = parseInt(req.params.id);
  posts = posts.filter((post) => post.id !== postId);
  res.status(200).json({ message: "Post successfully deleted!" });
};

// Add a comment
const addComment = (req, res) => {
  const postId = parseInt(req.params.id);
  const { comment, user } = req.body;

  const postIndex = posts.findIndex((post) => post.id === postId);
  if (postIndex !== -1) {
    const newComment = {
      id: Date.now(),
      user,
      comment,
      created_at: new Date().toISOString(),
      edited_at: null,
    };
    posts[postIndex].comments.push(newComment);
    res.status(201).json(newComment);
  } else {
    res.status(404).json({ message: "Post not found!" });
  }
};

// Delete a comment
const deleteComment = (req, res) => {
  const postId = parseInt(req.params.postId);
  const commentId = parseInt(req.params.commentId);

  const postIndex = posts.findIndex((post) => post.id === postId);
  if (postIndex !== -1) {
    posts[postIndex].comments = posts[postIndex].comments.filter(
      (comment) => comment.id !== commentId
    );
    res.status(200).json({ message: "Comment deleted!" });
  } else {
    res.status(404).json({ message: "Comment not found!" });
  }
};

// Edit a comment
const editComment = (req, res) => {
  const postId = parseInt(req.params.postId);
  const commentId = parseInt(req.params.commentId);
  const { newComment } = req.body;

  const postIndex = posts.findIndex((post) => post.id === postId);
  if (postIndex !== -1) {
    posts[postIndex].comments = posts[postIndex].comments.map((comment) =>
      comment.id === commentId
        ? { ...comment, comment: newComment, edited_at: new Date().toISOString() }
        : comment
    );
    res.status(200).json({ message: "Comment updated!" });
  } else {
    res.status(404).json({ message: "Comment or post not found!" });
  }
};

module.exports = {
  getAllPosts,
  createPost,
  deletePost,
  addComment,
  deleteComment,
  editComment,
};
