import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';
import RankIcon from './lesson/RankIcon';
import StyleIcon from './lesson/StyleIcon';
import CompleteIcon from './lesson/CompleteIcon';
import './lesson/Lesson.css';
import './lessons.css';

const LessonItem = ({ lesson: { _id, title, date, rank, style, likes, completes, description, thumbnail }}, user ) => {
  const [ thumb, setThumb ] = useState('')

  const defaultThumb = require('../../assets/logo.png')
  const lessonThumb = `https://modernfightingconcepts.herokuapp.com/api/lessons/thumbnails/${thumbnail}`

  useEffect(() => {
    setThumb(!thumbnail ? defaultThumb : lessonThumb)
  }, [thumbnail])

  return (
    <div className="column is-3">
        <div class="card">
          <div class="card-image">
            <figure class="image is-4by3">
              <img src={thumb} />
            </figure>
          </div>
          <div class="card-content">
            <div class="media">
              <div class="media-content">
                <p class="title is-4"><Link to={`/lesson/${_id}`}>{title}</Link></p>
                <p class="subtitle is-6" style={{ color: 'black' }}><Moment format='MM/DD/YYYY'>{date}</Moment></p>
              </div>
            </div>

            <div class="content">
              <div class="field is-grouped is-grouped-multiline lesson-metadata">
                <RankIcon rank={rank}/>
                <StyleIcon style={style} />
                <CompleteIcon completes={completes} user={user} />
              </div>
            </div>
          </div>
        </div>
    </div>
  )
}

export default LessonItem;
