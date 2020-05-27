import React from 'react';

const Register = () => {

    return (
        <div className="register" id="register">
          <h1>Register for Battle at the Shore 2020</h1>

          <div className="register-select">
            <div className="register-info">
              <div className="competitor">
                <h2>Competitor Registration</h2>
                <h3>Registration opens May 2020</h3>
                <p>Registration for one division costs $30</p>
                <p>Each additional division costs $15</p>
                <button className="reg-button" id="comp-button" disabled>
                  Register as a Competitor
                </button>
              </div>
            </div>
            <div className="register-info">
              <div className="volunteer">
                <h2>Volunteer Registration</h2>
                <h3>Registration opens May 2020</h3>
                <p>No spectactor fee</p>
                <p>Training will be provided and attendance at the meeting is required.</p>
                <button className="reg-button" disabled>
                  Register as a Volunteer
                </button>
              </div>
            </div>
          </div>
        </div>
  )
}

export default Register;
