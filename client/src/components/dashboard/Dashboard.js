import React, { Fragment, useEffect, useLayoutEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Loading from '../utils/Loading';
import ProfileWidget from './ProfileWidget';
import { loadUser } from '../../actions/auth';
import { getLessons } from '../../actions/lesson';
import { getTracks } from '../../actions/track';
import DashboardWidget from './DashboardWidget';
import NewUserModal from './NewUserModal';
import './dashboard.css';

const Dashboard = ({ getLessons, getTracks, loadUser, auth: { user, newUser }, lesson: { lessons, loading }, track: { tracks } }) => {
  const [ completedLessons, setCompletedLessons ] = useState([]);
  const [ inProgress, setInProgress ] = useState([]);
  const [ completedTracks, setCompletedTracks ] = useState([]);
  const [ newUserModal, toggleModal ] = useState(false);

  useEffect(() => {
    getLessons();
    getTracks();
    if (newUser) {
      toggleModal(true)
    }
  }, [getLessons, getTracks]);

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

  return loading ? <Loading /> : (
              <Fragment>
                <ProfileWidget
                  name={user && user.name.toUpperCase()}
                  inProgress={inProgress.length.toString()}
                  completedLessons={completedLessons.length.toString()}
                  completedTracks={completedTracks.length.toString()}
                />
                <div className="profile-lessons">
                  <DashboardWidget
                    items={inProgress}
                    type={'lesson'}
                    header={'LESSONS IN PROGRESS'}
                    nullMessage={`You haven't started any lessons yet!`}
                    />
                  <DashboardWidget
                    items={completedLessons}
                    type={'lesson'}
                    header={'COMPLETED LESSONS'}
                    nullMessage={`You haven't completed any lessons yet!`}
                  />
                  <DashboardWidget
                    items={completedTracks}
                    type={'track'}
                    header={'COMPLETED TRACKS'}
                    nullMessage={`You haven't completed any tracks yet!`}
                  />
                </div>
                {newUser && newUserModal ? <NewUserModal name={user.name} toggleModal={toggleModal} /> : <></>}
              </Fragment>
          );
};

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    lesson: state.lesson,
    track: state.track
})

export default connect(mapStateToProps, { getLessons, getTracks })(Dashboard);
