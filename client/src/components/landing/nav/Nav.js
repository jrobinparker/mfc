import React, { Fragment } from 'react';
import NavLink from './NavLink';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../../actions/auth';

const Nav = ({ auth: { isAuthenticated, loading }, logout }) => {

  const authLinks = (
    <div className="nav-links">
      <Link to={'/lessons'} className="nav-brand">Lessons</Link>
      <Link to={'/tracks'} className="nav-brand">Tracks</Link>
      <Link onClick={logout} className="nav-brand">Logout</Link>
    </div>
  );

  const guestLinks = (
    <div className="nav-links">
      <NavLink link={'About'} id={'message'} />
      <NavLink link={'Pricing'} id={'pricing'} />
      <NavLink link={'Contact'} id={'Contact'} />
      <Link to={'/login'} className="nav-brand" style={{ color: 'white', cursor: 'pointer' }}>Login</Link>
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
        { !loading && (<Fragment>{ isAuthenticated ? authLinks : guestLinks }</Fragment>)}
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
