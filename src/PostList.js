import React, { useState } from 'react';

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);


  const loadPosts = () => {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then(response => response.json())
      .then(data => setPosts(data));
  };

  
  const loadComments = postId => {
    if (selectedPost === postId) {
       setSelectedPost(null);
    } else {
      fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`)
        .then(response => response.json())
        .then(data => setSelectedPost(postId));
    }
  };

  return (
    <div>
      <h1>Посты</h1>
      <button onClick={loadPosts}>Загрузить посты</button>
      <ul>
        {posts.map(post => (
          <li key={post.id} onClick={() => loadComments(post.id)}>
            {post.title}
            {selectedPost === post.id && (
              <ul>
                {post.comments.map(comment => (
                  <li key={comment.id}>{comment.body}</li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PostList;
