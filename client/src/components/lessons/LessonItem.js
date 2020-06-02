import React from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';

const LessonItem = props => {
  const { id, title, date } = props

  return (
    <div className="column">
      <div className="box">
        <h3><Link to={`/lesson/${id}`}>{title}</Link></h3>
        <small><Moment format='MM/DD/YYYY'>{date}</Moment></small>
      </div>
    </div>
  )
}

LessonItem.propTypes = {
  lesson: PropTypes.object.isRequired
};

export default LessonItem;
