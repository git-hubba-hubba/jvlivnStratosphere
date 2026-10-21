import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import LionEntrance from "./components/entrance/LionEntrance";
import "./responsive.css";
import AuthProvider from "./components/account/AuthProvider";
import AuthGate from "./components/account/AuthGate";
import "./frost.css";
import "./neon.css";

try{document.documentElement.dataset.theme=localStorage.getItem('jvl-theme')==='neon'?'neon':'light';}catch{/* Use the default palette when storage is unavailable. */}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Router>
      <LionEntrance><AuthProvider><AuthGate><App /></AuthGate></AuthProvider></LionEntrance>
    </Router>
  </StrictMode>
);
