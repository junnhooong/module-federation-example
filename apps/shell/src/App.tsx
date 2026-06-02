import React, { Suspense, lazy } from 'react';
import './App.css';

const ReactButton = lazy(() => import('reactRemote/Button'));
const VueCounter = lazy(() => import('vueRemote/Counter'));
const SvelteCard = lazy(() => import('svelteRemote/Card'));

const App: React.FC = () => {
  return (
    <div className="app">
      <header className="header">
        <h1>Module Federation 2.0 Shell</h1>
        <p>Orchestrating React, Vue, and Svelte Micro-Frontends</p>
      </header>

      <main className="main">
        <section className="section">
          <h2>React Remote Component</h2>
          <Suspense fallback={<div>Loading React Button...</div>}>
            <ReactButton />
          </Suspense>
        </section>

        <section className="section">
          <h2>Vue Remote Component</h2>
          <Suspense fallback={<div>Loading Vue Counter...</div>}>
            <VueCounter />
          </Suspense>
        </section>

        <section className="section">
          <h2>Svelte Remote Component</h2>
          <Suspense fallback={<div>Loading Svelte Card...</div>}>
            <SvelteCard />
          </Suspense>
        </section>
      </main>
    </div>
  );
};

export default App;
