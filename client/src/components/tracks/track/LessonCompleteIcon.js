import React, { useEffect, useState } from 'react';
import Moment from 'react-moment';

const LessonCompleteIcon = ({ completes, user }) => {
  const [ completed, setCompleted ] = useState(false);

  useEffect(() => {
    completes.filter(complete => complete.user === user._id).map(c => {
      setCompleted(true)
    })
  }, [completes])


  return (
    <div className="control">
      <div className="tags has-addons">
      {
        !completed ? <></> : <i className="fas fa-check-circle" />
      }
      </div>
    </div>
  )
};

export default LessonCompleteIcon;
