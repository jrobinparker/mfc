import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { login } from '../../actions/auth';

const Login = ({ login, isAuthenticated }) => {
  const [ formData, setFormData ] = useState({
    email: '',
    password: ''
  });

  const { email, password } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value })

  const onSubmit = async e => {
    e.preventDefault();
    login(email, password);
  }

  if (isAuthenticated) {
    return <Redirect to="/dashboard" />
  }

  return (
    <div className="container auth-container">
      <div className="auth-form">
      <h1 className="title auth-form-title">Member Login</h1>
      <form className="box">
          <div className="field">
            <label className="label">Email</label>
              <div class="control">
                <input
                  className="input"
                  type='text'
                  value={email}
                  name='email'
                  placeholder='Email address'
                  onChange={e => onChange(e)}
                  required
                />
              </div>
            </div>
          <div className="field">
            <label className="label">Password</label>
              <div class="control">
                <input
                  className="input"
                  type='password'
                  value={password}
                  name='password'
                  placeholder='Enter a password'
                  onChange={e => onChange(e)}
                  required
                />
            </div>
        </div>
        <button className="button is-primary" onClick={e => onSubmit(e)}>Login</button>
      </form>
      </div>
    </div>
  )
}

login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, { login })(Login);
