import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

import "./styles/utils.css";
import "./styles/navbar.css";
import "./styles/button.css";
import "./styles/input.css";
import "./styles/dialog.css";
import "./styles/form.css";
import "./styles/task.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
