// controllers/forumController.js
let posts = [
  {
    id: 1,
    title: "First Forum Post",
    description: "This is the first post description.",
    author: "user1",
    image: null,
    comments: [
      { id: 1, user: "user2", text: "Great post!" },
      { id: 2, user: "user3", text: "I agree, great topic." },
    ],
  },
  {
    id: 2,
    title: "Second Forum Post",
    description: "This is another post description.",
    author: "user2",
    image: null,
    comments: [],
  },
];

// Fetch all posts
const getAllPosts = (req, res) => {
  res.status(200).json(posts);
};

// Create a new post
const createPost = (req, res) => {
  const { title, description, author, image } = req.body;

  const newPost = {
    id: posts.length + 1,
    title,
    description,
    author,
    image,
    comments: [],
  };

  posts.push(newPost);
  res.status(201).json(newPost);
};

// Add a comment
const addComment = (req, res) => {
  const { postId } = req.params;
  const { user, text } = req.body;

  const post = posts.find((p) => p.id === parseInt(postId));
  if (post) {
    const newComment = { id: post.comments.length + 1, user, text };
    post.comments.push(newComment);
    res.status(201).json(newComment);
  } else {
    res.status(404).json({ error: "Post not found" });
  }
};

module.exports = {
  getAllPosts,
  createPost,
  addComment,
};
