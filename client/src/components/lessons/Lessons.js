import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getLessons } from '../../actions/lesson';
import LessonItem from './LessonItem';
import Filter from './Filter';
import Loading from '../utils/Loading';

const Lessons = ({ lesson: { lessons, loading }, getLessons }) => {
  const [ filter, setFilter ] = useState({
    rank: 'all',
    style: 'all',
    sort: 'all'
  });

  useEffect(() => {
    getLessons();
  }, [getLessons]);

  const onChange = e => {
    setFilter({ [e.target.name]: e.target.value });
  };

  let filteredLessons

  if (filter.rank === 'white') {
    filteredLessons = lessons
      .filter(lesson => lesson.rank === 'white')
      .map(lesson => <LessonItem key={lesson._id} lesson={lesson}  />)
  }

  if (filter.rank === 'yellow') {
    filteredLessons = lessons
      .filter(lesson => lesson.rank === 'yellow')
      .map(lesson => <LessonItem key={lesson._id} lesson={lesson}  />)
  }

  if (filter.rank === 'green') {
    filteredLessons = lessons
      .filter(lesson => lesson.rank === 'green')
      .map(lesson => <LessonItem key={lesson._id} lesson={lesson}  />)
  }

  if (filter.rank === 'blue') {
    filteredLessons = lessons
      .filter(lesson => lesson.rank === 'blue')
      .map(lesson => <LessonItem key={lesson._id} lesson={lesson}  />)
  }

  if (filter.rank === 'purple') {
    filteredLessons = lessons
      .filter(lesson => lesson.rank === 'purple')
      .map(lesson => <LessonItem key={lesson._id} lesson={lesson}  />)
  }

  if (filter.rank === 'brown') {
    filteredLessons = lessons
      .filter(lesson => lesson.rank === 'purple')
      .map(lesson => <LessonItem key={lesson._id} lesson={lesson}  />)
  }

  if (filter.rank === 'black') {
    filteredLessons = lessons
      .filter(lesson => lesson.rank === 'black')
      .map(lesson => <LessonItem key={lesson._id} lesson={lesson}  />)
  }

  if (filter.rank === 'all') {
    filteredLessons = lessons.map(lesson => <LessonItem key={lesson._id} lesson={lesson}  />)
  }

  if (filter.style === 'all') {
    filteredLessons = lessons.map(lesson => <LessonItem key={lesson._id} lesson={lesson}  />)
  }

  if (filter.style === 'eskrima') {
    filteredLessons = lessons
      .filter(lesson => lesson.style === 'Eskrima')
      .map(lesson => <LessonItem key={lesson._id} lesson={lesson}  />)
  }

  if (filter.sort === 'all') {
    filteredLessons = lessons.map(lesson => <LessonItem key={lesson._id} lesson={lesson}  />)
  }

  if (filter.sort === 'dates') {
    filteredLessons = lessons
      .sort((a, b) => b.date - a.date)
      .map(lesson => <LessonItem key={lesson._id} lesson={lesson}  />)
    }

  if (filter.sort === 'likes') {
    filteredLessons = lessons
      .sort((a, b) => b.likes.length - a.likes.length)
      .map(lesson => <LessonItem key={lesson._id} lesson={lesson}  />)
    }

  if (filter.sort === 'completes') {
    filteredLessons = lessons
      .sort((a, b) => b.completes.length - a.completes.length)
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
                <option value="all" selected>All Ranks</option>
                <option value="white">White</option>
                <option value="yellow">Yellow</option>
                <option value="green">Green</option>
                <option value="blue">Blue</option>
                <option value="purple">Purple</option>
                <option value="brown">Brown</option>
                <option value="black">Black</option>
                </select>
              </div>
            </div>
          </div>
          <div class="field">
            <div class="control">
              <label class="label">Style</label>
              <div class="select">
                <select onChange={e => onChange(e)} name="style">
                  <option value="all" selected>All</option>
                  <option value="eskrima">Eskrima</option>
                </select>
              </div>
            </div>
          </div>
          <div class="field">
            <div class="control">
              <label class="label">Sort</label>
              <div class="select">
                <select onChange={e => onChange(e)} name="sort">
                  <option value="all" selected>All</option>
                  <option value="dates">Most Recent</option>
                  <option value="likes">Most Likes</option>
                  <option value="completes">Most Completes</option>
                </select>
              </div>
            </div>
          </div>
        </div>
          <div className="lessons-container">
            <div className="container">
              <div className="columns">
                {
                  filteredLessons
                }
              </div>
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
