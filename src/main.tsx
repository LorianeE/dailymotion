import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./app/App";

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
const redirect = sessionStorage.redirect;

if (redirect) {
  delete sessionStorage.redirect;

  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  window.history.replaceState(null, "", redirect);
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
