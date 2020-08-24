import React from 'react';
import Slider from './Slider';

const About = ({settings}) => {
    const images = [ 'about1.jpg', 'about2.jpg', 'about4.jpg', 'about5.jpg' ]
  return (
    <div className="about" id="about">
      <span className="title mfc-title about-header">OUR PHILOSOPHY</span>
      <Slider images={images} settings={settings} />
    </div>
  )
}

export default About;
