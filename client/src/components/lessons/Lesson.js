import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { getLesson } from '../../actions/lesson';
import Loading from '../utils/Loading';

const Lesson = ({ getLesson, lesson: { lesson, loading }, match }) => {
  useEffect(() => {
    getLesson(match.params.id);
  }, [match.params.id, getLesson]);

  return loading || lesson === null ? <Loading /> : (
    <div className="columns">
      <div className="column is-one-fifth">
        <div className="box">
          <h3>{lesson.title}</h3>
        </div>
      </div>
      <div className="column">
        <div className="box">
          <p>{lesson.description}</p>
        </div>
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
