import React from 'react';

const RankIcon = props => {
  const { rank } = props;

  if (rank === 'black') {
    return (
      <div className="control">
        <div className="tag is-black" style={{ backgroundColor: `${rank}` }}>
          {rank}
        </div>
      </div>
    )
  } else {
    return (
      <div className="control">
        <div className="tag" style={{ backgroundColor: `${rank}` }}>
          {rank}
        </div>
      </div>
    )
  }
};

export default RankIcon;
