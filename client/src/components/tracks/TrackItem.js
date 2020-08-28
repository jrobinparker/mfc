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
      <div className="card">
        <div className="card-content">
          <div className="content">
            <p className="lesson-item-title"><Link to={`/lesson/${_id}`}>{title}</Link></p>
            <div class="field is-grouped is-grouped-multiline lesson-metadata">
              <RankIcon rank={rank}/>
              <StyleIcon style={style} />
            </div>
            <small><Moment format='MM/DD/YYYY'>{created}</Moment></small>
          </div>
        </div>
      </div>
    </div>
  )
}

TrackItem.propTypes = {
  track: PropTypes.object.isRequired
};

export default TrackItem;
