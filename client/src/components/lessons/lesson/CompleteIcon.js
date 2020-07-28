import React, { Fragment, useEffect, useState } from 'react';
import Moment from 'react-moment';

const CompleteIcon = ({ completes, user  }) => {
  const [ completeDate, setCompleteDate ] = useState(null);

  useEffect(() => {
    completes.filter(complete => complete.user === user._id).map(c => {
      setCompleteDate(c.date)
    })
  }, [completes])


  return (
    <div className="control">
      <div className="tags has-addons">
      {
        !completeDate ? <></> : (
          <Fragment>
            <span className="tag is-success">
              <i className="fas fa-check" />
            </span>
            <span className="tag">You completed this lesson on&nbsp;<Moment format='MM/DD/YYYY'>{completeDate}</Moment></span>
          </Fragment>
        )
      }
      </div>
    </div>
  )
};

export default CompleteIcon;
