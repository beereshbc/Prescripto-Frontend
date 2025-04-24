import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import AppContectProvider from "./context/AppContext.jsx";
import ContextProvider from "./context/context.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AppContectProvider>
      <ContextProvider>
        <App />
      </ContextProvider>
    </AppContectProvider>
  </BrowserRouter>
);
