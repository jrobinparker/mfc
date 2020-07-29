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
import './dashboard.css';

const Dashboard = ({ getLessons, getTracks, loadUser, auth: { user }, lesson: { lessons, loading }, track: { tracks } }) => {
  const [ completedLessons, setCompletedLessons ] = useState([]);
  const [ inProgress, setInProgress ] = useState([]);
  const [ completedTracks, setCompletedTracks ] = useState([]);

  useEffect(() => {
    getLessons();
    getTracks();
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
                  name={user && user.name}
                  inProgress={inProgress.length.toString()}
                  completedLessons={completedLessons.length.toString()}
                  completedTracks={completedTracks.length.toString()}
                />
                <div className="profile-lessons">
                  <DashboardWidget
                    items={inProgress}
                    type={'lesson'}
                    header={'Lessons In Progress'}
                    nullMessage={`You haven't started any lessons yet!`}
                    />
                  <DashboardWidget
                    items={completedLessons}
                    type={'lesson'}
                    header={'Completed Lessons'}
                    nullMessage={`You haven't completed any lessons yet!`}
                  />
                  <DashboardWidget
                    items={completedTracks}
                    type={'track'}
                    header={'Completed Tracks'}
                    nullMessage={`You haven't completed any tracks yet!`}
                  />
                </div>
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
