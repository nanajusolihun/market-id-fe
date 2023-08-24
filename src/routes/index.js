import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";

// IMPORT COMPONENT, LAYOUT, RAGE AND AUTH
import App from "../App";

// LAYOUT CUSTOMER
import LayoutProducts from "../layouts/LayoutProducts";

// LAYOUT CARTS
import LayoutCarts from "../layouts/LayoutCarts";
import Invoices from "../pages/Invoices";

// LAYOUT AUTH
import LayoutAuth from "../layouts/LayoutAuth";

// PAGE CUSTOMER
import Login from "../pages/Login";
import Register from "../pages/Register";
import Products from "../pages/Products";
import Carts from "../pages/Carts";

// Negative Page
import Error from "../pages/Error";
import store from "../stores";

const { auth } = store.getState();

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<App />}>
      {/* PRODUCT */}
      <Route
        element={
          <LayoutAuth auth={auth}>
            <LayoutProducts />
          </LayoutAuth>
        }
      >
        <Route path="/" element={<Products />} />
      </Route>

      {/* CARTS */}
      <Route
        element={
          <LayoutAuth auth={auth}>
            <LayoutCarts />
          </LayoutAuth>
        }
      >
        <Route path="/cart" element={<Carts />} />
        <Route path="/invoice/:code" element={<Invoices />} />
      </Route>

      {/* PAGE LOGIN && REGISTER */}
      <Route
        element={
          <LayoutAuth auth={auth}>
            <App />
          </LayoutAuth>
        }
      >
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>

      {/* NEGATIVE PAGE && 404 */}
      <Route path="*" element={<Error />} />
    </Route>
  )
);

export default router;
