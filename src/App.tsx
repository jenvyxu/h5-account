import React, { useEffect } from "react";
import {
  HashRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import { bindActionCreators, Dispatch } from 'redux';
import Money from 'view/Money';
import Statistics from 'view/Statistics';
import Tags from 'view/Tags';
import NoMatch from 'view/NoMatch';
import styled from 'styled-components';
import {Tag} from './view/Tag';
import AddTag from './view/AddTag';
import {Home} from './view/Home';

const AppWrapper = styled.div`
  color: #333;
`
type Props = {

}
const App: React.FC<Props> = () => {
  return (
    <AppWrapper>
      <Router>
        <Switch>
          <Route exact path="/home">
            <Home />
          </Route>
          <Route exact path="/money">
            <Money />
          </Route>
          <Route exact path="/statistics">
            <Statistics />
          </Route>
          <Route exact path="/tags">
            <Tags />
          </Route>
          <Route exact path="/tags/add">
            <AddTag />
          </Route>
          <Route exact path="/tags/:id">
            <Tag />
          </Route>
          <Route exact path="/">
            <Redirect to='/home' />
          </Route>
          <Route path="*">
            <NoMatch />
          </Route>
        </Switch>
      </Router>
    </AppWrapper>
  );
}

export default App;