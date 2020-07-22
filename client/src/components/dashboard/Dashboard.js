import React, { Fragment, useEffect, useLayoutEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Loading from '../utils/Loading';
import ProfileWidget from './ProfileWidget';
import { getCurrentProfile } from '../../actions/profile';
import { getLessons } from '../../actions/lesson';
import CompletedLessons from './CompletedLessons';
import LessonsInProgress from './LessonsInProgress';
import './dashboard.css';

const Dashboard = ({ getCurrentProfile, getLessons, auth: { user }, profile: { profile, loading }, lesson: { lessons } }) => {
  const [ completedLessons, setCompletedLessons ] = useState([]);
  const [ inProgress, setInProgress ] = useState([]);

  useEffect(() => {
    getCurrentProfile();
    getLessons();
  }, [getLessons]);

  let findUserCompletes, findInProgress

  useEffect(() => {
    findUserCompletes = lessons.filter(lesson => {
      return lesson.completes.find(c => c.user === user._id)
    })
    setCompletedLessons(findUserCompletes)

    findInProgress = lessons.filter(lesson => {
      return lesson.inProgress.find(ip => ip.user === user._id)
    })
    setInProgress(findInProgress)

    console.log(user)
  }, [lessons])

  return loading && profile === null ? <Loading /> : (
      <Fragment>
          {profile !== null ? (
              <Fragment>
                <ProfileWidget name={user && user.name} profile={profile} />
                <div className="profile-lessons">
                  <LessonsInProgress lessons={inProgress} />
                  <CompletedLessons lessons={completedLessons} />
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
    lesson: state.lesson
})

export default connect(mapStateToProps, { getCurrentProfile, getLessons })(Dashboard);
