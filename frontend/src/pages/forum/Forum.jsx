import React, { useState } from "react";
import Posts from "./Posts";
import "./Forum.css";

const Forum = () => {
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState({});
  const currentUser = "John Doe";

  return (
    <div className="forum-container">
      <h1>Forums</h1>
      <Posts
        posts={posts}
        setPosts={setPosts}
        comments={comments}
        setComments={setComments}
        currentUser={currentUser}
      />
    </div>
  );
};

export default Forum;
