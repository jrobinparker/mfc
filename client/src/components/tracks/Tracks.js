import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getTracks } from '../../actions/track';
import TrackItem from './TrackItem';
import Loading from '../utils/Loading';
import Pagination from '../utils/Pagination';
import './tracks.css';

const Tracks = ({ track: { tracks, loading }, getTracks }) => {
  const [ filter, setFilter ] = useState({
    rank: 'all',
    style: 'all',
    sort: 'all'
  });

  const [ currentPage, setCurrentPage ] = useState(1);
  const [ tracksPerPage ] = useState(12);

  const indexOfLastTrack = currentPage * tracksPerPage;

  const indexOfFirstTrack = indexOfLastTrack - tracksPerPage;

  const currentTracks = tracks.slice(indexOfFirstTrack, indexOfLastTrack);

  const paginate = pageNumber => setCurrentPage(pageNumber);

  useEffect(() => {
    getTracks();
  }, [getTracks]);

  const onChange = e => {
    setFilter({ [e.target.name]: e.target.value });
  };

  let filteredTracks

  if (filter.rank === 'beg') {
    filteredTracks = currentTracks
      .filter(track => track.rank === 'Beginner')
      .map(track => <TrackItem key={track._id} track={track}  />)
  }

  if (filter.rank === 'int') {
    filteredTracks = currentTracks
      .filter(track => track.rank === 'Intermediate')
      .map(track => <TrackItem key={track._id} track={track}  />)
  }

  if (filter.rank === 'exp') {
    filteredTracks = currentTracks
      .filter(track => track.rank === 'Expert')
      .map(track => <TrackItem key={track._id} track={track}  />)
  }

  if (filter.rank === 'all') {
    filteredTracks = currentTracks.map(track => <TrackItem key={track._id} track={track}  />)
  }

  if (filter.style === 'all') {
    filteredTracks = currentTracks.map(track => <TrackItem key={track._id} track={track}  />)
  }

  if (filter.style === 'eskrima') {
    filteredTracks = currentTracks
      .filter(track => track.style === 'Eskrima')
      .map(track => <TrackItem key={track._id} track={track}  />)
  }

  if (filter.style === 'bjj') {
    filteredTracks = currentTracks
      .filter(track => track.style === 'Brazilian Jiu-jitsu')
      .map(track => <TrackItem key={track._id} track={track}  />)
  }

  if (filter.style === 'muaythai') {
    filteredTracks = currentTracks
      .filter(track => track.style === 'Muay Thai')
      .map(track => <TrackItem key={track._id} track={track}  />)
  }

  if (filter.sort === 'all') {
    filteredTracks = currentTracks.map(track => <TrackItem key={track._id} track={track}  />)
  }

  if (filter.sort === 'dates') {
    filteredTracks = currentTracks
      .sort((a, b) => b.date - a.date)
      .map(track => <TrackItem key={track._id} track={track}  />)
    }

  if (filter.sort === 'likes') {
    filteredTracks = currentTracks
      .sort((a, b) => b.likes.length - a.likes.length)
      .map(track => <TrackItem key={track._id} track={track}  />)
    }

  if (filter.sort === 'completes') {
    filteredTracks = currentTracks
      .sort((a, b) => b.completes.length - a.completes.length)
      .map(track => <TrackItem key={track._id} track={track}  />)
    }

  return loading ? <Loading /> : (
    <Fragment>
    <div className="tracks-header">
      <span class="title lessons-title" style={{ color: 'white' }}>TRACKS</span>
    </div>
    <div className="lessons-container">
        <div className="lessons-subcontainer">
        <div className="filter-container">
          <div class="field">
            <div class="control">
              <label class="label">Rank</label>
              <div class="select">
                <select onChange={e => onChange(e)} name="rank">
                <option value="all" selected>All Ranks</option>
                <option value="beg">Beginner</option>
                <option value="int">Intermediate</option>
                <option value="exp">Expert</option>
                </select>
              </div>
            </div>
          </div>
          <div class="field">
            <div class="control">
              <label class="label">Style</label>
              <div class="select">
                <select onChange={e => onChange(e)} name="style">
                  <option value="all" selected>All</option>
                  <option value="eskrima">Eskrima</option>
                </select>
              </div>
            </div>
          </div>
          <div class="field">
            <div class="control">
              <label class="label">Sort</label>
              <div class="select">
                <select onChange={e => onChange(e)} name="sort">
                  <option value="all" selected>All</option>
                  <option value="dates">Most Recent</option>
                  <option value="likes">Most Likes</option>
                  <option value="completes">Most Completes</option>
                </select>
              </div>
            </div>
          </div>
        </div>
          <div className="lessons-container">
            <div className="container">
              <div className="columns is-multiline">
                {
                  filteredTracks
                }
              </div>
            </div>
            {tracks.length <= 12 ? <></> : <Pagination itemsPerPage={tracksPerPage} totalItems={tracks.length} paginate={paginate} />}
          </div>
        </div>
    </div>
    </Fragment>
  );
};


Tracks.propTypes = {
  getTracks: PropTypes.func.isRequired,
  track: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  track: state.track
})

export default connect(mapStateToProps, { getTracks })(Tracks);
