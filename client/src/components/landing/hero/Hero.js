import React from 'react';

const Hero = () => {
  return (
    <div className="landing" id="home">
      <div className="hero-banner">
        <div className="banner-bg">
        <div className="banner-text">
          <img src={require('../../../assets/logo-transparent.png')} className="hero-img" alt="sparring" />
          <span className="title mfc-title banner-text banner-header">MODERN FIGHTING CONCEPTS</span>
          <h2 className="subtitle">Dojo & Online University</h2>
          <div className="banner-buttons">
            <div
              className="banner-button"
              onClick={() => {
                document.getElementById('dojo').scrollIntoView({behavior: 'smooth'})
              }}>
                About Us
            </div>
          </div>
          </div>
        </div>
        </div>
    </div>
  )
};

export default Hero;
