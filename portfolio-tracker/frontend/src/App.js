import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css"; // Optional: If you're using custom styles or Tailwind CSS

// Create a root element for the app
const root = ReactDOM.createRoot(document.getElementById("root"));

// Render the App component inside the root element
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
