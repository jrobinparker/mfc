import React from 'react';
import { Link } from 'react-router-dom';

 const ProfileWidget = ({ name }) => {
   return (
     <div className="column is-one-fifth">
       <div class="card">
        <div class="card-content">
              <p class="card-header-title">{name}</p>
              <button className="button is-primary"><Link to="/edit-profile">My Profile</Link></button>
        </div>
      </div>
    </div>
   )
 }

 export default ProfileWidget;
