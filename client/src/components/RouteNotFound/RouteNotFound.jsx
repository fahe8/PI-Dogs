import React from "react";
import { useHistory } from "react-router-dom";
import NotFound from "../NotFound/NotFound";
import "./routenotfound.css";
const RouteNotFound = () => {
  let history = useHistory();
  const handleHistory = () => {
    history.push("/home");
  };
  return (
    <div className="notfoundroute">
      <NotFound
        text={"The page you’re looking for does not exist."}
        btnText={"Home"}
        handleClick={handleHistory}
      ></NotFound>
    </div>
  );
};

export default RouteNotFound;
