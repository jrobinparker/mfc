import React, { Fragment, useState, useRef, useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { setAlert } from '../../actions/alert';
import { register } from '../../actions/auth';
import RegisterForm from './RegisterForm';
import RegisterPayPal from './RegisterPayPal';
import PropTypes from 'prop-types';

class Register extends React.Component {
  state = {
    currentStep: 1,
    name: '',
    email: '',
    password: '',
    password2: '',
    authenticated: false
  };

  nextStep = () => {
    let currentStep = this.state.currentStep;
    if (currentStep >= 2) {
     currentStep = 2;
    } else {
      currentStep = currentStep + 1;
    }

   this.setState({
     currentStep: currentStep
   });
  }

  prevStep = () => {
   let currentStep = this.state.currentStep;
   if (currentStep <= 1) {
     currentStep = 1;
   } else {
     currentStep = currentStep - 1;
   }

   this.setState({
     currentStep: currentStep
   });
 }

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  onSubmit = e => {
    const { name, email, password } = this.state
    console.log('processed payment')
    this.props.register({ name, email, password, role: 'basic' });
    console.log('registered')
  };

  render() {
    if (this.props.isAuthenticated) {
      this.props.toggleModal(false);
      return <Redirect to={{ pathname: "/dashboard", state: { newUserModal: true } }} />
    }

    switch (this.state.currentStep) {
      case 1:
        return <RegisterForm
                  nextStep={this.nextStep}
                  onChange={this.onChange}
                  name={this.state.name}
                  email={this.state.email}
                  password={this.state.password}
                  password2={this.state.password2}
                />
      case 2:
        return <RegisterPayPal
                  prevStep={this.prevStep}
                  onSubmit={this.onSubmit}
                />
      default:
        return <RegisterForm
                  nextStep={this.nextStep}
                  onChange={this.onChange}
                />

    }
  }
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
