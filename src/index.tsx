import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { EditorProvider } from "./EditorContext";
import "./StaticText";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <EditorProvider>
    <App />
  </EditorProvider>
);
