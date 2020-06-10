import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getTracks } from '../../actions/track';
// import Filter from './Filter';
import TrackItem from './TrackItem';
import Loading from '../utils/Loading';

const Tracks = ({ track: { tracks, loading }, getTracks }) => {

  useEffect(() => {
    getTracks();
  }, [getTracks]);

  return loading ? <Loading /> : (
    <div className="lessons-container">
      <h1 className="title">Tracks</h1>
        <div className="lessons-subcontainer">
          <div className="lessons-container">
            <div className="container">
              <div className="columns is-multiline">
                {tracks.map(track => <TrackItem key={track._id} track={track}  />)}
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
