import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getLessons } from '../../actions/lesson';
import LessonItem from './LessonItem';
import Loading from '../utils/Loading';

const Lessons = ({ lesson: { lessons, loading }, getLessons }) => {
  useEffect(() => {
    getLessons();
  }, [getLessons])

  return loading ? <Loading /> : (
    <Fragment>
      <h1>Lessons</h1>
      <div className="columns">
        {
          lessons.map(lesson => <LessonItem id={lesson._id} title={lesson.title} date={lesson.date} />)
        }
      </div>
    </Fragment>
  );
};

Lessons.propTypes = {
  getLessons: PropTypes.func.isRequired,
  lesson: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  lesson: state.lesson
})

export default connect(mapStateToProps, { getLessons })(Lessons);
