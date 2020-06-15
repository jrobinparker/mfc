import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { getTrack } from '../../../actions/track';
import { getCurrentProfile } from '../../../actions/profile';
import { setAlert } from '../../../actions/alert';
import TrackHeader from './TrackHeader';
import SkillIcon from './SkillIcon';
import Loading from '../../utils/Loading';
import './Lesson.css';

const Track = ({ getTrack, track: { track, loading }, auth: { user }, match }) => {

  useEffect(() => {
    getTrack(match.params.id)
    getCurrentProfile()
  }, [match.params.id, getTrack, getCurrentProfile]);

  console.log(track)

  return loading || track === null ? <Loading /> : (
    <div className="container">
      <div className="lesson-container">
        <TrackHeader
          id={track._id}
          user={user}
          title={track.title}
        />

        <div className="lesson-content">
        </div>

        <div className="lesson-description">
          <p style={{ marginBottom: '15px' }}>{track.description}</p>
        </div>

      </div>
    </div>
  )
}

Track.propTypes = {
  getTrack: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  track: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  track: state.track
});

export default connect(mapStateToProps, { getTrack, getCurrentProfile })(withRouter(Track));
