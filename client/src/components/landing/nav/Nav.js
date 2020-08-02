import React, { Fragment, useState } from 'react';
import NavLink from './NavLink';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../../actions/auth';
import Menu from './Menu';
import AuthModal from '../../auth/AuthModal';

const Nav = ({ auth: { isAuthenticated, loading, user }, logout }) => {
  const [ modal, toggleModal ] = useState(false);

  const authLinks = (
    <Fragment>
      <Menu logout={logout} toggleModal={toggleModal} />
    </Fragment>
  );

  const guestLinks = (
    <div className="guest-links">
      <NavLink link={'About'} id={'message'} />
      <NavLink link={'Pricing'} id={'pricing'} />
      <NavLink link={'Contact'} id={'Contact'} />
      <span className="nav-brand" onClick={() => toggleModal(true)}>Login / Sign Up</span>
    </div>
  )

  const app = document.body

  function setNavStyle() {
    const scrollPercent = window.scrollY / 1000
    const nav = document.querySelector(".mfc-navbar")
    const logo = document.querySelector(".logo")
    if (scrollPercent >= .75) {
      nav.style.backgroundColor = 'rgba(255,255,255,1)';
      nav.style.boxShadow = '0px 0px 21px 0px rgba(10,10,10,.25)';
      nav.style.color = 'black'
      logo.width = '50'
    } else if (scrollPercent >= .5 ){
      nav.style.backgroundColor = `rgba(255,255,255,${scrollPercent})`;
      nav.style.boxShadow = `0px 0px 21px 0px rgba(10,10,10,${scrollPercent})`;
      nav.style.color = 'black'
      logo.width = '50'
    } else {
      nav.style.backgroundColor = `rgba(255,255,255,${scrollPercent})`;
      nav.style.boxShadow = `0px 0px 21px 0px rgba(10,10,10,${scrollPercent})`;
      nav.style.color = 'white'
    }
  }

  // app.onscroll = () => {
    // setNavStyle()
  // }

  return (
    <nav className="mfc-navbar">
        <img src={require('../../../assets/logo-transparent.png')} className="logo" alt="logo"/>
        <NavLink link={'MFC Online'} id={'home'} />
        { isAuthenticated ? authLinks : guestLinks }
        { !modal ? <></> : <AuthModal toggleModal={toggleModal} /> }
    </nav>
  )
}

Nav.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(mapStateToProps, { logout })(Nav);
