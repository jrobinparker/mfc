import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Main from './components/landing/Main';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import 'bulma';
import './App.css';

const App = () => (
  <Router>
    <Fragment>
        <Route exact path="/" component={Main} />
        <div className="container">
          <Switch>
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
          </Switch>
          </div>
    </Fragment>
  </Router>
)

export default App;
