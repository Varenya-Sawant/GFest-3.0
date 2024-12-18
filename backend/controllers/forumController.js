let posts = [
  {
    id: Date.now(),
    title: "Welcome to the Forum",
    description: "This is a sample post for testing purposes.",
    image_urls: [],
    fullname: "John Doe",
    created_at: new Date(),
    comments: [
      {
        id: Date.now() + 1,
        user: "John Doe",
        comment: "This is a sample comment",
        created_at: new Date(),
      },
    ],
  },
];

// Fetch all posts
const getPosts = (req, res) => {
  res.status(200).json(posts);
};

// Submit a new post
const addPost = (req, res) => {
  const { title, description, image_urls, fullname } = req.body;

  const newPost = {
    id: Date.now(),
    title,
    description,
    image_urls,
    fullname,
    created_at: new Date(),
    comments: [],
  };

  posts.push(newPost);

  res.status(201).json(newPost);
};

// Delete a post
const deletePost = (req, res) => {
  const { id } = req.params;
  posts = posts.filter((post) => post.id !== parseInt(id));
  res.status(200).json({ message: "Post deleted" });
};

// Add a comment to a post
const addComment = (req, res) => {
  const { postId } = req.params;
  const { user, comment } = req.body;

  const post = posts.find((p) => p.id === parseInt(postId));

  if (post) {
    const newComment = {
      id: Date.now(),
      user,
      comment,
      created_at: new Date(),
    };
    post.comments.push(newComment);
    res.status(201).json(newComment);
  } else {
    res.status(404).json({ message: "Post not found" });
  }
};

// Edit a comment
const editComment = (req, res) => {
  const { postId, commentId } = req.params;
  const { comment } = req.body;

  const post = posts.find((p) => p.id === parseInt(postId));

  if (post) {
    const existingComment = post.comments.find(
      (c) => c.id === parseInt(commentId)
    );

    if (existingComment) {
      existingComment.comment = comment;
      res.status(200).json(existingComment);
    } else {
      res.status(404).json({ message: "Comment not found" });
    }
  } else {
    res.status(404).json({ message: "Post not found" });
  }
};

// Delete a comment
const deleteComment = (req, res) => {
  const { postId, commentId } = req.params;

  const post = posts.find((p) => p.id === parseInt(postId));

  if (post) {
    post.comments = post.comments.filter(
      (comment) => comment.id !== parseInt(commentId)
    );
    res.status(200).json({ message: "Comment deleted" });
  } else {
    res.status(404).json({ message: "Post not found" });
  }
};

module.exports = {
  getPosts,
  addPost,
  deletePost,
  addComment,
  editComment,
  deleteComment,
};
