import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "@fontsource-variable/plus-jakarta-sans";
import "./styles/index.css";
import { App } from "./App";
import { DemoDataProvider } from "./data/DemoDataProvider";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <DemoDataProvider>
        <App />
      </DemoDataProvider>
    </BrowserRouter>
  </StrictMode>,
);
