import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import Login from './Login';
import Register from './Register';
import './form.css';

const AuthModal = ({ toggleModal }) => {
  const [ form, toggleForm ] = useState('login');

  return createPortal(
    <div className="modal is-active auth-modal">
    <div className="modal-background" onClick={() => toggleModal(false)}></div>
      <div className="modal-card login">
      <header className="modal-card-head">
        <div class="modal-buttons">
          <span className={`button ${form === 'login' ? 'is-primary' : 'is-light'}`} onClick={() => toggleForm('login')}>Login</span>
          <span className={`button ${form === 'register' ? 'is-primary' : 'is-light'}`} onClick={() => toggleForm('register')}>Sign Up</span>
        </div>
        <button className="delete" aria-label="close" onClick={() => toggleModal(false)}></button>
      </header>
        <section className="modal-card-body">
          { form === 'login' ? <Login toggleModal={toggleModal} /> : <Register toggleModal={toggleModal} /> }
        </section>
        </div>
      </div>,
    document.querySelector('#auth-modal')
  )
};

export default AuthModal;
