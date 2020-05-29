import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import Nav from './nav/Nav';
import Hero from './hero/Hero';
import { connect } from 'react-redux';
import { isAuthenticated } from '../../actions/auth';

const Main = ({ isAuthenticated }) => {

  if (isAuthenticated) {
    return <Redirect to='/dashboard' />;
  }
  return (
      <Fragment>
        <Hero />
      </Fragment>
  )
};

Main.propTypes = {
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth
})

export default connect(mapStateToProps)(Main);
