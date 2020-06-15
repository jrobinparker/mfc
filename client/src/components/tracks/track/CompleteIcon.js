import React from 'react';

const CompleteIcon = props => {
  const { id, completes, addComplete, removeComplete, user  } = props;

  const findUserComplete = completes => {
    if (completes && completes.filter(complete => complete.user === user._id).length > 0) {
      return (
          <i className="fas fa-check" style={{ cursor: 'pointer' }} onClick={() => {
            removeComplete(id)
          }} />
      )
      console.log(completes)
    } else {
      return (
          <i className="fas fa-check" style={{ cursor: 'pointer' }} onClick={() => {
            addComplete(id)
          }} />
      )
      console.log(completes)
    }
  }


  return (
    <div className="control">
      <div className="tags has-addons">
        <span className="tag is-info">
          {findUserComplete(completes)}
        </span>
        <span className="tag">{completes.length}</span>
      </div>
    </div>
  )
};

export default CompleteIcon;
