import React, { Fragment, useState } from 'react';
import './form.css';

const RegisterForm = ({ errMessage, onChange, name, email, password, password2, nextStep }) => {
  const [ alert, toggleAlert ] = useState(false);
  const [ msg, setMsg ] = useState('');

  const saveAndContinue = e => {
    e.preventDefault();
    if (name.length === 0 || email.length === 0 || password.length === 0 || password2.length === 0) {
      setMsg('Please complete all fields in the registration form.')
      toggleAlert(true)
      setTimeout(() => toggleAlert(false), 3000)
    } else if (password.length > 0 && password !== password2) {
      setMsg('Passwords do not match.')
      toggleAlert(true)
      setTimeout(() => toggleAlert(false), 3000)
    } else {
      nextStep();
    }
  };

  return (
      <form>
        {alert ? <div className="fade-in reg-notification notification is-danger">{msg}</div> : <Fragment></Fragment>}
        <div className="field">
          <label className="label">Full Name</label>
            <div className="control">
              <input
                className="input"
                type='text'
                name='name'
                value={name}
                placeholder='Full name'
                onChange={e => onChange(e)}
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Email</label>
              <div className="control">
                <input
                  className="input"
                  type='text'
                  name='email'
                  placeholder='Email address'
                  onChange={e => onChange(e)}
                />
              </div>
            </div>
          <div className="field">
            <label className="label">Password</label>
              <div className="control">
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
            <div className="control">
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
        <button className="button is-primary" onClick={e => saveAndContinue(e)}>
          Continue to Payment
        </button>
      </form>
  )
};

export default RegisterForm;
