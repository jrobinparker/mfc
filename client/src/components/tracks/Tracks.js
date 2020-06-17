import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getTracks } from '../../actions/track';
import Filter from './Filter';
import TrackItem from './TrackItem';
import Loading from '../utils/Loading';

const Tracks = ({ track: { tracks, loading }, getTracks }) => {
  const [ filter, setFilter ] = useState({
    rank: 'all',
    style: 'all',
    sort: 'all'
  });

  useEffect(() => {
    getTracks();
  }, [getTracks]);

  const onChange = e => {
    setFilter({ [e.target.name]: e.target.value });
  };

  let filteredTracks

  if (filter.rank === 'white') {
    filteredTracks = tracks
      .filter(track => track.rank === 'White')
      .map(track => <TrackItem key={track._id} track={track}  />)
  }

  if (filter.rank === 'yellow') {
    filteredTracks = tracks
      .filter(track => track.rank === 'Yellow')
      .map(track => <TrackItem key={track._id} track={track}  />)
  }

  if (filter.rank === 'green') {
    filteredTracks = tracks
      .filter(track => track.rank === 'Green')
      .map(track => <TrackItem key={track._id} track={track}  />)
  }

  if (filter.rank === 'blue') {
    filteredTracks = tracks
      .filter(track => track.rank === 'Blue')
      .map(track => <TrackItem key={track._id} track={track}  />)
  }

  if (filter.rank === 'purple') {
    filteredTracks = tracks
      .filter(track => track.rank === 'Purple')
      .map(track => <TrackItem key={track._id} track={track}  />)
  }

  if (filter.rank === 'brown') {
    filteredTracks = tracks
      .filter(track => track.rank === 'Brown')
      .map(track => <TrackItem key={track._id} track={track}  />)
  }

  if (filter.rank === 'black') {
    filteredTracks = tracks
      .filter(track => track.rank === 'Black')
      .map(track => <TrackItem key={track._id} track={track}  />)
  }

  if (filter.rank === 'all') {
    filteredTracks = tracks.map(track => <TrackItem key={track._id} track={track}  />)
  }

  if (filter.style === 'all') {
    filteredTracks = tracks.map(track => <TrackItem key={track._id} track={track}  />)
  }

  if (filter.style === 'eskrima') {
    filteredTracks = tracks
      .filter(track => track.style === 'Eskrima')
      .map(track => <TrackItem key={track._id} track={track}  />)
  }

  if (filter.sort === 'all') {
    filteredTracks = tracks.map(track => <TrackItem key={track._id} track={track}  />)
  }

  if (filter.sort === 'dates') {
    filteredTracks = tracks
      .sort((a, b) => b.date - a.date)
      .map(track => <TrackItem key={track._id} track={track}  />)
    }

  if (filter.sort === 'likes') {
    filteredTracks = tracks
      .sort((a, b) => b.likes.length - a.likes.length)
      .map(track => <TrackItem key={track._id} track={track}  />)
    }

  if (filter.sort === 'completes') {
    filteredTracks = tracks
      .sort((a, b) => b.completes.length - a.completes.length)
      .map(track => <TrackItem key={track._id} track={track}  />)
    }

  return loading ? <Loading /> : (
    <div className="lessons-container">
      <h1 className="title">Tracks</h1>
        <div className="lessons-subcontainer">
        <div className="filter-container">
          <div class="field">
            <div class="control">
              <label class="label">Rank</label>
              <div class="select">
                <select onChange={e => onChange(e)} name="rank">
                <option value="all" selected>All Ranks</option>
                <option value="white">White</option>
                <option value="yellow">Yellow</option>
                <option value="green">Green</option>
                <option value="blue">Blue</option>
                <option value="purple">Purple</option>
                <option value="brown">Brown</option>
                <option value="black">Black</option>
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
          </div>
        </div>
    </div>
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
