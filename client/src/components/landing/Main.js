import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getSettings } from '../../actions/settings';
import Loading from '../utils/Loading';
import Hero from './hero/Hero';
import Dojo from './Dojo';
import About from './about/About';
import Contact from './contact/Contact';
import Pricing from './Pricing';

const Main = ({ getSettings, settings: {settings, loading} }) => {
  useEffect(() => {
    getSettings();
  }, [getSettings])

  let dojoSettings = settings.slice(0, 1)
  let aboutSettings = settings.slice(1, 5)
  let priceSettings = settings.slice(5)

  return loading ? <Loading /> : (
      <div id="main">
        <Hero />
        <Dojo settings={dojoSettings} />
        <About settings={aboutSettings} />
        <Pricing settings={priceSettings} />
        <Contact />
      </div>
  )
};

const mapStateToProps = state => ({
  settings: state.settings
});

export default connect(mapStateToProps, { getSettings })(Main);
