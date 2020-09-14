import React from 'react';
import { createPortal } from 'react-dom';
import './dashboard.css';

const NewUserModal = ({ name, toggleModal }) => {

  return createPortal(
    <div className="modal is-active">
    <div className="modal-background" onClick={() => toggleModal(false)}></div>
      <div className="modal-card">
      <header className="modal-card-head">
        <p className="modal-card-title">Welcome to MFC Online University!</p>
        <button className="delete" aria-label="close" onClick={() => toggleModal(false)}></button>
      </header>
        <section className="modal-card-body new-user-modal">
          <p>Dear {name},</p>
          <p>Welcome to MFC Online University! Thank you for joining us.</p>
          <p>Lesson videos are posted in the Lessons page, located in the side menu.</p>
          <p>Contact me if you have any questions.</p>
          <p>Joe Parker</p>
        </section>
      </div>
    </div>
    ,
    document.querySelector('#new-user-modal')
  )
};

export default NewUserModal;
