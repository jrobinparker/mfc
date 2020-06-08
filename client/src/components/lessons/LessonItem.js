import React from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';
import RankIcon from './lesson/RankIcon';
import StyleIcon from './lesson/StyleIcon';
import LikeIcon from './lesson/LikeIcon';
import CompleteIcon from './lesson/CompleteIcon';

const LessonItem = props => {
  const { id, title, date, rank, style, likes, completes } = props.lesson

  return (
    <div className="column">
      <div className="box">
        <h1 className="lesson-item-title"><Link to={`/lesson/${id}`}>{title}</Link></h1>
        <div class="field is-grouped is-grouped-multiline lesson-metadata">
          <RankIcon rank={rank}/>
          <StyleIcon style={style} />
          <LikeIcon likes={likes} />
          <CompleteIcon completes={completes} />
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
