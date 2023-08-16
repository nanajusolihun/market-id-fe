import React from "react";
import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";

import { RouterProvider } from "react-router-dom";
import router from "./routes/index";

import { Provider } from "react-redux";
import stores from "./stores";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

import "./assets/css/typograph.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={stores}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
