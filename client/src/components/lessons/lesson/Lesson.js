import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { getLesson } from '../../../actions/lesson';
import LessonHeader from './LessonHeader';
import LessonComments from './LessonComments';
import Loading from '../../utils/Loading';
import './Lesson.css';

const Lesson = ({ getLesson, lesson: { lesson, loading }, match }) => {
  const [ displayComments, toggleComments ] = useState({
    show: false
  })

  useEffect(() => {
    getLesson(match.params.id);
  }, [match.params.id, getLesson]);

  return loading || lesson === null ? <Loading /> : (
    <div className="container">
      <div className="lesson-container">
        <LessonHeader
          title={lesson.title}
          author={lesson.author}
          date={lesson.date}
          rank={lesson.rank}
          style={lesson.style}
          likes={lesson.likes}
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
  lesson: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  lesson: state.lesson
});

export default connect(mapStateToProps, { getLesson })(withRouter(Lesson));
