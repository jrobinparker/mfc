import React from 'react';
import NavLink from './NavLink';

const Nav = () => {

  const app = document.body

  function setNavStyle() {
    const scrollPercent = window.scrollY / 1000
    const nav = document.querySelector(".navbar")
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

  app.onscroll = () => {
    setNavStyle()
  }

  return (
    <nav className="navbar">
        <img src={require('../../../assets/logo-transparent.png')} className="logo" alt="logo"/>
        <NavLink link={'MFC Online'} id={'home'} />
        <div className="nav-links">
          <NavLink link={'About'} id={'message'} />
          <NavLink link={'Registration'} id={'register'} />
          <NavLink link={'Contact'} id={'contact'} />
        </div>
    </nav>
  )
}

export default Nav;
