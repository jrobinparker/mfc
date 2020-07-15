import React from 'react';
import { Link } from 'react-router-dom';

const ReviewTrack = ({ mode, buttonText, prevStep, onSubmit, track: { title, description, rank, style, skills, lessons }}) => {

    const saveTrack = e => {
      e.preventDefault();
      onSubmit(e)
    }

    return (
      <div className="container">
        <h1 className="title">{mode}</h1>
        <nav className="panel">
          <p className="panel-heading">Review Track</p>
            <div className="form-wizard">
              <label className="label">
                Course Title: {title}
              </label>
              <label className="label">
                Description: {description}
              </label>
              <label className="label">
                Rank: {rank}
              </label>
              <label className="label">
                Style: {style}
              </label>
              <label className="label">
                Skills: {skills}
              </label>
              <label className="label">
                Lessons:
              </label>
                <ol style={{ marginLeft: '20px' }}>
                {lessons.map(lesson => {
                  return <li style={{ marginBottom: '10px' }}><Link to={`/lesson/${lesson._id}`} target="_blank" rel="noopener noreferrer">{lesson.title}</Link></li>
                })}
                </ol>
            </div>
          </nav>
              <div style={{ textAlign: 'center', marginTop: '10px' }}>
                <button onClick={() => prevStep()} className="button" style={{ width: '40%', marginRight: '50px' }}>Back</button>
                <button onClick={e => saveTrack(e)} className="button is-primary" style={{ width: '40%' }}>{buttonText}</button>
              </div>
      </div>

    )
}

export default ReviewTrack;
