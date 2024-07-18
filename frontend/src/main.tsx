import React from "react";
import { BrowserRouter } from "react-router-dom";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { NextUIProvider } from "@nextui-org/react";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <NextUIProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </NextUIProvider>
  </React.StrictMode>
);
