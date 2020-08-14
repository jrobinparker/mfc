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
      const menu = document.getElementById('menu')
      const navMenu = document.querySelector('.nav-menu')
      const icon = document.getElementById('menu-icon')
      if (window.innerWidth > 680) {
        menu.classList.remove('mobile-menu')
        menu.classList.add('nav-menu')
        if (!this.state.expand) {
          icon.classList.toggle('change-icon')
          gsap.to(navMenu, .25, {x: 0})
        } else {
          icon.classList.toggle('change-icon')
          gsap.to(navMenu, .25, {x: 500})
        }
      } else {
        menu.classList.remove('nav-menu')
        menu.classList.add('mobile-menu')
        if (!this.state.expand) {
          icon.classList.toggle('change-icon')
          gsap.to(menu, .25, {y: 0})
        } else {
          icon.classList.toggle('change-icon')
          gsap.to(menu, .25, {y: -1000})
        }
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
        <div className="nav-menu" id="menu">
          <MenuLinks toggleMenu={() => this.toggleMenu()} expandMenu={() => this.expandMenu()} logout={this.props.logout} toggleModal={this.props.toggleModal}/>
        </div>
      </Fragment>
    )
  }
};

export default Menu;
