import React, { useEffect, useState } from 'react';

const LessonComments = props => {

  const { lessonId, comments, toggleComments } = props;

  return (
    <div className="lesson-comments">
      <h3 className="title">Comments</h3>
      <div>
      </div>
    </div>
  )
};

export default LessonComments;
