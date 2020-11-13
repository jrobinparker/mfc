import React, { useState, useRef, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
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
            'plan_id': 'P-6FC81467G3648802GL5P3E7Y'
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
  }, [onSubmit]);
  return (
    <div className="paypal">
      <h1 className="title">MFC Online University Monthly Subscription - $10/month</h1>
      <p>Select a payment option to create your account.</p>
      <div ref={payPalRef} />
    </div>
  )
};

export default RegisterPayPal;
