import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getLessons, deleteLesson, removeComplete } from '../../actions/lesson';
import { getTracks } from '../../actions/track';
import { getCurrentProfile } from '../../actions/profile';
import { setAlert } from '../../actions/alert';
import AdminLessonsView from './lessons/AdminLessonsView';
import Loading from '../utils/Loading';

const AdminView = ({ getLessons, getTracks, deleteLesson, removeComplete, setAlert, auth: { user }, lesson: { lessons, loading }, track: { tracks } }) => {
  const [ viewLessons, toggleView ] = useState(true)

  useEffect(() => {
    getLessons();
    getTracks();
  }, [getLessons, getTracks])

  return loading ? <Loading /> : (
    <Fragment>
        <div>
          <button onClick={() => toggleView(true)}>lessons</button>
          <button onClick={() => toggleView(false)}>tracks</button>
        </div>
        <div>
          {
            viewLessons ? <AdminLessonsView lessons={lessons} deleteLesson={deleteLesson} removeComplete={removeComplete} /> : <h1>tracks</h1>
          }
          </div>
    </Fragment>
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

export default connect(mapStateToProps, { getLessons, getTracks, deleteLesson, removeComplete })(AdminView)
