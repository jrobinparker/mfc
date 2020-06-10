import React from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';

const TrackItem = props => {
  const { _id, title, date, rank, style, likes, completes } = props.track

  return (
    <div className="column is-4">
      <div className="box">
        <h1 className="lesson-item-title"><Link to={`/track/${_id}`}>{title}</Link></h1>
        <div class="field is-grouped is-grouped-multiline lesson-metadata">
        </div>
        <small><Moment format='MM/DD/YYYY'>{date}</Moment></small>
      </div>
    </div>
  )
}

TrackItem.propTypes = {
  track: PropTypes.object.isRequired
};

export default TrackItem;
