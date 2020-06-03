import React from 'react';

const CompleteIcon = props => {
  const { completes } = props;

  return (
    <div className="control">
      <div className="tags has-addons">
        <span className="tag is-info">
          <i className="fas fa-check" style={{ cursor: 'pointer' }}/>
        </span>
        <span className="tag">{completes.length}</span>
      </div>
    </div>
  )
};

export default CompleteIcon;
