import React, { useEffect } from 'react';
import Moment from 'react-moment';
import RankIcon from './RankIcon';
import StyleIcon from './StyleIcon';
import SkillIcon from './SkillIcon';
import LikeIcon from './LikeIcon';
import CompleteIcon from './CompleteIcon';

const LessonHeader = props => {
  const { id, user, title, author, date, style, skills, rank, likes, completes, addLike, removeLike } = props;

  return (
    <div className="lesson-header">
        <span className="title lessons-title" style={{ color: 'white' }}>
          {title}
        </span>
        <div className="subtitle lessons-subtitle" style={{ marginTop: '10px', color: 'black'}}>
            <Moment format='MM/DD/YYYY'>{date}</Moment>
        </div>
        <div class="field is-grouped is-grouped-multiline lesson-metadata">
          <StyleIcon style={style} />
          <RankIcon rank={rank} />
          <LikeIcon likes={likes} id={id} user={user} addLike={addLike} removeLike={removeLike} />
          <CompleteIcon completes={completes} id={id} user={user} />
        </div>
        <div class="field is-grouped is-grouped-multiline lesson-metadata" style={{ marginTop: '1.5px' }}>
          {skills.map(skill => (
            <SkillIcon skill={skill} />
          ))}
        </div>
    </div>
  );
};

export default LessonHeader;
