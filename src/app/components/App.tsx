// src/App.tsx
import React, { useState, useEffect } from 'react';
import api from '../../services/api';

interface Post {
  id: string;
  title: string;
  content: string;
}

const App: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    // Fazer requisição GET ao carregar o componente
    api.get('/posts').then((response) => {
      setPosts(response.data);
    });
  }, []);

  const handleAddPost = async () => {
    // Fazer requisição POST para adicionar um novo post
    const newPost = { title: 'New Post', content: 'New Content' };
    const response = await api.post('/posts', newPost);
    setPosts([...posts, response.data]);
  };

  return (
    <div>
      <h1>Posts</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <strong>{post.title}</strong>
            <p>{post.content}</p>
          </li>
        ))}
      </ul>
      <button onClick={handleAddPost}>Adicionar Post</button>
    </div>
  );
};

export default App;

