import React, { useEffect } from 'react';

const LessonComments = props => {
  useEffect(() => {
    document.querySelector('.lesson-comments').scrollIntoView();
  }, []);

  const { comments } = props;

  return (
    <div className="lesson-comments">
      <h3 className="title">{comments.length} Comments</h3>
      <div className="comment-form">
        <div class="control">
          <textarea class="textarea is-hovered" placeholder="Add a comment"></textarea>
        </div>
        <button class="button is-link" style={{ marginTop: '15px' }}>Submit</button>
      </div>
    </div>
  )
};

export default LessonComments;
