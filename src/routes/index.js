import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";

// IMPORT COMPONENT, LAYOUT, RAGE AND AUTH
import App from "../App";

// LAYOUT CUSTOMER
import LayoutProducts from "../layouts/LayoutProducts";

// PAGE CUSTOMER
import Login from "../pages/Login";
import Register from "../pages/Register";
import Products from "../pages/Products";

// Negative Page
import Error from "../pages/Error";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<App />}>
      <Route element={<LayoutProducts />}>
        <Route path="/" element={<Products />} />
      </Route>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="*" element={<Error />} />
    </Route>
  )
);

export default router;
