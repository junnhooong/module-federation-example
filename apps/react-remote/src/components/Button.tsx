import React, { useState } from 'react';
import './Button.css';

const Button: React.FC = () => {
  const [count, setCount] = useState(0);

  return (
    <div className="react-button-container">
      <button
        className="react-button"
        onClick={() => setCount(count + 1)}
      >
        React Button - Clicked {count} times
      </button>
      <p className="framework-badge">⚛️ Built with React</p>
    </div>
  );
};

export default Button;
