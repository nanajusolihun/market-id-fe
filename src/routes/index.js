import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";

// IMPORT COMPONENT, LAYOUT, RAGE AND AUTH
import App from "../App";

// CUSTOMER
import Login from "../pages/Login";
import Register from "../pages/Register";
import Home from "../pages/Home";

// Negative Page
import Error from "../pages/Error";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<App />}>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="*" element={<Error />} />
    </Route>
  )
);

export default router;
