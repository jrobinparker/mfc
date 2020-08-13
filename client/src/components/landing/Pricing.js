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
      <div className="pricing" id="pricing">
          <span className="title mfc-title pricing-header">MEMBERSHIP & PRICING</span>
          <div className="features">
            <div className="feature">
              <div className="feature-img">
                <img src={require('../../assets/about-img.jpg')} />
              </div>
              <h1 className="title mfc-title feature-header">DOJO MEMBERSHIP</h1>
                <div>
                  $150 a month
                </div>
                <ul>
                  <li>Item 1</li>
                  <li>Item 2</li>
                  <li>Item 3</li>
                  <li>Item 4</li>
                  <li>Item 5</li>
                </ul>
                <div>
                  <span
                    onClick={
                      () => document.getElementById('contact').scrollIntoView({behavior: 'smooth'})
                    }
                    style={{ textDecoration: 'underline', cursor: 'pointer' }}
                    >Contact</span> the dojo for membership
                </div>
            </div>
            <div className="feature">
            <div className="feature-img">
              <img src={require('../../assets/monitor.jpg')} id="monitor"/>
            </div>
              <h1 className="title mfc-title feature-header">ONLINE UNIVERSITY MEMBERSHIP</h1>
                <div>
                  $20 a month
                </div>
                <ul>
                  <li>Item 1</li>
                  <li>Item 2</li>
                  <li>Item 3</li>
                  <li>Item 4</li>
                  <li>Item 5</li>
                </ul>
                <div>
                  Click Sign Up to get started
                </div>
            </div>
          </div>
      </div>
  )
  }
}

export default Pricing;
