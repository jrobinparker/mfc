import React from 'react';

const Home = () => {
  return (
    <div className="landing" id="home">
      <div className="hero-banner">
        <div className="banner-bg">
        <div className="banner-text">
          <img src={require('../../assets/logo-transparent.png')} className="hero-img" alt="sparring" />
          <h1 className="title">Modern Fighting Concepts</h1>
          <h2 className="subtitle">Online</h2>
          <div className="banner-buttons">
            <div
              className="banner-button"
              onClick={() => {
                document.getElementById('message').scrollIntoView({behavior: 'smooth'})
              }}>
                About
            </div>
            <div
              className="banner-button"
              id="reg-button"
              onClick={() => {
                document.getElementById('register').scrollIntoView({behavior: 'smooth'})
              }}>
                Register
            </div>
          </div>
          </div>
        </div>
        </div>
    </div>
  )
}

export default Home;
