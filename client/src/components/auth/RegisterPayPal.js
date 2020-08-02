import React, { Fragment, useState, useRef, useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { setAlert } from '../../actions/alert';
import { register } from '../../actions/auth';
import PropTypes from 'prop-types';
import './form.css';

const RegisterPayPal = ({ prevStep, onSubmit }) => {

  const [ error, setError ] = useState(null);

  let payPalRef = useRef();

  useEffect(() => {
    window.paypal
      .Buttons({
        style: {
            shape: 'rect',
            color: 'gold',
            layout: 'vertical',
            label: 'subscribe',

        },
        createSubscription: async (data, actions) => {
          return actions.subscription.create({
            'plan_id': 'P-53H03222WM693071DL4TT2UY'
          });
        },
        onApprove: async (data, actions) => {
          onSubmit();
        },
        onError: err => {
          setError(err);
          console.error(err);
        },
      })
      .render(payPalRef.current);
  }, []);
  return (
    <div className="paypal">
      <h1 className="title">MFC Online University Monthly Subscription - $20/month</h1>
      <p>Select a payment option to create your account.</p>
      <div ref={payPalRef} />
    </div>
  )
};

export default RegisterPayPal;
