import React from 'react';

const LikeIcon = props => {
  const { likes } = props;

  return (
    <div className="control">
      <div className="tags has-addons">
        <span className="tag is-success">
          <i className="fas fa-thumbs-up" style={{ cursor: 'pointer' }} />
        </span>
        <span className="tag">{likes.length}</span>
      </div>
    </div>
  )
};

export default LikeIcon;
