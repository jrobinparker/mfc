import React, { Fragment, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import Pagination from '../../utils/Pagination';
import DeleteTrack from './DeleteTrack';
import TrackCompletes from './TrackCompletes';
import '../../tracks/tracks.css';

const AdminTracksView = ({ tracks, deleteTrack }) => {

  const [ filteredTracks, setFilteredTracks ] = useState([]);
  const [ currentPage, setCurrentPage ] = useState(1);
  const [ tracksPerPage ] = useState(10);
  const [ deleteModal, toggleDeleteModal ] = useState(false);
  const [ completeModal, toggleCompleteModal ] = useState(false);
  const [ selectedTrack, setSelectedTrack ] = useState([])

  const indexOfLastTrack = currentPage * tracksPerPage;

  const indexOfFirstTrack = indexOfLastTrack - tracksPerPage;

  const currentTracks = filteredTracks.slice(indexOfFirstTrack, indexOfLastTrack);

  const paginate = pageNumber => setCurrentPage(pageNumber);

  useEffect(() => {
    setFilteredTracks(tracks)
  }, [tracks])

  return (
    <Fragment>
              <div className="form-wizard">
                <div className="admin-buttons">
                    <input type="text" className="input" placeholder="Lesson search" onChange={e => {
                      const term = e.target.value
                      setFilteredTracks(
                        tracks.filter(
                          track => track.title.toLowerCase().includes(term.toLowerCase())
                        )
                      )
                    }}/>
                    <div class="select">
                        <select onChange={e => e.target.value === "" ? (
                          setFilteredTracks(tracks.filter(track => track.rank !== e.target.value))
                        ) : (
                          setFilteredTracks(tracks.filter(track => track.rank === e.target.value))
                        )} name="rank">
                          <option selected disabled>Rank Filter</option>
                          <option value="">All</option>
                          <option value="White">White</option>
                          <option value="Yellow">Yellow</option>
                          <option value="Green">Green</option>
                          <option value="Blue">Blue</option>
                          <option value="Purple">Purple</option>
                          <option value="Brown">Brown</option>
                          <option value="Black">Black</option>
                        </select>
                    </div>
                    <a className="button is-primary">
                      <Link to={'/create-track'}>Create New Track</Link>
                    </a>
              </div>
              <table className="table" style={{ width: '100%' }}>
                  <thead>
                    <th>Track Title</th>
                    <th>Rank</th>
                    <th>Created</th>
                    <th></th>
                  </thead>
                  <tbody>
                    {currentTracks.map((track, i) => {
                      return (
                        <tr key={i}>
                          <td>{track.title}</td>
                          <td>{track.rank}</td>
                          <td><Moment format='MM/DD/YYYY'>{track.created}</Moment></td>
                          <td>
                            <div className="admin-actions">
                              <i className="fas fa-users"
                                style={{ cursor: 'pointer' }}
                                onClick={() => {
                                  setSelectedTrack(track)
                                  toggleCompleteModal(true)
                                }}
                              />
                              <Link to={`/track/${track._id}/edit`}>
                                <i className="fas fa-edit" />
                              </Link>
                              <i
                                className="fas fa-times"
                                style={{ color: 'red', cursor: 'pointer' }}
                                onClick={() => {
                                  setSelectedTrack(track)
                                  toggleDeleteModal(true)
                                }}
                              />
                            </div>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
              </table>
              <Pagination itemsPerPage={tracksPerPage} totalItems={tracks.length} paginate={paginate} />
          </div>
          {deleteModal ? <DeleteTrack toggleDeleteModal={toggleDeleteModal} track={selectedTrack} deleteTrack={deleteTrack} /> : <Fragment></Fragment>}
          {completeModal ? <TrackCompletes toggleCompleteModal={toggleCompleteModal} track={selectedTrack} /> : <Fragment></Fragment>}
        </Fragment>
    )
}

export default AdminTracksView;
