import React, { useState } from 'react';

const Register = () => {
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
      alert('passwords do not match')
    } else {
      alert(formData)
    }
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
                required
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
                  required
                />
            </div>
        </div>
        <button className="button is-primary" onClick={e => onSubmit(e)}>Register</button>
      </form>
    </div>
  )
}

export default Register;