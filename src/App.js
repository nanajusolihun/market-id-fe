import { Outlet } from "react-router-dom";
import "./assets/css/app.css";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <>
      <ToastContainer />
      <main className="app__main">
        <Outlet />;
      </main>
    </>
  );
};

export default App;
