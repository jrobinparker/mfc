import React, { Fragment, useState, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createProfile, getCurrentProfile } from '../../actions/profile';

const EditProfile = ({ profile: { profile, loading}, createProfile, getCurrentProfile, history }) => {
  const [ formData, setFormData ] = useState({
    rank: '',
    location: '',
    favStyles: '',
    skills: '',
    about: ''
  })

  useEffect(() => {
    getCurrentProfile();

    setFormData({
      rank: loading || !profile.rank ? '' : profile.rank,
      location: loading || !profile.location ? '' : profile.location,
      favStyles: loading || !profile.favStyles ? '' : profile.favStyles.join(', '),
      skills: loading || !profile.skills ? '' : profile.skills.join(', '),
      about: loading || !profile.about ? '' : profile.about
    });
  }, [loading])

  const { rank, location, favStyles, skills, about } = formData;

  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    console.log(formData.rank)
  };

  const onSubmit = e => {
    e.preventDefault();
    createProfile(formData, history, true);
  };

  return (
    <Fragment>
      <div className="container">
        <h1>Create Your MFC User Profile</h1>
        <form onSubmit={e => onSubmit(e)}>
            <div className="field">
              <label className="label">Rank</label>
                <div class="select">
                  <select onChange={e => onChange(e)} name="rank" value={rank}>
                    <option name="rank">White</option>
                    <option name="rank">Yellow</option>
                    <option name="rank">Green</option>
                    <option name="rank">Purple</option>
                    <option name="rank">Brown</option>
                    <option name="rank">Black</option>
                  </select>
                </div>
              </div>
            <div className="field">
              <label className="label">Location</label>
                <div class="control">
                  <input
                    className="input"
                    type='input'
                    value={location}
                    name='location'
                    placeholder='Enter your location'
                    onChange={e => onChange(e)}
                  />
              </div>
          </div>
          <div className="field">
            <label className="label">Favorite styles</label>
              <div class="control">
                <input
                  className="input"
                  type='input'
                  value={favStyles}
                  name='favStyles'
                  placeholder='Enter your favorite styles (comma separated)'
                  onChange={e => onChange(e)}
                />
            </div>
        </div>
        <div className="field">
          <label className="label">About Me</label>
            <div class="control">
              <textarea
                className="textarea"
                value={about}
                name='about'
                placeholder='I have been studying judo for 5 years...'
                onChange={e => onChange(e)}
              />
              <p class="help">Tell us about yourself</p>
          </div>
      </div>
          <button className="button is-primary">Update</button>
        </form>
      </div>
    </Fragment>
  )
};

EditProfile.propTypes = {
  createProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  getCurrentProfile: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile
})

export default connect(mapStateToProps, { createProfile, getCurrentProfile })(withRouter(EditProfile));
