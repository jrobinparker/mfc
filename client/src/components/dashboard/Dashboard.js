import React, { Fragment, useEffect, useLayoutEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Loading from '../utils/Loading';
import ProfileWidget from './ProfileWidget';
import { getCurrentProfile } from '../../actions/profile';
import { getLessons } from '../../actions/lesson';
import { getTracks } from '../../actions/track';
import CompletedLessons from './CompletedLessons';
import CompletedTracks from './CompletedTracks';
import LessonsInProgress from './LessonsInProgress';
import './dashboard.css';

const Dashboard = ({ getCurrentProfile, getLessons, getCourses, auth: { user }, profile: { profile, loading }, lesson: { lessons }, track: { tracks } }) => {
  const [ completedLessons, setCompletedLessons ] = useState([]);
  const [ inProgress, setInProgress ] = useState([]);
  const [ completedTracks, setCompletedTracks ] = useState([]);

  useEffect(() => {
    getCurrentProfile();
    getLessons();
    getTracks();
  }, [getLessons, getTracks]);

  let findUserLessonCompletes, findInProgress, findUserTrackCompletes

  useEffect(() => {
    findUserLessonCompletes = lessons.filter(lesson => {
      return lesson.completes.find(c => c.user === user._id)
    })
    setCompletedLessons(findUserLessonCompletes)

    findInProgress = lessons.filter(lesson => {
      return lesson.inProgress.find(ip => ip.user === user._id)
    })
    setInProgress(findInProgress)

    findUserTrackCompletes = tracks.filter(track => {
      return track.completes.find(t => t.user === user._id)
    })
    setCompletedTracks(findUserTrackCompletes)

  }, [lessons, tracks])

  return loading && profile === null ? <Loading /> : (
      <Fragment>
          {profile !== null ? (
              <Fragment>
                <ProfileWidget name={user && user.name} profile={profile} />
                <div className="profile-lessons">
                  <LessonsInProgress lessons={inProgress} />
                  <CompletedLessons lessons={completedLessons} />
                  <CompletedTracks tracks={completedTracks} />
                </div>
              </Fragment>
          ) : (
            <Fragment>
              <h2>Set up a profile</h2>
              <Link to='/create-profile'>Create your profile</Link>
            </Fragment>
          )}
      </Fragment>
  );
};

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    profile: state.profile,
    lesson: state.lesson,
    track: state.track
})

export default connect(mapStateToProps, { getCurrentProfile, getLessons, getTracks })(Dashboard);
