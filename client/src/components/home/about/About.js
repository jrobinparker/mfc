import React from 'react';
import StyleIcon from './StyleIcon';
import VisibilitySensor from 'react-visibility-sensor';

class About extends React.Component {
  state = {
    visible: false
  }

  render() {
    if (this.state.visible) {
      const aboutStyles = document.querySelectorAll('.about-styles')
      aboutStyles.forEach(as => {
        as.classList.remove('hidden');
        as.classList.add('fade-in-up');
      })
    }

  return (
    <VisibilitySensor
      PartialVisibility
      onChange={isVisible => {
        this.setState({
          visible: isVisible
        })
      }}>
    <div className="about" id="about">
      <div className="about-img">
        <img src={require('../../../assets/fight.jpg')} alt="fight" />
      </div>
      <div className="about-info">
      <div className="about-styles hidden">
        <StyleIcon imgSrc={'padded-fighter.svg'} styleName={'padded sticks'} />
        <StyleIcon imgSrc={'knives.svg'} styleName={'knife fighting'} />
      </div>
      <div className="about-styles hidden">
        <StyleIcon imgSrc={'forms.svg'} styleName={'forms'} />
        <StyleIcon imgSrc={'toya.svg'} styleName={'single & double sticks'} />
      </div>

      </div>
    </div>
    </VisibilitySensor>
  )
  }
}

export default About;
