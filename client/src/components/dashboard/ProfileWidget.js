import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import RankIcon from '../lessons/lesson/RankIcon';

 const ProfileWidget = ({ name, profile, inProgress, completedLessons, completedTracks }) => {

   return (
     <div className="hero is-medium is-primary is-bold">
        <div className="hero-body">
          <div className="container">
            <h1 className="title">
              <span className="profile-name">{name} <Link to="/edit-profile"><i className="fas fa-edit profile-edit" /></Link></span>
            </h1>
            <div className="hero-stats">
              <h2 className="subtitle hero-stat">
                <span className="hero-stat-number">{inProgress}</span>
                <div>lessons in progress</div>
              </h2>
              <h2 className="subtitle hero-stat">
                <span className="hero-stat-number">{completedLessons}</span>
                <div>completed lessons</div>
              </h2>
              <h2 className="subtitle hero-stat">
                <span className="hero-stat-number">{completedTracks}</span>
                <div>completed tracks</div>
              </h2>
            </div>
          </div>
        </div>
      </div>
   )
 }

 export default ProfileWidget;
