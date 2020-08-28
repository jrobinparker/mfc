import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { getLesson, addLike, removeLike, addComplete, removeComplete, addInProgress } from '../../../actions/lesson';
import { getCurrentProfile } from '../../../actions/profile';
import { setAlert } from '../../../actions/alert';
import LessonHeader from './LessonHeader';
import Loading from '../../utils/Loading';
import './Lesson.css';
import ReactPlayer from 'react-player';


const Lesson = ({ getLesson, getCurrentProfile, setAlert, addLike, removeLike, addComplete, addInProgress, lesson: { lesson, loading }, auth: { user }, match }) => {

  useEffect(() => {
    getLesson(match.params.id)
    getCurrentProfile()
  }, [match.params.id, getLesson, getCurrentProfile]);

  return loading || lesson === null ? <Loading /> : (
    <div className="container" style={{ marginBottom: '10px' }}>
      <div className="box">
        <LessonHeader
          id={lesson._id}
          user={user}
          title={lesson.title}
          author={lesson.author}
          date={lesson.date}
          rank={lesson.rank}
          style={lesson.style}
          skills={lesson.skills}
          likes={lesson.likes}
          addLike={addLike}
          removeLike={removeLike}
          alert={setAlert}
          completes={lesson.completes}
        />

          <ReactPlayer
            url={`https://modernfightingconcepts.herokuapp.com/api/lessons/videos/${lesson.video}`}
            controls={true}
            width='100%'
            height='50%'
            playsInline={true}
            muted={true}
            config={{ file: { attributes: { controlsList: 'nodownload' } } }}
            onContextMenu={e => e.preventDefault()}
            onStart={() => addInProgress(lesson._id)}
            onEnded={() => addComplete(lesson._id)}
          />

        <div className="lesson-description">
          <p style={{ marginBottom: '15px' }}>{lesson.description}</p>
        </div>
      </div>
    </div>
  )
}

Lesson.propTypes = {
  getLesson: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired,
  addComment: PropTypes.func.isRequired,
  deleteComment: PropTypes.func.isRequired,
  lesson: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  lesson: state.lesson
});

export default connect(mapStateToProps, { getLesson, getCurrentProfile, setAlert, addLike, removeLike, addComplete, removeComplete, addInProgress })(withRouter(Lesson));
