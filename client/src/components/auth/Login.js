import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { login } from '../../actions/auth';
import './form.css';

const Login = ({ login, isAuthenticated, toggleModal }) => {
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
    toggleModal(false);
    return <Redirect to="/dashboard" />
  }

  return (
        <form>
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
