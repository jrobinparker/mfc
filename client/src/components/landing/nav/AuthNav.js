import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../../actions/auth';
import NavLink from './NavLink';
import Menu from './Menu';

const AuthNav = ({ auth: { isAuthenticated, loading, user }, logout }) => {
  const [ modal, toggleModal ] = useState(false);

  return (
    <nav className="mfc-navbar auth-nav">
        <img src={require('../../../assets/logo-transparent.png')} className="logo" alt="logo"/>
        <NavLink link={'Modern Fighting Concepts'} id={'home'} />
        <Menu logout={logout} toggleModal={toggleModal} />
    </nav>
  )
}

AuthNav.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(mapStateToProps, { logout })(AuthNav);
