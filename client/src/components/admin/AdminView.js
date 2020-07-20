import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getLessons, deleteLesson, removeComplete } from '../../actions/lesson';
import { getTracks, deleteTrack } from '../../actions/track';
import { getCurrentProfile } from '../../actions/profile';
import { setAlert } from '../../actions/alert';
import AdminLessonsView from './lessons/AdminLessonsView';
import AdminTracksView from './tracks/AdminTracksView';
import Loading from '../utils/Loading';
import './admin.css';

const AdminView = ({ getLessons, getTracks, deleteLesson, removeComplete, deleteTrack, setAlert, auth: { user }, lesson: { lessons, loading }, track: { tracks } }) => {
  const [ viewLessons, toggleView ] = useState(true)

  useEffect(() => {
    getLessons();
    getTracks();
  }, [getLessons, getTracks])

  return loading ? <Loading /> : (
    <div className="container">
        <div class="field">
          <div class="control">
            <div class="select admin-select">
              <select onChange={() => toggleView(!viewLessons)}>
                <option>Lessons</option>
                <option>Tracks</option>
              </select>
            </div>
          </div>
        </div>
        <div>
          {
            viewLessons ?
              <AdminLessonsView
                lessons={lessons}
                deleteLesson={deleteLesson}
                removeComplete={removeComplete}
              />
              :
              <AdminTracksView
                tracks={tracks}
                deleteTrack={deleteTrack}
              />
          }
          </div>
    </div>
  )
};

AdminView.propTypes = {
  getLessons: PropTypes.func.isRequired,
  getTracks: PropTypes.func.isRequired,
  deleteLesson: PropTypes.func.isRequired,
  lesson: PropTypes.object.isRequired,
  track: PropTypes.object.isRequired
};


const mapStateToProps = state => ({
  auth: state.auth,
  lesson: state.lesson,
  track: state.track
})

export default connect(mapStateToProps, { getLessons, getTracks, deleteLesson, removeComplete, deleteTrack })(AdminView)
