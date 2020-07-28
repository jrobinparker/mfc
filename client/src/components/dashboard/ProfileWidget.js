import React from 'react';
import { Link } from 'react-router-dom';
import RankIcon from '../lessons/lesson/RankIcon';

 const ProfileWidget = ({ name, profile }) => {
   return (
     <div class="hero is-medium is-primary is-bold">
        <div class="hero-body">
          <div class="container">
            <h1 class="title">
              <span className="profile-name">{name} <Link to="/edit-profile"><i className="fas fa-edit profile-edit" /></Link></span>
            </h1>
            <h2 class="subtitle">
              {profile.about}
            </h2>
            <div class="field is-grouped is-grouped-multiline profile-icons">
              <RankIcon rank={profile.rank} />
            </div>
          </div>
        </div>
      </div>
   )
 }

 export default ProfileWidget;
