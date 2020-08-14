import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Main from './components/landing/Main';
import Nav from './components/landing/nav/Nav';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Dashboard from './components/dashboard/Dashboard';
import Lessons from './components/lessons/Lessons';
import Lesson from './components/lessons/lesson/Lesson';
import CreateLesson from './components/lessons/CreateLesson';
import EditLesson from './components/lessons/EditLesson';
import Tracks from './components/tracks/Tracks';
import Track from './components/tracks/track/Track';
import CreateTrack from './components/tracks/CreateTrack';
import EditTrack from './components/tracks/EditTrack';
import AdminView from './components/admin/AdminView';
import Alert from './components/alerts/Alert';
import PrivateRoute from './components/routing/PrivateRoute';
import { loadUser } from './actions/auth';
import setAuthToken from './utils/setAuthToken';
import { Provider } from 'react-redux';
import store from './store';
import 'bulma';
import '@fortawesome/fontawesome-free';
import './App.css';

if (localStorage.token) {
  setAuthToken(localStorage.token)
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);


  return (
    <Provider store={store}>
      <Router>
        <Fragment>
            <Nav />
            <Route exact path="/" component={Main} />
              <Alert />
              <Switch>
                <Route exact path="/register" component={Register} />
                <PrivateRoute exact path="/dashboard" component={Dashboard} />
                <PrivateRoute exact path="/create-lesson" component={CreateLesson} />
                <PrivateRoute exact path="/lessons" component={Lessons} />
                <PrivateRoute exact path="/lesson/:id" component={Lesson} />
                <PrivateRoute exact path="/lesson/:id/edit" component={EditLesson} />
                <PrivateRoute exact path="/tracks" component={Tracks} />
                <PrivateRoute exact path="/track/:id" component={Track} />
                <PrivateRoute exact path="/create-track" component={CreateTrack} />
                <PrivateRoute exact path="/track/:id/edit" component={EditTrack} />
                <PrivateRoute exact path="/admin" component={AdminView} />
              </Switch>
        </Fragment>
      </Router>
    </Provider>
)}

export default App;
