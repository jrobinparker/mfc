import React from 'react';
import gsap from 'gsap';
import { Power1 } from 'gsap';
import VisibilitySensor from 'react-visibility-sensor';

class Dojo extends React.Component {
  state = {
    visible: false
  }

  render() {
    if (this.state.visible) {
      const pricing = document.querySelector('.dojo')
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
      <div className="dojo hidden" id="dojo">
          <div className="dojo-img">
            <span className="title mfc-title">THE DOJO</span>
            <div className="dojo-about">
              <h1>20 years teaching martial arts to the community</h1>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi fringilla risus dui, eget porta eros consectetur quis. Vestibulum neque libero, rhoncus quis tincidunt in, interdum sit amet nibh. Nullam ac elit aliquam, malesuada enim eu, pharetra diam. Pellentesque vitae odio sit amet augue vehicula ullamcorper. Vivamus ut semper elit. Quisque pellentesque posuere magna in scelerisque. Proin ipsum leo, commodo sed dignissim id, pretium a lectus. Donec purus mauris, ornare et felis ac, malesuada commodo justo. Pellentesque ultrices nulla ut finibus luctus.</p>
            </div>
          </div>
        </div>
      </VisibilitySensor>
  )
  }
}

export default Dojo;
