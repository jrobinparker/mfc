import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { getLessons, deleteLesson, removeComplete } from '../../actions/lesson';
import { getTracks, deleteTrack } from '../../actions/track';
import { getSettings, getSetting, createSettings, editSettings } from '../../actions/settings';
import { loadUser } from '../../actions/auth';
import AdminLessonsView from './lessons/AdminLessonsView';
import AdminTracksView from './tracks/AdminTracksView';
import AdminSettingsView from './settings/AdminSettingsView';
import Loading from '../utils/Loading';
import './admin.css';

const AdminView = ({ getLessons, getTracks, getSettings, createSettings, editSettings, getSetting, deleteLesson, removeComplete, deleteTrack, setAlert, loadUser, auth, lesson: { lessons, loading }, track: { tracks }, settings }) => {
  const [ view, toggleView ] = useState('lessons')

  useEffect(() => {
    getLessons();
    getTracks();
    getSettings();
    loadUser();
  }, [loadUser, getLessons, getTracks, getSettings])

  if (auth.loading) {
    return <Loading />
  }

  if (auth.user.role !== 'admin') {
    return <Redirect to='/dashboard' />
  }

  let viewComponent

  if (view === 'lessons') {
    viewComponent = <AdminLessonsView
      lessons={lessons}
      deleteLesson={deleteLesson}
      removeComplete={removeComplete}
    />
  }

  if (view === 'tracks') {
    viewComponent = <AdminTracksView
      tracks={tracks}
      deleteTrack={deleteTrack}
    />
  }

  if (view === 'settings') {
    viewComponent = <AdminSettingsView
      settings={settings}
      editSettings={editSettings}
      getSetting={getSetting}
    />
  }

  if (auth.user.role === 'admin') {
    return (
        <div className="container">
          <div className="box">
            <div class="field">
              <div class="control">
                <div class="select admin-select">
                  <select onChange={e => toggleView(e.target.value)}>
                    <option value='lessons'>Lessons</option>
                    <option value='tracks'>Tracks</option>
                    <option value='settings'>Settings</option>
                  </select>
                </div>
              </div>
            </div>
              {viewComponent}
            </div>
        </div>
      )
  }
};

AdminView.propTypes = {
  getLessons: PropTypes.func.isRequired,
  getTracks: PropTypes.func.isRequired,
  deleteLesson: PropTypes.func.isRequired,
  lesson: PropTypes.object.isRequired,
  track: PropTypes.object.isRequired,
  settings: PropTypes.object.isRequired
};


const mapStateToProps = state => ({
  auth: state.auth,
  lesson: state.lesson,
  track: state.track,
  settings: state.settings.settings
})

export default connect(mapStateToProps, { getLessons, getTracks, getSettings, createSettings, editSettings, getSetting, deleteLesson, removeComplete, deleteTrack, loadUser })(AdminView)
