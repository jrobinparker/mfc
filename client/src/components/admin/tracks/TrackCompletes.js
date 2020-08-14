import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import Moment from 'react-moment';
import Pagination from '../../utils/Pagination';

const TrackCompletes = ({ track, toggleCompleteModal, removeComplete }) => {
  const [ filteredUsers, setFilteredUsers ] = useState([]);
  const [ currentPage, setCurrentPage ] = useState(1);
  const [ usersPerPage ] = useState(10);

  const indexOfLastUser = currentPage * usersPerPage;

  const indexOfFirstUser = indexOfLastUser - usersPerPage;

  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  const paginate = pageNumber => setCurrentPage(pageNumber);

  useEffect(() => {
    setFilteredUsers(track.completes)
  }, [])

   return createPortal(
    <div className="modal is-active">
    <div className="modal-background" onClick={() => toggleCompleteModal(false)}></div>
      <div className="modal-card">
      <header className="modal-card-head">
        <p className="modal-card-title">{track.title} Completes</p>
        <button className="delete" aria-label="close" onClick={() => toggleCompleteModal(false)}></button>
      </header>
        <section className="modal-card-body">
          <div className="control">
            <input type="text" className="input" placeholder="User search" onChange={e => {
              const term = e.target.value
              setFilteredUsers(
                track.completes.filter(
                  c => c.name.toLowerCase().includes(term.toLowerCase())
                )
              )
            }}/>
          </div>
          <table className="table is-fullwidth">
            <thead>
              <th>Name</th>
              <th>Date</th>
              <th></th>
            </thead>
            <tbody>
              {filteredUsers.map((c, i) => {
                return (
                  <tr key={i}>
                    <td>{c.name}</td>
                    <td><Moment format='MM/DD/YYYY'>{c.date}</Moment></td>
                  </tr>
              )})}
            </tbody>
          </table>
        </section>
        <footer className="modal-card-foot">
          <Pagination itemsPerPage={usersPerPage} totalItems={track.completes.length} paginate={paginate} />
        </footer>
      </div>
    </div>
    ,
    document.querySelector('#track-completes-modal')
    )
}

export default TrackCompletes;
