import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

const LessonsInProgress = ({ lessons }) => {

  return(
    <div className="box">
      <h1 className="title">Lessons in Progress</h1>
      {lessons.map(l => <p><Link to={`/lesson/${l._id}`} target="_blank">{l.title}</Link></p>)}
    </div>
  )
};

export default LessonsInProgress;
