import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import Loading from '../utils/Loading';

const CompletedTracks = ({ tracks }) => {
    return (
      <div className="box">
        <h1 className="title profile-widget-title">Completed Tracks</h1>
        {tracks.map(t => <p><Link to={`/track/${t._id}`}>{t.title}</Link></p>)}
      </div>
    )
};

export default CompletedTracks;
