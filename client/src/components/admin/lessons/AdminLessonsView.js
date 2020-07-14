import React, { Fragment, useState, useEffect } from 'react';
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
  const [ lessonsPerPage ] = useState(5);
  const [ deleteModal, toggleDeleteModal ] = useState(false);
  const [ completeModal, toggleCompleteModal ] = useState(false);
  const [ selectedLesson, setSelectedLesson ] = useState([])

  useEffect(() => {
    setFilteredLessons(
      lessons.filter(lesson => lesson.title.toLowerCase().includes(search.toLowerCase()))
    )
  }, [search, lessons])

  const indexOfLastLesson = currentPage * lessonsPerPage;

  const indexOfFirstLesson = indexOfLastLesson - lessonsPerPage;

  const currentLessons = filteredLessons.slice(indexOfFirstLesson, indexOfLastLesson);

  const paginate = pageNumber => setCurrentPage(pageNumber);

  return (
      <Fragment>
              <div className="form-wizard">
                <div className="field is-grouped is-grouped-centered">
                  <div className="control">
                    <input type="text" className="input" placeholder="Lesson search" onChange={e => setSearch(e.target.value)}/>
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
                          <td>{lesson.date}</td>
                          <td>
                            <i className="fas fa-search"
                              style={{ cursor: 'pointer' }}
                              onClick={() => {
                                setSelectedLesson(lesson)
                                toggleCompleteModal(true)
                              }}
                            />
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
                  <tfoot>
                    <Pagination lessonsPerPage={lessonsPerPage} totalLessons={lessons.length} paginate={paginate} />
                  </tfoot>
              </table>
          </div>
          {deleteModal ? <DeleteLesson toggleDeleteModal={toggleDeleteModal} lesson={selectedLesson} deleteLesson={deleteLesson} /> : <Fragment></Fragment>}
          {completeModal ? <LessonCompletes toggleCompleteModal={toggleCompleteModal} lesson={selectedLesson} removeComplete={removeComplete} /> : <Fragment></Fragment>}
        </Fragment>
    )
}

export default AdminLessonsView;
