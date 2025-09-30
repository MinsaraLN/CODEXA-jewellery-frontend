/*import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(<App />);*/


import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

async function prepare() {
    if (import.meta.env.VITE_USE_MOCK === '1') {
      const { worker } = await import('./mocks/browser');
      await worker.start({
        onUnhandledRequest: 'bypass',
        serviceWorker: {
          // use the file we placed in /public
          url: '/mockServiceWorker.js',
        },
      });
      console.info('[MSW] Mock API started');
    }
  }
  

prepare().then(() => {
  createRoot(document.getElementById("root")!).render(<App />);
});
