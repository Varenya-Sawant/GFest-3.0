let dummyPosts = [
  { id: 1, title: "Post 1", description: "Description 1", image: "https://via.placeholder.com/150" },
];

const getPosts = (req, res) => res.json(dummyPosts);

const createPost = (req, res) => {
  const { title, description, image } = req.body;
  const newPost = {
    id: dummyPosts.length + 1,
    title,
    description,
    image,
  };
  dummyPosts.push(newPost);
  res.status(201).json(newPost);
};

const deletePost = (req, res) => {
  const { id } = req.params;
  dummyPosts = dummyPosts.filter((post) => post.id !== parseInt(id));
  res.status(200).send("Post deleted successfully.");
};

module.exports = { getPosts, createPost, deletePost };
