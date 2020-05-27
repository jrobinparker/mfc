import React from 'react';

const NavLink = props => {
  const { link, id } = props
  return (
    <div
      className="nav-brand"
      onClick={() => {
        document.getElementById(`${id}`).scrollIntoView({behavior: 'smooth'})
      }}>
        {link}
    </div>
  )
}

export default NavLink;
