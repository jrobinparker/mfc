import React, { Fragment, useState, useEffect } from 'react';

const AddLessons = ({ lessons, addLessons, nextStep, prevStep }) => {

  const [ lessonsData, setLessonData ] = useState({
    lessons: []
  });

  const addLesson = (e, lesson) => {
    if (e.target.checked) {
      setLessonData({
        lessons: lessonsData.lessons.concat(lesson)
      })
    } else {
      setLessonData({
        lessons: lessonsData.lessons.filter(lesson => lesson.title !== e.target.name)
      })
    }
  }

  const saveAndContinue = e => {
    e.preventDefault()
    const { lessons } = lessonsData.lessons
    addLessons(lessons)
    nextStep()
  }

  const goBack = e => {
    e.preventDefault()
    prevStep()
  }


  let lessonsList

  if (lessonsData.lessons && lessonsData.lessons.length > 0) {
      lessonsList = lessonsData.lessons.map(lesson => {
        return <li style={{ fontSize: '1.25rem', paddingBottom: '10px' }}><i class="check icon" />{lesson.title}</li>
      })
    }
    return (
      <Fragment>
        <div className="container">
          <h1 className="title">Add Lessons</h1>
            <div className="box">
              <table className="table" style={{ width: '100%' }}>
                  <thead>
                    <th>Add</th>
                    <th>Lesson Title</th>
                    <th>Rank</th>
                  </thead>
                  <tbody>
                    {lessons.map((lesson, i) => {
                      return (
                        <tr key={i}>
                          <td>
                            <input
                              type="checkbox"
                              name={lesson.title}
                              id={i}
                              style={{ marginTop: '5px' }}
                              onClick={(e) => addLesson(e, lesson)}
                            />
                          </td>
                          <td>{lesson.title}</td>
                          <td>{lesson.rank}</td>
                        </tr>
                      )
                    })}
                  </tbody>
              </table>

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
        </Fragment>
    )
}

export default AddLessons;
