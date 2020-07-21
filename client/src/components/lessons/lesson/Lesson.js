import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { getLesson, addLike, removeLike, addComplete, removeComplete, addInProgress } from '../../../actions/lesson';
import { getCurrentProfile } from '../../../actions/profile';
import { setAlert } from '../../../actions/alert';
import LessonHeader from './LessonHeader';
import LessonComments from './LessonComments';
import LessonCommentForm from './LessonCommentForm';
import SkillIcon from './SkillIcon';
import Loading from '../../utils/Loading';
import './Lesson.css';
import axios from 'axios';
import ReactPlayer from 'react-player';


const Lesson = ({ getLesson, getCurrentProfile, setAlert, addLike, removeLike, addComplete, addInProgress, lesson: { lesson, loading }, auth: { user }, match }) => {

  const [ lessonVideo, setLessonVideo ] = useState('')

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
            url={`http://localhost:5000/api/lessons/videos/${lesson.video}`}
            controls={true}
            width='100%'
            height='50%'
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
