import React from "react";
import {
  HashRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import Money from 'view/Money';
import Statistics from 'view/Statistics';
import Tags from 'view/Tags';
import NoMatch from 'view/NoMatch';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/money">
          <Money />
        </Route>
        <Route path="/statistics">
          <Statistics />
        </Route>
        <Route path="/tags">
          <Tags />
        </Route>
        <Route path="/" exact>
          <Redirect to='/money' />
        </Route>
        <Route path="*">
          <NoMatch />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;