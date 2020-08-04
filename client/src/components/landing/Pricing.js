import React from 'react';
import gsap from 'gsap';
import { Power1 } from 'gsap';
import VisibilitySensor from 'react-visibility-sensor';

class Pricing extends React.Component {
  state = {
    visible: false
  }

  render() {
    if (this.state.visible) {
      const pricing = document.querySelector('.pricing')
      pricing.classList.remove('hidden');
      pricing.classList.add('fade-in');
    }

  return (
    <VisibilitySensor
      partialVisibility
      onChange={isVisible => {
        this.setState({
          visible: isVisible
        })
      }}>
      <div className="pricing hidden" id="pricing">
        <div className="container">

          <h1 className="title banner-text pricing-header">MEMBERSHIP & PRICING</h1>
          <div className="pricing-top">
            just
            <div className="price">
              $20
            </div>
            a month
          </div>
          <div className="features">
            <div className="feature">
              <div className="feature-img">
                <img src={require('../../assets/contact.jpg')} alt="contact-img"/>
              </div>
              <div className="feature-text">
                View all recorded lessons
              </div>
            </div>
            <div className="feature">
              <div className="feature-img">
                <img src={require('../../assets/greeting1.jpg')} id="gi" />
              </div>
              <div className="feature-text">
                Discounts on apparel, gis, and equipment
              </div>
            </div>
            <div className="feature">
              <div className="feature-img">
                <img src={require('../../assets/sensei-img.jpg')} alt="contact-img"/>
              </div>
              <div className="feature-text">
                Members-only Zoom training sessions
              </div>
            </div>
            <div className="feature">
              <div className="feature-img">
                <img src={require('../../assets/contact.jpg')} alt="contact-img"/>
              </div>
              <div className="feature-text">
                Early registration to MFC seminars
              </div>
            </div>
          </div>
        </div>
      </div>
      </VisibilitySensor>
  )
  }
}

export default Pricing;
