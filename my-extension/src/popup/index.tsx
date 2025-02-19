import React from "react";
import ReactDOM from "react-dom/client";
import "../index.css";
import App from "./App/App";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <React.StrictMode>
    <div>
      <App />
    </div>
  </React.StrictMode>
);
