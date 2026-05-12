import React from 'react';
import './index.css';
import App from './App';

import 'antd/dist/antd.css';
import { createRoot } from 'react-dom/client';

const root = createRoot(document.getElementById('root')!);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
// If staying on React 17 (your package.json shows react 17.0.2), this should work.
// The error suggests a type mismatch. Fix by ensuring react-dom types match:
// @types/react-dom should be "17.x" not "16.x"
