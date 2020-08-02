import React, {Fragment} from 'react';
import gsap from 'gsap';
import MenuLinks from './MenuLinks';

class Menu extends React.Component {
  state = {
    expand: false
  };

  toggleMenu() {
    this.setState({
      expand: !this.state.expand
    })
  };

  expandMenu() {
      const menu = document.querySelector('.nav-menu')
      const icon = document.getElementById('menu-icon')
      if (!this.state.expand) {
        icon.classList.toggle('change-icon')
        gsap.to(menu, .25, {x: 0})
      } else {
        icon.classList.toggle('change-icon')
        gsap.to(menu, .25, {x: 300})
      }
    };

  render() {
    return (
      <Fragment>
        <div className="menu-icon" id="menu-icon" onClick={() => {
          this.setState({
            expand: !this.state.expand
          })
          this.expandMenu()
        }}>
          <div id="line1" className="line">&nbsp;</div>
          <div id="line2" className="line">&nbsp;</div>
          <div id="line3" className="line">&nbsp;</div>
        </div>
        <div className="nav-menu" id="nav-menu">
          <MenuLinks toggleMenu={() => this.toggleMenu()} expandMenu={() => this.expandMenu()} logout={this.props.logout} toggleModal={this.props.toggleModal}/>
        </div>
      </Fragment>
    )
  }
};

export default Menu;
