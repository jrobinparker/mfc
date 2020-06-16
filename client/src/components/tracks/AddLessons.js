import React, { Fragment, useState, useEffect } from 'react';
import AddLessonsPagination from './AddLessonsPagination';
import './tracks.css';

const AddLessons = ({ lessons, addLessons, nextStep, prevStep }) => {

  const [ lessonsData, setLessonData ] = useState([]);
  const [ displayLessons, setToggleLessons ] = useState(false);
  const [ search, setSearch ] = useState('');
  const [ filteredLessons, setFilteredLessons ] = useState([]);
  const [ currentPage, setCurrentPage ] = useState(1);
  const [ lessonsPerPage ] = useState(5);

  useEffect(() => {
    setFilteredLessons(
      lessons.filter(lesson => lesson.title.toLowerCase().includes(search.toLowerCase()))
    )
  }, [search, lessons])

  const indexOfLastLesson = currentPage * lessonsPerPage;

  const indexOfFirstLesson = indexOfLastLesson - lessonsPerPage;

  const currentLessons = filteredLessons.slice(indexOfFirstLesson, indexOfLastLesson);

  const paginate = pageNumber => setCurrentPage(pageNumber)

  const addLesson = (e, lesson) => setLessonData(lessonsData.concat(lesson))

  const removeLesson = (e, lesson) => setLessonData(lessonsData.filter(lesson => lesson._id !== e.target.id))

  const saveAndContinue = e => {
    e.preventDefault()
    const { lessons } = lessonsData
    addLessons(lessons)
    nextStep()
  }

  const goBack = e => {
    e.preventDefault()
    prevStep()
  }

  return (
      <Fragment>
        <div className="container">
          <h1 className="title">Add Lessons</h1>
            <div className="box">
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
              <table className="table" style={{ width: '100%' }}>
                  <thead>
                    <th>Lesson Title</th>
                    <th>Rank</th>
                  </thead>
                  <tbody>
                    {currentLessons.map((lesson, i) => {
                      return (
                        <tr key={i}>
                          <td>
                            <i
                              className="fas fa-plus-circle add-lesson"
                              name={lesson.title}
                              id={lesson._id}
                              onClick={e => addLesson(e, lesson)}
                            />
                            {lesson.title}
                          </td>
                          <td>{lesson.rank}</td>
                        </tr>
                      )
                    })}
                  </tbody>
              </table>
              <AddLessonsPagination lessonsPerPage={lessonsPerPage} totalLessons={lessons.length} paginate={paginate} />

            <div style={{ textAlign: 'center', marginTop: '10px' }}>
                  <button
                    onClick={e => goBack(e)}
                    className="button is-secondary"
                    style={{ width: '40%', marginRight: '50px' }}
                  >
                    Back
                  </button>
                  <button
                    onClick={e => saveAndContinue(e)}
                    className="button is-primary"
                    style={{ width: '40%' }}
                  >
                    Next
                  </button>
                </div>
            </div>
          </div>
          <div className="box" style={{ marginTop: '20px' }}>
            <h1>
              Selected Lessons ({lessonsData.length})
              <i
                className="fas fa-angle-down display-selected-lessons"
                onClick={() => setToggleLessons(!displayLessons)}
              />
            </h1>
            { displayLessons ? (
              lessonsData.map(lesson =>
                <div className="selected-lesson">
                  <i
                    className="fas fa-times-circle delete-icon"
                    name={lesson.title}
                    id={lesson._id}
                    onClick={e => removeLesson(e, lesson)}
                  />
                  <span className="selected-lesson-title">
                    {lesson.title}
                  </span>
                </div>)
            ) : (
              <Fragment></Fragment>
            )}
          </div>
        </Fragment>
    )
}

export default AddLessons;
