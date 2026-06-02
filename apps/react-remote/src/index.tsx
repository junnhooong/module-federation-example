import React from 'react';
import ReactDOM from 'react-dom/client';
import Button from './components/Button';

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(
  <React.StrictMode>
    <div style={{ padding: '2rem' }}>
      <h1>React Remote - Standalone Mode</h1>
      <Button />
    </div>
  </React.StrictMode>
);
