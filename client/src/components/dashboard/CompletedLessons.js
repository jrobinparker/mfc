import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

const CompletedLessons = ({ lessons }) => {

  return(
    <div className="box">
      <h1 className="title profile-widget-title">Completed Lessons</h1>
      {lessons.map(l => <p><Link to={`/lesson/${l._id}`} target="_blank">{l.title}</Link></p>)}
    </div>
  )
};

export default CompletedLessons;
