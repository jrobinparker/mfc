import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getLessons } from '../../actions/lesson';
import { loadUser } from '../../actions/auth';
import LessonItem from './LessonItem';
import Filter from './Filter';
import Loading from '../utils/Loading';
import Pagination from '../utils/Pagination';

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

  if (filter.rank === 'white') {
    filteredLessons = currentLessons
      .filter(lesson => lesson.rank === 'White')
      .map(lesson => <LessonItem key={lesson._id} lesson={lesson}  user={user} />)
  }

  if (filter.rank === 'yellow') {
    filteredLessons = currentLessons
      .filter(lesson => lesson.rank === 'Yellow')
      .map(lesson => <LessonItem key={lesson._id} lesson={lesson}  user={user} />)
  }

  if (filter.rank === 'green') {
    filteredLessons = currentLessons
      .filter(lesson => lesson.rank === 'Green')
      .map(lesson => <LessonItem key={lesson._id} lesson={lesson}  user={user} />)
  }

  if (filter.rank === 'blue') {
    filteredLessons = currentLessons
      .filter(lesson => lesson.rank === 'Blue')
      .map(lesson => <LessonItem key={lesson._id} lesson={lesson}  user={user} />)
  }

  if (filter.rank === 'purple') {
    filteredLessons = currentLessons
      .filter(lesson => lesson.rank === 'Purple')
      .map(lesson => <LessonItem key={lesson._id} lesson={lesson}  user={user} />)
  }

  if (filter.rank === 'brown') {
    filteredLessons = currentLessons
      .filter(lesson => lesson.rank === 'Brown')
      .map(lesson => <LessonItem key={lesson._id} lesson={lesson}  user={user} />)
  }

  if (filter.rank === 'black') {
    filteredLessons = currentLessons
      .filter(lesson => lesson.rank === 'Black')
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
    <Fragment>
    <div class="hero is-small">
       <div class="hero-body">
         <div class="container">
           <h1 class="title">
             Lessons
           </h1>
           <h2 class="subtitle">
             Watch recorded lessons taught by Sensei Joe Parker
           </h2>
         </div>
       </div>
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
                  <option value="completes">Most Completed</option>
                </select>
              </div>
            </div>
          </div>
        </div>
          <div className="lessons-container">
            <div className="container" style={{ height: '70vh' }}>
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
    </Fragment>
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
