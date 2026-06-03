import React from 'react';
import Card from './components/Card';
import './App.css';

const App: React.FC = () => {
  return (
    <div className="standalone-app">
      <h1>React Vite Remote - Standalone</h1>
      <p>This remote can run independently or be consumed by the shell</p>
      <Card />
    </div>
  );
};

export default App;
