import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { setAlert } from '../../actions/alert';
import { register } from '../../actions/auth';
import PropTypes from 'prop-types';

const Register = ({ setAlert, register, isAuthenticated }) => {
  const [ formData, setFormData ] = useState({
    name: '',
    email: '',
    password: '',
    password2: ''
  });

  const { name, email, password, password2 } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value })

  const onSubmit = e => {
    e.preventDefault();
    if (password !== password2) {
      setAlert('Passwords do not match', 'danger', 5000);
    } else {
      register({ name, email, password });
    }
  }

  if (isAuthenticated) {
    return <Redirect to="/dashboard" />
  }

  return (
    <div className="container">
      <h1>Register</h1>
      <form>
        <div class="field">
          <label className="label">Full Name</label>
            <div class="control">
              <input
                className="input"
                type='text'
                value={name}
                name='name'
                placeholder='Full name'
                onChange={e => onChange(e)}
              />
          </div>
          </div>
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
                />
            </div>
        </div>
        <div className="field">
          <label className="label">Reenter Password</label>
            <div class="control">
                <input
                  className="input"
                  type='password'
                  value={password2}
                  name='password2'
                  placeholder='Reenter password'
                  onChange={e => onChange(e)}
                />
            </div>
        </div>
        <button className="button is-primary" onClick={e => onSubmit(e)}>Register</button>
      </form>
    </div>
  )
}

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, { setAlert, register })(Register);
