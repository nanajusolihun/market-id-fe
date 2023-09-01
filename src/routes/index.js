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
import Profile from "../pages/Profile";
import History from "../pages/History";
import Address from "../pages/Address";
import CreateFormAddress from "../components/FormAddress/Create";
import EditFormAddress from "../components/FormAddress/Edit";

// Negative Page
import Error from "../pages/Error";
import store from "../stores";
import LayoutCustomerProfile from "../layouts/LayoutCustomerProfile";

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

      {/* CARTS, INVOICE */}
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

      {/* CUSTOMER PROFILE */}
      <Route element={<LayoutAuth auth={auth} children={<LayoutCustomerProfile />} />}>
        <Route path="/profile" element={<Profile />} />
        <Route path="/history" element={<History />} />
        <Route path="/address" element={<Address />} />
        <Route path="/address/create" element={<CreateFormAddress />} />
        <Route path="/address/edit/:id" element={<EditFormAddress />} />
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
