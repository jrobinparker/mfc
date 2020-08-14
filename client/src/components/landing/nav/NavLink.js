import React from 'react';

const NavLink = ({ link, id }) => {
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
