import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";

// IMPORT COMPONENT, LAYOUT, RAGE AND AUTH
import App from "../App";
import Home from "../pages/Home";
import About from "../pages/About";
import Error from "../pages/Error";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<App />}>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="*" element={<Error />} />
    </Route>
  )
);

export default router;
