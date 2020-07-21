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
        <h1 className="title">
          {title}
        </h1>
        <h3 className="subtitle">
            <Moment format='MM/DD/YYYY'>{created}</Moment>
        </h3>
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
