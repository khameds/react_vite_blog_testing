import React from "react";
import ReactDOM from "react-dom/client";
import { Toaster } from "sonner";
import { UserProvider } from "../src/context/UserContext.jsx";

import App from "./App.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
      <UserProvider>
        <App />
        <Toaster richColors />
      </UserProvider>
   
  </React.StrictMode>
);
