import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Loading from "./components/Loading";
import { useSelector } from "react-redux";

import "./assets/css/app.css";
import "react-toastify/dist/ReactToastify.css";
import "./assets/css/loading.css";

const App = () => {
  const { isLoading } = useSelector((state) => state.loading);
  return (
    <>
      {isLoading && <Loading />}
      <ToastContainer />
      <main className="app__main">
        <Outlet />;
      </main>
    </>
  );
};

export default App;
