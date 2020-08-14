import React from 'react';
import Hero from './hero/Hero';
import Dojo from './Dojo';
import About from './about/About';
import Contact from './contact/Contact';
import Pricing from './Pricing';

const Main = () => {

  return (
      <div id="main">
        <Hero />
        <Dojo />
        <About />
        <Pricing />
        <Contact />
      </div>
  )
};

export default Main;
