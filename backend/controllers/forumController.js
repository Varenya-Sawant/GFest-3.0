let dummyPosts = [
    {
      id: 1,
      title: "Sample Post 1",
      description: "This is the first dummy post",
      image_urls: [],
      fullname: "John Doe",
      created_at: new Date().toISOString(),
    },
  ];
  
  const getAllPosts = (req, res) => {
    res.json(dummyPosts);
  };
  
  const createPost = (req, res) => {
    const { title, description, fullname } = req.body;
    const newPost = {
      id: dummyPosts.length + 1,
      title,
      description,
      image_urls: req.body.image_urls,
      fullname,
      created_at: new Date().toISOString(),
    };
    dummyPosts.push(newPost);
    res.status(201).json(newPost);
  };
  
  const deletePost = (req, res) => {
    const { postId } = req.params;
    dummyPosts = dummyPosts.filter((post) => post.id !== parseInt(postId));
    res.status(200).json({ message: "Post deleted successfully" });
  };
  
  module.exports = {
    getAllPosts,
    createPost,
    deletePost,
  };
  