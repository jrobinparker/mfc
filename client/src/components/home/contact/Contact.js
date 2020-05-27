import React from 'react';
import SocialLink from './SocialLink';

const Contact = () => {
  return (
    <div className="contact" id="contact">
      <h1>Contact Us</h1>
      <div className="contact-info">
        <div className="address-container">
          <div className="address">
          <h2>MODERN FIGHTING CONCEPTS</h2>
          <p>126 New Jersey Ave</p>
          <p>Absecon, NJ 08201</p>
          <p>609-646-2113</p>
          </div>
          <div className="contact-social">
            <SocialLink link={'http://www.facebook.com/abseconmartialarts/'} imgSrc={'facebook.svg'} />
            <SocialLink link={'http://mfcmma.com/contact.html'} imgSrc={'youtube.svg'} />
            <SocialLink link={'http://www.instagram.com/joeparkerjr53'} imgSrc={'instagram.svg'} />
          </div>
          <div className="contact-footer">
            <div style={{ marginBottom: '10px' }}>copyright 2019 modern fighting concepts & jeremy parker</div>
            <div>Icons made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank" rel="noopener noreferrer">CC 3.0 BY</a></div>
          </div>
        </div>
        <div className="contact-img">
          <img src={require('../../../assets/contact.jpg')} alt="contact-img"/>
        </div>
      </div>
    </div>
  )
}

export default Contact;
