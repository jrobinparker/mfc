import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';
import RankIcon from './lesson/RankIcon';
import StyleIcon from './lesson/StyleIcon';
import CompleteIcon from './lesson/CompleteIcon';
import './lesson/Lesson.css';

const LessonItem = ({ lesson: { _id, title, date, rank, style, likes, completes, description, thumbnail }}, user ) => {
  const [ thumb, setThumb ] = useState('')

  const defaultThumb = require('../../assets/logo.png')
  const lessonThumb = `https://modernfightingconcepts.herokuapp.com/api/lessons/thumbnails/${thumbnail}`

  useEffect(() => {
    setThumb(!thumbnail ? defaultThumb : lessonThumb)
  }, [thumbnail])

  return (
    <div className="column is-3">
      <div className="card">
        <div className="card-image">
        <figure className="image is-4by3">
          <img src={thumb} />
        </figure>
        </div>
        <div className="card-content">
          <div className="content">
            <p className="lesson-item-title"><Link to={`/lesson/${_id}`}>{title}</Link></p>
            <div class="field is-grouped is-grouped-multiline lesson-metadata">
              <RankIcon rank={rank}/>
              <StyleIcon style={style} />
              <CompleteIcon completes={completes} user={user} />
            </div>
            <small><Moment format='MM/DD/YYYY'>{date}</Moment></small>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LessonItem;
