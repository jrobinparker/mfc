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
          <p>Welcome to MFC Online University!</p>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris vel quam efficitur, dapibus mauris a, egestas magna. Mauris ut leo sollicitudin, rhoncus mauris non, mattis neque. Ut ullamcorper purus in efficitur pharetra. Aenean cursus sollicitudin euismod. Maecenas in risus sed nisl tincidunt ullamcorper. Sed et ipsum massa. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sit amet massa justo. In bibendum mattis sem, quis mattis massa suscipit lacinia. Praesent ultricies, dui ac porttitor porttitor, nisi ex pharetra velit, sed porttitor ipsum nulla a velit.</p>
          <p>Best,</p>
          <p>Joe Parker</p>
        </section>
      </div>
    </div>
    ,
    document.querySelector('#new-user-modal')
  )
};

export default NewUserModal;
