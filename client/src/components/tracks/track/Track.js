import React, { Fragment, useEffect, useState, useLayoutEffect } from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { getTrack, addTrackComplete } from '../../../actions/track';
import { addComplete } from '../../../actions/lesson';
import { getCurrentProfile } from '../../../actions/profile';
import { setAlert } from '../../../actions/alert';
import TrackHeader from './TrackHeader';
import SkillIcon from './SkillIcon';
import Loading from '../../utils/Loading';
import ReactPlayer from 'react-player';
import '../../lessons/lesson/Lesson.css';

const Track = ({ getTrack, addTrackComplete, track: { track, trackLessons, loading }, auth: { user }, match }) => {
  const [ lesson, setLesson ] = useState({});
  const [ completedLessons, setCompletedLessons ] = useState(0);
  const [ active, toggleActive] = useState('')

  useEffect(() => {
    getTrack(match.params.id)
    getCurrentProfile()
  }, [match.params.id, getTrack, getCurrentProfile]);

  useEffect(() => {
    // const userCompletes = trackLessons.map(lesson => lesson.completes).filter(complete => complete.user === user._id)
    // userCompletes.map(c => {
    //  setCompletedLessons(completedLessons + 1)
    //})
    console.log(trackLessons.map(lesson => lesson))
  }, [])

  const lessonCounter = n => {
    setCompletedLessons(completedLessons + n)
    if (completedLessons >= track.lessons.length) {
     setCompletedLessons(track.lessons.length);
     addTrackComplete(track._id);
     console.log("completed!")
    } else {
      setCompletedLessons(completedLessons + 1);
    }
    console.log(completedLessons)
  }

  return loading || track === null ? <Loading /> : (
    <div className="container">
      <div className="lesson-container">
        <TrackHeader
          id={track._id}
          created={track.created}
          user={user}
          title={track.title}
          skills={track.skills}
          rank={track.rank}
          completes={track.completes}
        />
        <div className="track-container">
          <div className="menu">
            <ul className="menu-list">
            {trackLessons.map(lesson =>
              <li
                onClick={
                  () => {
                    setLesson(lesson)
                    toggleActive('is-active')
                    console.log(lesson)
                }}
              >
                <a>{lesson.title}</a>
              </li>
            )
            }
            </ul>
          </div>
          <div className="lesson-content">
            <ReactPlayer
              url={`http://localhost:5000/api/lessons/videos/${lesson.video}`}
              controls={true}
              width='100%'
              height='100%'
              onEnded={() => {
                addComplete(lesson._id)
                lessonCounter(1)
              }}
            />
          </div>
          </div>
        </div>
        <div className="lesson-description">
          <p style={{ marginBottom: '15px' }}>{track.description}</p>
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
