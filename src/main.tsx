// window.global ||= window;

// declare global {
//   interface Window {
//     global: any;
//   }
// }

// if (typeof window !== "undefined") {
//   window.global = window;
// }

import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "./App.css";
import App from "./App";
import { MathJaxProvider } from "mathjax3-react";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <MathJaxProvider
      url="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-chtml.js"
      options={{
        tex: {
          inlineMath: [
            ["$", "$"],
            ["\\(", "\\)"],
          ],
        },
      }}
    >
      <App />
    </MathJaxProvider>
  </React.StrictMode>
);
