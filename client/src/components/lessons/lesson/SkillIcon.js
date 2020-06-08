import React from 'react';

const SkillIcon = props => {
  const { skill } = props;

  return (
    <div className="control">
      <div className="tag">
        {skill}
      </div>
    </div>
  )
};

export default SkillIcon;
