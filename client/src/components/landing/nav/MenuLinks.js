import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { loadUser } from '../../../actions/auth';

const MenuLinks = ({ loadUser, user, toggleMenu, toggleModal, expandMenu, logout }) => {
  const [ loadedUser, setLoadedUser ] = useState(null);

  useEffect(() => {
    loadUser();
  }, [loadUser]);

  useEffect(() => {
    setLoadedUser(user)
  }, [setLoadedUser, user])

  return (
    <div className="nav-links">
      {user && user.role === 'basic' ? (
        <></>
      ) : (
        <Link to={'/admin'} onClick={() => {
          toggleMenu()
          expandMenu()
        }}>
          Admin Menu
        </Link>
      )}
      <Link to={'/dashboard'} onClick={() => {
        toggleMenu()
        expandMenu()
      }}>
        Dashboard
      </Link>
      <Link to={'/lessons'} onClick={() => {
        toggleMenu()
        expandMenu()
      }}>
        Lessons
      </Link>
      <Link to={'/tracks'} onClick={() => {
        toggleMenu()
        expandMenu()
      }}>
        Tracks
      </Link>
      <Link to={'/'} onClick={() => {
        toggleMenu()
        expandMenu()
        logout()
        toggleModal(false)
        }}>
        Logout
      </Link>
  </div>
  )
};

const mapStateToProps = state => ({
  user: state.auth.user
})

export default connect(mapStateToProps, { loadUser })(MenuLinks);
