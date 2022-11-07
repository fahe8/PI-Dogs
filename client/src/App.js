import React from "react";
import "./App.css";
import { Route, Switch } from "react-router-dom";
import Home from "./components/Home/Home";
import Create from "./components/Create/Create";
import Detail from "./components/Detail/Detail";
import Ladding from "./components/Ladding/Ladding";
import { useDispatch } from "react-redux";
import { getDogs, getTemperaments } from "./redux/actions";

function App() {
  let dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(getDogs());
    dispatch(getTemperaments());
  }, [dispatch]);

  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={Ladding}></Route>
        <Route path="/home" component={Home}></Route>
        <Route path="/detail/:id" component={Detail}></Route>
        <Route path="/create" component={Create}></Route>
      </Switch>
    </div>
  );
}

export default App;
