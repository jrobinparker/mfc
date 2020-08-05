import React, { Fragment, useEffect } from 'react';
import Moment from 'react-moment';
import RankIcon from './RankIcon';
import StyleIcon from './StyleIcon';
import SkillIcon from './SkillIcon';
import LikeIcon from './LikeIcon';
import CompleteIcon from './CompleteIcon';

const TrackHeader = ({ id, user, title, author, created, style, skills, rank, completes }) => {

  return (
    <div className="lesson-header">
        <span className="title lessons-title" style={{ color: 'white' }}>
          {title}
        </span>
        <div className="subtitle lessons-subtitle" style={{ marginTop: '10px', color: 'black' }}>
          <Moment format='MM/DD/YYYY'>{created}</Moment>
        </div>
        <div class="field is-grouped is-grouped-multiline lesson-metadata">
          { !style ? <></> : <StyleIcon style={style} /> }
          { !rank ? <></> : <RankIcon rank={rank} /> }
          <CompleteIcon completes={completes} user={user._id} />
        </div>
        <div class="field is-grouped is-grouped-multiline lesson-metadata" style={{ marginTop: '1.5px' }}>
        </div>
    </div>
  );
};

export default TrackHeader;
