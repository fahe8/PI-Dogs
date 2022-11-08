import React from "react";
import "./App.css";
import { Route, Switch } from "react-router-dom";
import Home from "./components/Home/Home";
import Create from "./components/Create/Create";
import Detail from "./components/Detail/Detail";
import Ladding from "./components/Ladding/Ladding";

import { useDispatch, useSelector } from "react-redux";
import { getDogs, getTemperaments } from "./redux/actions";
import RouteNotFound from "./components/RouteNotFound/RouteNotFound";

function App() {
  let dispatch = useDispatch();
  let loading = useSelector((state) => state.loading);
  React.useEffect(() => {
    dispatch(getDogs());
    dispatch(getTemperaments());
  }, [dispatch]);

  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={Ladding}></Route>
        <Route path="/home" component={Home}>
          {" "}
          <Home loading={loading}></Home>
        </Route>
        <Route path="/detail/:id">
          {" "}
          <Detail loading={loading}></Detail>
        </Route>
        <Route path="/create">
          <Create loading={loading}></Create>
        </Route>
        <Route path="*">
          {" "}
          <RouteNotFound></RouteNotFound>
        </Route>
      </Switch>
    </div>
  );
}

export default App;
