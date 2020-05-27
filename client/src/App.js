import React, { Fragment } from 'react';
import Nav from './components/home/nav/Nav';
import Home from './components/home/Home';
import Message from './components/home/Message';
import About from './components/home/about/About';
import Register from './components/home/Register';
import Contact from './components/home/contact/Contact';
import './App.css';

const App = () =>
    <Fragment>
      <Nav />
      <div className="container content">
        <Home />
      </div>
    </Fragment>

export default App;
