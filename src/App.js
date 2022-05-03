import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';

import Layout from "./app/layouts/default";

const Board = lazy(() => import('./app/pages/board'));
const NoMatch = lazy(() => import('./app/pages/nomatch'));

function App() {
  return (
      <Suspense fallback={<div>Loading...</div>}>
          <Routes>
              <Route path="/" element={<Layout />}>
                  <Route index element={<Board />} />
                  <Route path="*" element={<NoMatch />} />
              </Route>
          </Routes>
      </Suspense>
  );
}

export default App;
