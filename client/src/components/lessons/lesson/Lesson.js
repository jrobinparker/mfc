import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { getLesson, addLike, removeLike } from '../../../actions/lesson';
import { getCurrentProfile } from '../../../actions/profile';
import { setAlert } from '../../../actions/alert';
import LessonHeader from './LessonHeader';
import LessonComments from './LessonComments';
import SkillIcon from './SkillIcon';
import Loading from '../../utils/Loading';
import './Lesson.css';

const Lesson = ({ getLesson, getCurrentProfile, setAlert, addLike, removeLike, lesson: { lesson, loading }, auth: { user }, match }) => {
  const [ displayComments, toggleComments ] = useState({
    show: false
  })

  useEffect(() => {
    getLesson(match.params.id)
    getCurrentProfile()
  }, [match.params.id, getLesson, getCurrentProfile]);

  console.log(lesson)

  return loading || lesson === null ? <Loading /> : (
    <div className="container">
      <div className="lesson-container">
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

        <div className="lesson-content">
        </div>

        <div className="lesson-description">
          <p style={{ marginBottom: '15px' }}>{lesson.description}</p>
          <button
            onClick={() =>
              toggleComments({
                show: !displayComments.show
              })
          }
            className="button is-normal is-link"
            >
            {displayComments.show ? 'Hide comments' : 'Show comments' }
          </button>
        </div>



        {
          displayComments.show ? <LessonComments comments={lesson.comments} /> : <Fragment></Fragment>
        }

      </div>
    </div>
  )
}

Lesson.propTypes = {
  getLesson: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired,
  lesson: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  lesson: state.lesson
});

export default connect(mapStateToProps, { getLesson, getCurrentProfile, setAlert, addLike, removeLike })(withRouter(Lesson));
