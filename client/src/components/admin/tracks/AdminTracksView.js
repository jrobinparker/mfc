import React, { Fragment, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import Pagination from '../../utils/Pagination';
// import DeleteLesson from './DeleteLesson';
//import TrackCompletes from './TrackCompletes';
import '../../tracks/tracks.css';

const AdminTracksView = ({ tracks }) => {

  const [ tracksData, setTrackData ] = useState([]);
  const [ displayTrackss, setToggleTracks ] = useState(false);
  const [ search, setSearch ] = useState('');
  const [ filteredTracks, setFilteredTracks ] = useState([]);
  const [ currentPage, setCurrentPage ] = useState(1);
  const [ tracksPerPage ] = useState(10);
  const [ deleteModal, toggleDeleteModal ] = useState(false);
  const [ completeModal, toggleCompleteModal ] = useState(false);

  const indexOfLastTrack = currentPage * tracksPerPage;

  const indexOfFirstTrack = indexOfLastTrack - tracksPerPage;

  const currentTracks = filteredTracks.slice(indexOfFirstTrack, indexOfLastTrack);

  const paginate = pageNumber => setCurrentPage(pageNumber);

  useEffect(() => {
    setFilteredTracks(tracks)
  }, [])

  return (
      <Fragment>
              <div className="form-wizard">
                <div className="field is-grouped is-grouped-centered">
                  <div className="control">
                    <input type="text" className="input" placeholder="Lesson search" onChange={e => {
                      const term = e.target.value
                      setFilteredTracks(
                        tracks.filter(
                          track => track.title.toLowerCase().includes(term.toLowerCase())
                        )
                      )
                    }}/>
                  </div>
                  <div className="control">
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
                </div>
              </div>
              <table className="table" style={{ width: '100%', backgroundColor: 'hsl(0, 0%, 96%)' }}>
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
                          <td><Moment format='MM/DD/YYYY'>{track.date}</Moment></td>
                          <td className="admin-actions">
                            <Link to={`/track/${track._id}/edit`} target="_blank">
                              <i className="fas fa-edit" />
                            </Link>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
              </table>
              <Pagination itemsPerPage={tracksPerPage} totalItems={tracks.length} paginate={paginate} />
          </div>
        </Fragment>
    )
}

export default AdminTracksView;
