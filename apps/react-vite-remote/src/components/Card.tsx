import React, { useState } from 'react';
import './Card.css';

const Card: React.FC = () => {
  const [likes, setLikes] = useState(0);

  return (
    <div className="vite-card">
      <h3>React + Vite Card</h3>
      <p>This component is built with Vite (not Rsbuild)</p>
      <div className="card-content">
        <span className="likes-count">❤️ {likes} likes</span>
        <button onClick={() => setLikes(likes + 1)}>Like</button>
      </div>
      <small>Running on port 3004</small>
    </div>
  );
};

export default Card;
