import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getLessons } from '../../actions/lesson';
import { loadUser } from '../../actions/auth';
import LessonItem from './LessonItem';
import Loading from '../utils/Loading';
import Pagination from '../utils/Pagination';
import './lessons.css';

const Lessons = ({ lesson: { lessons, loading }, getLessons, loadUser, auth: { user } }) => {
  const [ filter, setFilter ] = useState({
    rank: 'all',
    style: 'all',
    sort: 'all'
  });
  const [ currentPage, setCurrentPage ] = useState(1);
  const [ lessonsPerPage ] = useState(12);

  const indexOfLastLesson = currentPage * lessonsPerPage;

  const indexOfFirstLesson = indexOfLastLesson - lessonsPerPage;

  const currentLessons = lessons.slice(indexOfFirstLesson, indexOfLastLesson);

  const paginate = pageNumber => setCurrentPage(pageNumber);

  useEffect(() => {
    loadUser();
    getLessons();
  }, [loadUser, getLessons]);

  const onChange = e => {
    setFilter({ [e.target.name]: e.target.value });
  };

  let filteredLessons

  if (filter.rank === 'beg') {
    filteredLessons = currentLessons
      .filter(lesson => lesson.rank === 'Beginner')
      .map(lesson => <LessonItem key={lesson._id} lesson={lesson}  user={user} />)
  }

  if (filter.rank === 'int') {
    filteredLessons = currentLessons
      .filter(lesson => lesson.rank === 'Intermediate')
      .map(lesson => <LessonItem key={lesson._id} lesson={lesson}  user={user} />)
  }

  if (filter.rank === 'exp') {
    filteredLessons = currentLessons
      .filter(lesson => lesson.rank === 'Expert')
      .map(lesson => <LessonItem key={lesson._id} lesson={lesson}  user={user} />)
  }

  if (filter.rank === 'all') {
    filteredLessons = currentLessons.map(lesson => <LessonItem key={lesson._id} lesson={lesson}  user={user} />)
  }

  if (filter.style === 'all') {
    filteredLessons = currentLessons.map(lesson => <LessonItem key={lesson._id} lesson={lesson}  user={user} />)
  }

  if (filter.style === 'eskrima') {
    filteredLessons = currentLessons
      .filter(lesson => lesson.style === 'Eskrima')
      .map(lesson => <LessonItem key={lesson._id} lesson={lesson}  user={user} />)
  }

  if (filter.style === 'bjj') {
    filteredLessons = currentLessons
      .filter(lesson => lesson.style === 'Brazilian Jiu-Jitsu')
      .map(lesson => <LessonItem key={lesson._id} lesson={lesson}  user={user} />)
  }

  if (filter.style === 'muaythai') {
    filteredLessons = currentLessons
      .filter(lesson => lesson.style === 'Muay Thai')
      .map(lesson => <LessonItem key={lesson._id} lesson={lesson}  user={user} />)
  }

  if (filter.sort === 'all') {
    filteredLessons = currentLessons.map(lesson => <LessonItem key={lesson._id} lesson={lesson}  user={user} />)
  }

  if (filter.sort === 'dates') {
    filteredLessons = currentLessons
      .sort((a, b) => b.date - a.date)
      .map(lesson => <LessonItem key={lesson._id} lesson={lesson}  user={user} />)
    }

  if (filter.sort === 'likes') {
    filteredLessons = currentLessons
      .sort((a, b) => b.likes.length - a.likes.length)
      .map(lesson => <LessonItem key={lesson._id} lesson={lesson}  user={user} />)
    }

  if (filter.sort === 'completes') {
    filteredLessons = currentLessons
      .sort((a, b) => b.completes.length - a.completes.length)
      .map(lesson => <LessonItem key={lesson._id} lesson={lesson}  user={user} />)
    }

  return loading ? <Loading /> : (
    <div className="lessons">
      <div className="lessons-header">
        <span class="title lessons-title" style={{ color: 'white' }}>LESSONS</span>
      </div>
      <div className="lessons-container">
        <div className="lessons-subcontainer">
        <div className="filter-container">
          <div class="field">
            <div class="control">
              <label class="label">Rank</label>
              <div class="select">
                <select onChange={e => onChange(e)} name="rank">
                <option value="all" selected>All Ranks</option>
                <option value="beg">Beginner</option>
                <option value="int">Intermediate</option>
                <option value="exp">Expert</option>
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
                  <option value="bjj">Brazilian Jiu-Jitsu</option>
                  <option value="muaythai">Muay Thai</option>
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
                  <option value="completes">Most Completed</option>
                </select>
              </div>
            </div>
          </div>
        </div>
          <div className="lessons-container">
            <div className="container">
              <div className="columns is-multiline">
                {
                  filteredLessons
                }
              </div>
            </div>
            {lessons.length <= 12 ? <></> : <Pagination itemsPerPage={lessonsPerPage} totalItems={lessons.length} paginate={paginate} />}
          </div>
        </div>
    </div>
    </div>
  );
};

Lessons.propTypes = {
  getLessons: PropTypes.func.isRequired,
  lesson: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  lesson: state.lesson
})

export default connect(mapStateToProps, { getLessons, loadUser })(Lessons);
