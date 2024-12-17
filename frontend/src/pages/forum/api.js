let posts = [];
let comments = {};

// Simulates fetching posts
export const fetchPosts = async () => posts;

// Simulates adding a new post
export const addPost = async (post) => {
  posts.push(post);
  return { success: true, posts };
};

// Simulates deleting a post
export const deletePost = async (postId) => {
  posts = posts.filter((p) => p.id !== postId);
  delete comments[postId];
  return { success: true };
};

// Simulates adding a comment
export const addComment = async (postId, comment) => {
  if (!comments[postId]) comments[postId] = [];
  comments[postId].push(comment);
  return { success: true };
};

// Simulates deleting a comment
export const deleteComment = async (postId, commentId) => {
  comments[postId] = comments[postId].filter((c) => c.id !== commentId);
  return { success: true };
};

// Simulates editing a comment
export const editComment = async (postId, commentId, newText) => {
  const index = comments[postId]?.findIndex((c) => c.id === commentId);
  if (index !== undefined && index >= 0) {
    comments[postId][index].comment = newText;
    comments[postId][index].edited_at = new Date();
    return { success: true };
  }
  return { success: false };
};
