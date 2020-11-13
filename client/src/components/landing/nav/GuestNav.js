import React, { Fragment, useState } from 'react';
import NavLink from './NavLink';
import { Link } from 'react-router-dom';
import AuthModal from '../../auth/AuthModal';

const GuestNav = props => {
  const [ modal, toggleModal ] = useState(false);

  const app = document.body

  function setNavStyle() {
    const scrollPercent = window.scrollY / 1000
    const nav = document.querySelector(".mfc-navbar")
    const logo = document.querySelector(".logo")
    if (scrollPercent >= .75) {
      nav.style.backgroundColor = 'rgba(54,54,54,1)';
      nav.style.boxShadow = '0px 0px 21px 0px rgba(10,10,10,.25)';
      nav.style.color = 'black'
      logo.width = '50'
    } else if (scrollPercent >= .5 ){
      nav.style.backgroundColor = `rgba(54,54,54,${scrollPercent})`;
      nav.style.boxShadow = `0px 0px 21px 0px rgba(10,10,10,${scrollPercent})`;
      nav.style.color = 'black'
      logo.width = '50'
    } else {
      nav.style.backgroundColor = '';
      nav.style.boxShadow = `0px 0px 21px 0px rgba(10,10,10,${scrollPercent})`;
      nav.style.color = 'white'
    }
  }

  app.onscroll = () => {
    setNavStyle()
  }

  return (
    <nav className="mfc-navbar">
        <img src={require('../../../assets/logo-transparent.png')} className="logo" alt="logo"/>
        <NavLink link={'Modern Fighting Concepts'} id={'home'} />
        <span className="nav-brand" id="login" onClick={() => toggleModal(true)}>Login / Sign Up</span>
        { !modal ? <></> : <AuthModal toggleModal={toggleModal} /> }
    </nav>
  )
}

export default GuestNav;
