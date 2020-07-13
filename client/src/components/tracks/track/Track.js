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

const Track = ({ getTrack, track: { track, trackLessons, loading }, auth: { user }, match }) => {
  const [ loadedLesson, setLoadedLesson ] = useState({});

  useEffect(() => {
    getTrack(match.params.id)
    getCurrentProfile()
  }, [match.params.id, getTrack, getCurrentProfile]);

  return loading || track === null ? <Loading /> : (
    <div className="container">
      <div className="lesson-container">
        <TrackHeader
          id={track._id}
          user={user}
          title={track.title}
        />
        <div className="columns">
        <div className="column is-3">
          <div className="menu">
            <ul className="menu-list">
            {trackLessons.map(lesson =>
              <a
                href="!#"
                className="menu-item"
                onClick={
                  () => {
                    setLoadedLesson(lesson)
                }}
              >
                {lesson.title}
              </a>
            )
            }
            </ul>
          </div>
        </div>
        <div className="column">
          <div className="lesson-content">
            <p>{loadedLesson.title}</p>
            <p>{loadedLesson.description}</p>
          </div>
        </div>
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
  trackLessons: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  track: state.track,
  trackLessons: state.track.trackLessons
});

export default connect(mapStateToProps, { getTrack, getCurrentProfile })(withRouter(Track));
