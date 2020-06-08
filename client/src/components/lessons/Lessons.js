import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getLessons } from '../../actions/lesson';
import LessonItem from './LessonItem';
import Filter from './Filter';
import Loading from '../utils/Loading';

const Lessons = ({ lesson: { lessons, loading }, getLessons }) => {
  const [ filter, setFilter ] = useState({
    filter: ''
  });

  useEffect(() => {
    getLessons();
  }, [getLessons]);

  const onChange = e => {
    setFilter({ filter: e.target.value });
  };

  let filteredLessons

  if (filter.filter === '') {
    filteredLessons = lessons.map(lesson => <LessonItem key={lesson._id} lesson={lesson} />)
  }

  if (filter.filter === 'white') {
    filteredLessons = lessons
      .filter(lesson => lesson.rank === 'white')
      .map(lesson => <LessonItem key={lesson._id} lesson={lesson}  />)
  }

  if (filter.filter === 'yellow') {
    filteredLessons = lessons
      .filter(lesson => lesson.rank === 'yellow')
      .map(lesson => <LessonItem key={lesson._id} lesson={lesson}  />)
  }

  if (filter.filter === 'green') {
    filteredLessons = lessons
      .filter(lesson => lesson.rank === 'green')
      .map(lesson => <LessonItem key={lesson._id} lesson={lesson}  />)
  }

  if (filter.filter === 'blue') {
    filteredLessons = lessons
      .filter(lesson => lesson.rank === 'blue')
      .map(lesson => <LessonItem key={lesson._id} lesson={lesson}  />)
  }

  if (filter.filter === 'purple') {
    filteredLessons = lessons
      .filter(lesson => lesson.rank === 'purple')
      .map(lesson => <LessonItem key={lesson._id} lesson={lesson}  />)
  }

  if (filter.filter === 'brown') {
    filteredLessons = lessons
      .filter(lesson => lesson.rank === 'purple')
      .map(lesson => <LessonItem key={lesson._id} lesson={lesson}  />)
  }

  if (filter.filter === 'black') {
    filteredLessons = lessons
      .filter(lesson => lesson.rank === 'black')
      .map(lesson => <LessonItem key={lesson._id} lesson={lesson}  />)
  }

  if (filter.filter === '') {
    filteredLessons = lessons.map(lesson => <LessonItem key={lesson._id} lesson={lesson} />)
  }

  if (filter.filter === 'eskrima') {
    filteredLessons = lessons
      .filter(lesson => lesson.rank === 'eskrima')
      .map(lesson => <LessonItem key={lesson._id} lesson={lesson}  />)
  }

  return loading ? <Loading /> : (
    <Fragment>
      <h1 className="title">Lessons</h1>
      <div className="container">
        <div className="lessons-subcontainer">
        <div className="filter-container">
          <div class="field">
            <div class="control">
              <label class="label">Rank</label>
              <div class="select">
                <select onChange={e => onChange(e)} name="rank">
                  <option value="" selected>all</option>
                  <option>white</option>
                  <option>yellow</option>
                  <option>green</option>
                  <option>blue</option>
                  <option>purple</option>
                  <option>brown</option>
                  <option>black</option>
                </select>
              </div>
            </div>
          </div>
          <div class="field">
            <div class="control">
              <label class="label">Style</label>
              <div class="select">
                <select>
                  <option>Select dropdown</option>
                  <option>With options</option>
                </select>
              </div>
            </div>
          </div>
          <div class="field">
            <div class="control">
              <label class="label">Sort</label>
              <div class="select">
                <select>
                  <option>Most Recent</option>
                  <option>Most Likes</option>
                  <option>Most Completes</option>
                </select>
              </div>
            </div>
          </div>
        </div>
          <div className="lessons-container">
            <div className="columns">
              {
                filteredLessons
              }
            </div>
          </div>
        </div>
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
