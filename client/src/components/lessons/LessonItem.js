import React from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';
import RankIcon from './lesson/RankIcon';
import StyleIcon from './lesson/StyleIcon';
import LikeIcon from './lesson/LikeIcon';
import CompleteIcon from './lesson/CompleteIcon';
import './lesson/Lesson.css';

const LessonItem = ({ lesson: { _id, title, date, rank, style, likes, completes }}) => {
  return (
    <div className="column is-3">
      <div className="box">
        <p className="lesson-item-title"><Link to={`/lesson/${_id}`}>{title}</Link></p>
        <div class="field is-grouped is-grouped-multiline lesson-metadata">
          <RankIcon rank={rank}/>
          <StyleIcon style={style} />
        </div>
        <small><Moment format='MM/DD/YYYY'>{date}</Moment></small>
      </div>
    </div>
  )
}

LessonItem.propTypes = {
  lesson: PropTypes.object.isRequired
};

export default LessonItem;
