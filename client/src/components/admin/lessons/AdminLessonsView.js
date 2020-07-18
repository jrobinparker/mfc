import React, { Fragment, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import Pagination from '../../utils/Pagination';
import DeleteLesson from './DeleteLesson';
import LessonCompletes from './LessonCompletes';
import '../../tracks/tracks.css';

const AdminLessonsView = ({ lessons, deleteLesson, removeComplete }) => {

  const [ lessonsData, setLessonData ] = useState([]);
  const [ displayLessons, setToggleLessons ] = useState(false);
  const [ search, setSearch ] = useState('');
  const [ filteredLessons, setFilteredLessons ] = useState([]);
  const [ currentPage, setCurrentPage ] = useState(1);
  const [ lessonsPerPage ] = useState(10);
  const [ deleteModal, toggleDeleteModal ] = useState(false);
  const [ completeModal, toggleCompleteModal ] = useState(false);
  const [ selectedLesson, setSelectedLesson ] = useState([])

  const indexOfLastLesson = currentPage * lessonsPerPage;

  const indexOfFirstLesson = indexOfLastLesson - lessonsPerPage;

  const currentLessons = filteredLessons.slice(indexOfFirstLesson, indexOfLastLesson);

  const paginate = pageNumber => setCurrentPage(pageNumber);

  useEffect(() => {
    setFilteredLessons(lessons)
  }, [lessons])

  return (
      <Fragment>
              <div className="form-wizard">
                <div className="field is-grouped is-grouped-centered">
                  <div className="control">
                    <input type="text" className="input" placeholder="Lesson search" onChange={e => {
                      const term = e.target.value
                      setFilteredLessons(
                        lessons.filter(
                          lesson => lesson.title.toLowerCase().includes(term.toLowerCase())
                        )
                      )
                    }}/>
                  </div>
                  <div className="control">
                    <div class="select">
                        <select onChange={e => e.target.value === "" ? (
                          setFilteredLessons(lessons.filter(lesson => lesson.rank !== e.target.value))
                        ) : (
                          setFilteredLessons(lessons.filter(lesson => lesson.rank === e.target.value))
                        )} name="rank">
                          <option selected disabled>Rank Filter</option>
                          <option value="">All</option>
                          <option value="White">White</option>
                          <option value="Yellow">Yellow</option>
                          <option value="Green">Green</option>
                          <option value="Blue">Blue</option>
                          <option value="Purple">Purple</option>
                          <option value="Brown">Brown</option>
                          <option value="Black">Black</option>
                        </select>
                      </div>
                </div>
              </div>
              <table className="table" style={{ width: '100%', backgroundColor: 'hsl(0, 0%, 96%)' }}>
                  <thead>
                    <th>Lesson Title</th>
                    <th>Rank</th>
                    <th>Created</th>
                    <th></th>
                  </thead>
                  <tbody>
                    {currentLessons.map((lesson, i) => {
                      return (
                        <tr key={i}>
                          <td>{lesson.title}</td>
                          <td>{lesson.rank}</td>
                          <td><Moment format='MM/DD/YYYY'>{lesson.date}</Moment></td>
                          <td className="admin-actions">

                            <i className="fas fa-users"
                              style={{ cursor: 'pointer' }}
                              onClick={() => {
                                setSelectedLesson(lesson)
                                toggleCompleteModal(true)
                              }}
                            />
                            <Link to={`/lesson/${lesson._id}/edit`} target="_blank">
                              <i className="fas fa-edit" />
                            </Link>
                            <i
                              className="fas fa-times"
                              style={{ color: 'red', cursor: 'pointer' }}
                              onClick={() => {
                                setSelectedLesson(lesson)
                                toggleDeleteModal(true)
                              }}
                            />
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
              </table>
              <Pagination itemsPerPage={lessonsPerPage} totalItems={lessons.length} paginate={paginate} />
          </div>
          {deleteModal ? <DeleteLesson toggleDeleteModal={toggleDeleteModal} lesson={selectedLesson} deleteLesson={deleteLesson} /> : <Fragment></Fragment>}
          {completeModal ? <LessonCompletes toggleCompleteModal={toggleCompleteModal} lesson={selectedLesson} removeComplete={removeComplete} /> : <Fragment></Fragment>}
        </Fragment>
    )
}

export default AdminLessonsView;