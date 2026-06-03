import React, { Suspense, lazy } from "react";
import "./App.css";

// Rsbuild remotes
const ReactButton = lazy(() => import("reactRemote/Button"));
const VueCounter = lazy(() => import("vueRemote/Counter"));
const SvelteCard = lazy(() => import("svelteRemote/Card"));

// Vite remotes (using @module-federation/vite - compatible!)
const ReactViteCard = lazy(() => import("reactViteRemote/Card"));
const VueViteTimeline = lazy(() => import("vueViteRemote/Timeline"));
const SvelteViteDashboard = lazy(() => import("svelteViteRemote/Dashboard"));

const App: React.FC = () => {
  return (
    <div className="app">
      <header className="header">
        <h1>Module Federation 2.0 Shell</h1>
        <p>Orchestrating React, Vue, and Svelte Micro-Frontends with Multiple Build Tools</p>
      </header>

      <main className="main">
        <div className="build-group">
          <h2 className="build-title">🔧 Rsbuild Remotes</h2>
          <div className="sections-grid">
            <section className="section">
              <h3>React Remote</h3>
              <Suspense fallback={<div>Loading...</div>}>
                <ReactButton />
              </Suspense>
            </section>

            <section className="section">
              <h3>Vue Remote</h3>
              <Suspense fallback={<div>Loading...</div>}>
                <VueCounter />
              </Suspense>
            </section>

            <section className="section">
              <h3>Svelte Remote</h3>
              <Suspense fallback={<div>Loading...</div>}>
                <SvelteCard />
              </Suspense>
            </section>
          </div>
        </div>

        <div className="build-group">
          <h2 className="build-title">⚡ Vite Remotes</h2>
          <div className="sections-grid">
            <section className="section">
              <h3>React Vite</h3>
              <Suspense fallback={<div>Loading...</div>}>
                <ReactViteCard />
              </Suspense>
            </section>

            <section className="section">
              <h3>Vue Vite</h3>
              <Suspense fallback={<div>Loading...</div>}>
                <VueViteTimeline />
              </Suspense>
            </section>

            <section className="section">
              <h3>Svelte Vite</h3>
              <Suspense fallback={<div>Loading...</div>}>
                <SvelteViteDashboard />
              </Suspense>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
