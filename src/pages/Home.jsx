import React from "react";
import { useSelector } from "react-redux";

const Home = () => {
  const { user, token } = useSelector((state) => state.auth);
  return (
    <>
      {JSON.stringify(user)}
      {JSON.stringify(token)}
    </>
  );
};

export default Home;
