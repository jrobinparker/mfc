import React from 'react';

const LikeIcon = props => {
  const { id, likes, addLike, removeLike, user } = props;

  const findUserLike = likes => {
    if (likes && likes.filter(like => like.user === user._id).length > 0) {
      return (
          <i className="fas fa-thumbs-up" style={{ cursor: 'pointer' }} onClick={() => {
            removeLike(id)
          }} />
      )
    } else {
      return (
          <i className="fas fa-thumbs-up" style={{ cursor: 'pointer' }} onClick={() => {
            addLike(id)
          }} />
      )
    }
  }

  return (
    <div className="control">
      <div className="tags has-addons">
        <span className="tag is-success">
          {findUserLike(likes)}
        </span>
          <span className="tag">{likes.length}</span>
      </div>
    </div>
  )
};

export default LikeIcon;
