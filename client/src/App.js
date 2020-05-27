import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Main from './components/landing/Main';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Alert from './components/alerts/Alert';
import { Provider } from 'react-redux';
import store from './store';
import 'bulma';
import './App.css';

const App = () => (
  <Provider store={store}>
    <Router>
      <Fragment>
          <Route exact path="/" component={Main} />
          <div className="container">
            <Alert />
            <Switch>
              <Route exact path="/login" component={Login} />
              <Route exact path="/register" component={Register} />
            </Switch>
            </div>
      </Fragment>
    </Router>
  </Provider>
)

export default App;
