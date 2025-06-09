import { createRoot } from "react-dom/client";
import App from "./App";
import "./styles/global.css";
import "./styles/index.css";
import "./styles/dashboard-styles.css";

// Set default theme class on html element
const root = document.documentElement;
const savedTheme = localStorage.getItem('vite-ui-theme') || 'dark';
root.classList.add(savedTheme === 'system' 
  ? window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  : savedTheme
);

createRoot(document.getElementById("root")!).render(
  <App />
);
