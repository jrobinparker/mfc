import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Loading from '../utils/Loading';
import ProfileWidget from './ProfileWidget';
import { getCurrentProfile } from '../../actions/profile';

const Dashboard = ({ getCurrentProfile, auth: { user }, profile: { profile, loading } }) => {
  useEffect(() => {
    getCurrentProfile();
  }, [])

  return loading && profile === null ? <Loading /> : (
      <Fragment>
        <div className="columns">
          {profile !== null ? (
              <ProfileWidget name={user && user.name} />
          ) : (
            <Fragment>
              <h2>Set up a profile</h2>
              <Link to='/create-profile'>Create your profile</Link>
            </Fragment>
          )}
        </div>
      </Fragment>
  );
};

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    profile: state.profile
})

export default connect(mapStateToProps, { getCurrentProfile })(Dashboard);
