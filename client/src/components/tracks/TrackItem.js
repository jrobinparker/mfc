import React from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';
import RankIcon from '../lessons/lesson/RankIcon';
import StyleIcon from '../lessons/lesson/StyleIcon';
import '../lessons/lesson/Lesson.css';

const TrackItem = ({ track: { _id, title, created, rank, style, likes, completes }}) => {

  return (
    <div className="column is-3">
      <div className="box">
        <h1 className="lesson-item-title"><Link to={`/track/${_id}`}>{title}</Link></h1>
        <div class="field is-grouped is-grouped-multiline lesson-metadata">
          <RankIcon rank={rank}/>
          <StyleIcon style={style} />
        </div>
        <small><Moment format='MM/DD/YYYY'>{created}</Moment></small>
      </div>
    </div>
  )
}

TrackItem.propTypes = {
  track: PropTypes.object.isRequired
};

export default TrackItem;
