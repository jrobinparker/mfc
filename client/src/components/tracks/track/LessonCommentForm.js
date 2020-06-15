import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addComment, deleteComment } from '../../../actions/lesson';

const LessonCommentForm = ({ lessonId, addComment, deleteComment }) => {
  const [ commentText, setCommentText ] = useState('');

  return (
    <form
      className="comment-form"
      onSubmit={e => {
        e.preventDefault();
        console.log(lessonId, commentText);
        addComment(lessonId, { commentText });
        setCommentText('');
      }}
      >
      <div class="control">
        <textarea
          class="textarea is-hovered"
          placeholder="Add a comment"
          onChange={e =>
            setCommentText(e.target.value)
          }
        />
      </div>
      <button class="button is-link" style={{ marginTop: '15px' }}>Submit</button>
    </form>
  )
};

export default connect(null, { addComment, deleteComment })(LessonCommentForm);
