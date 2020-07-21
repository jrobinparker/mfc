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
import LessonCompleteIcon from './LessonCompleteIcon';
import ReactPlayer from 'react-player';
import '../../lessons/lesson/Lesson.css';

const Track = ({ getTrack, addComplete, addTrackComplete, track: { track, trackLessons, loading }, auth: { user }, match }) => {
  const [ lesson, setLesson ] = useState({});
  const [ lessonLoading, setLessonLoading ] = useState(true);
  const [ active, toggleActive ] = useState('');
  const [ completedLessons, setCompletedLessons ] = useState([])
  let userComplete = [];

  useEffect(() => {
    getTrack(match.params.id)
    getCurrentProfile()
  }, [match.params.id, getTrack, getCurrentProfile]);

  useLayoutEffect(() => {
      trackLessons.map(lesson => {
        lesson.completes.map(c => {
          if (c.user === user._id) {
            setCompletedLessons(completedLessons.concat(lesson._id))
          }
        })
      })

      if (
        completedLessons.length >= 1 &&
        trackLessons.length >= 1 &&
        completedLessons.length === trackLessons.length
      ) {
        addTrackComplete(track._id)
      }
  }, [match.params.id, track, trackLessons])

  return loading || track === null ? <Loading /> : (
    <div className="container">
      <div className="box lesson-container">
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
              {!trackLessons ? (
                <Loading />
              ) : (trackLessons.map(lesson =>
                <li
                  className="lesson-title"
                  onClick={
                    () => {
                      setLessonLoading(true)
                      setLesson(lesson)
                      setLessonLoading(false)
                  }}
                >
                  <a>
                    {lesson.title}
                    <LessonCompleteIcon completes={lesson.completes} user={user} />
                  </a>
                </li>
              ))
              }
            </ul>
          </div>
          <div className="lesson-content">
            {
              lessonLoading ? (
                <div className="placeholder-container">
                  <img src={require('../../../assets/logo-transparent.png')} className="placeholder-logo" alt="logo"/>
                </div>
              ) : (
                  <ReactPlayer
                    url={`http://localhost:5000/api/lessons/videos/${lesson.video}`}
                    controls={true}
                    height={'100%'}
                    width={'100%'}
                    onEnded={() => {
                      addComplete(lesson._id)
                      getTrack(track._id)
                    }}
                  />
              )
            }
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

export default connect(mapStateToProps, { getTrack, getCurrentProfile, addTrackComplete, addComplete })(withRouter(Track));
