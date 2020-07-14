import React from 'react';
import { createPortal } from 'react-dom';

const DeleteLesson = ({ lesson, deleteLesson, toggleDeleteModal}) => {

   return createPortal(
    <div className="modal is-active">
    <div className="modal-background" onClick={() => toggleDeleteModal(false)}></div>
      <div className="modal-card">
      <header className="modal-card-head">
        <p className="modal-card-title">Delete {lesson.title}</p>
        <button className="delete" aria-label="close" onClick={() => toggleDeleteModal(false)}></button>
      </header>
        <section className="modal-card-body">
          Are you sure you want to delete this course?
        </section>
        <footer className="modal-card-foot">
          <button className="button is-danger" onClick={e => {
            deleteLesson(lesson._id)
            toggleDeleteModal(false)
          }}>Delete</button>
          <button className="button" onClick={() => toggleDeleteModal(false)}>Cancel</button>
        </footer>
      </div>
    </div>
    ,
    document.querySelector('#delete-modal')
    )
}

export default DeleteLesson;
