import React from 'react';
import { Link } from 'react-router-dom';
import RankIcon from '../lessons/lesson/RankIcon';

 const ProfileWidget = ({ name, profile }) => {
   return (
        <div className="box profile-header">
          <div className="profile-data">
              <h1 className="title profile-name">{name} <Link to="/edit-profile"><i className="fas fa-edit profile-edit" /></Link></h1>
              <p className="about-me">{profile.about}</p>
              <div class="field is-grouped is-grouped-multiline profile-icons">
                <RankIcon rank={profile.rank} />
              </div>
            </div>
        </div>
   )
 }

 export default ProfileWidget;
