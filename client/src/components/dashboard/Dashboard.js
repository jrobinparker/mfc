import React, { Fragment, useEffect, useLayoutEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Loading from '../utils/Loading';
import ProfileWidget from './ProfileWidget';
import { getCurrentProfile } from '../../actions/profile';
import { loadUser } from '../../actions/auth';
import { getLessons } from '../../actions/lesson';
import { getTracks } from '../../actions/track';
import DashboardWidget from './DashboardWidget';
import './dashboard.css';

const Dashboard = ({ getCurrentProfile, getLessons, getTracks, loadUser, auth: { user }, profile: { profile, loading }, lesson: { lessons }, track: { tracks } }) => {
  const [ completedLessons, setCompletedLessons ] = useState([]);
  const [ inProgress, setInProgress ] = useState([]);
  const [ completedTracks, setCompletedTracks ] = useState([]);

  useEffect(() => {
    getCurrentProfile();
    getLessons();
    getTracks();
  }, [getCurrentProfile, getLessons, getTracks]);

  let findUserLessonCompletes, findInProgress, findUserTrackCompletes

  useEffect(() => {
    if (lessons && user) {
      findUserLessonCompletes = lessons.filter(lesson => {
        return lesson.completes.find(c => c.user === user._id)
      })

      findInProgress = lessons.filter(lesson => {
        return lesson.inProgress.find(ip => ip.user === user._id)
      })

      setCompletedLessons(findUserLessonCompletes)
      setInProgress(findInProgress)
    }

    if (tracks && user) {
      findUserTrackCompletes = tracks.filter(track => {
        return track.completes.find(t => t.user === user._id)
      })
      setCompletedTracks(findUserTrackCompletes)
    }

  }, [lessons, tracks, user])

  return loading && profile === null ? <Loading /> : (
      <Fragment>
          {profile !== null ? (
              <Fragment>
                <ProfileWidget name={user && user.name} profile={profile} />
                <div className="profile-lessons">
                  <DashboardWidget
                    items={inProgress}
                    type={'lessons'}
                    header={'Lessons In Progress'}
                    nullMessage={`You haven't started any lessons yet!`}
                    />
                  <DashboardWidget
                    items={completedLessons}
                    type={'lessons'}
                    header={'Completed Lessons'}
                    nullMessage={`You haven't completed any lessons yet!`}
                  />
                  <DashboardWidget
                    items={completedTracks}
                    type={'lessons'}
                    header={'Completed Tracks'}
                    nullMessage={`You haven't completed any tracks yet!`}
                  />
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
