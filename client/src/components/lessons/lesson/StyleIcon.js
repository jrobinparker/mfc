import React from 'react';

const StyleIcon = props => {
  const { style } = props;

  return (
    <div className="control">
      <div className="tag">
        {style}
      </div>
    </div>
  )
};

export default StyleIcon;
