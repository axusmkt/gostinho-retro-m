// Global patch to prevent "Converting circular structure to JSON" crashes caused by third-party scripts (like UTMify)
// when they try to serialize DOM elements containing React 19 internal fibers.
try {
  const originalStringify = JSON.stringify;
  JSON.stringify = function (value: any, replacer?: any, space?: any) {
    const seen = new WeakSet();
    const customReplacer = function (this: any, key: string, val: any) {
      if (key && (key.startsWith('__react') || key.startsWith('__type'))) {
        return undefined;
      }
      if (val && typeof val === 'object') {
        if (val instanceof Element || val instanceof Node) {
          return `[Element: ${val.nodeName}]`;
        }
        if (seen.has(val)) {
          return "[Circular]";
        }
        seen.add(val);
      }
      if (typeof replacer === 'function') {
        return replacer.call(this, key, val);
      }
      if (Array.isArray(replacer)) {
        return replacer.indexOf(key) !== -1 || key === "" ? val : undefined;
      }
      return val;
    };
    return originalStringify(value, customReplacer, space);
  };
} catch (e) {
  console.warn("JSON stringify patch bypassed safely:", e);
}

import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
