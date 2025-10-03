import React from "react";
import ReactDOM from "react-dom/client";
import FileInfo from "./components/FileInfo";

// You can import more components here later
function App() {
  return (
    <div style={{ padding: "1rem", fontFamily: "sans-serif" }}>
      <h1>Hello from React 🎉</h1>
      <p>This React app is running inside a VS Code Webview.</p>
      <FileInfo></FileInfo>
    </div>
  );
}

// Create a root and render your app
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
