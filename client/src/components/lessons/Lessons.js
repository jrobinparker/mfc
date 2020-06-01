import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getLessons } from '../../actions/lesson';
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
          lessons.map(lesson => {
            return (
              <div className="column">
                <div className="box">
                  <h3>{lesson.title}</h3>
                </div>
              </div>
            )
          })
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
