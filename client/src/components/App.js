import React from "react";
import GlobalStyles from "./GlobalStyles";
import Home from "./Home";
import TSX from "./TSX";
import NYSE from "./NYSE";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

const App = () => {
  //import data from API here
  // in the meantime, create false data

  return (
    <>
      <GlobalStyles />
      <Router>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/tsx">
            <TSX />
          </Route>
          <Route path="/nyse">
            <NYSE />
          </Route>
        </Switch>
      </Router>
    </>
  );
};

export default App;
