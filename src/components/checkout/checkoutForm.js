import React, { useState } from 'react';
import {
  CardElement,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  useStripe,
  useElements
} from '@stripe/react-stripe-js';
import StripeCheckout from 'react-stripe-checkout';
import styled from 'styled-components';

const FormRow = styled.div`
  display: -ms-flexbox;
  display: flex;
  -ms-flex-align: center;
  align-items: center;
  margin-left: 15px;
`;

const FormRowLabel = styled.label`
  width: 15%;
  min-width: 70px;
  padding: 11px 0;
  color: grey;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const FormRowInput = styled.input`
  font-size: 16px;
  width: 100%;
  padding: 11px 15px 11px 0;
  color: #fff;
  background-color: transparent;

  &::placeholder {
    color: #87bbfd;
  }
`;

const Submit = styled.button`
  display: block;
  font-size: 16px;
  width: calc(100% - 30px);
  height: 40px;
  margin: 40px 15px 0;
  background-color: #f6a4eb;
  box-shadow: 0 6px 9px rgba(50, 50, 93, 0.06), 0 2px 5px rgba(0, 0, 0, 0.08),
    inset 0 1px 0 #ffb9f6;
  border-radius: 4px;
  color: #fff;
  font-weight: 600;
  cursor: pointer;
  transition: all 100ms ease-in-out;
  will-change: transform, background-color, box-shadow;

  &:active {
    background-color: #d782d9;
    box-shadow: 0 6px 9px rgba(50, 50, 93, 0.06), 0 2px 5px rgba(0, 0, 0, 0.08),
      inset 0 1px 0 #e298d8;
    transform: scale(0.99);
  }

  &::disabled {
    opacity: 0.5;
    cursor: default;
    background-color: #7795f8;
    box-shadow: none;
  }
`;

const ErrorMsg = styled.div`
  color: #fff;
  position: absolute;
  display: flex;
  justify-content: center;
  padding: 0 15px;
  font-size: 13px;
  margin-top: 0px;
  width: 100%;
  transform: translateY(-15px);
  opacity: 0;
  animation: fade 150ms ease-out;
  animation-delay: 50ms;
  animation-fill-mode: forwards;
  will-change: opacity, transform;

  &svg {
    margin-right: 10px;
  }
`;

const CARD_OPTIONS = {
  style: {
    base: {
      iconColor: 'black',
      color: 'green',
      fontWeight: 500,
      fontFamily: 'Futura, Open Sans, Segoe UI, sans-serif',
      fontSize: '16px',
      ':-webkit-autofill': {
        color: 'green'
      },
      '::placeholder': {
        color: 'grey'
      }
    },
    invalid: {
      iconColor: '#FFC7EE',
      color: '#FFC7EE'
    }
  }
};

const CardField = ({ onChange, id }) => (
  <div>
    <div className="control">
      <div>
        <FormRowLabel htmlFor={id} className="label">
          Card Number
        </FormRowLabel>
      </div>
      <CardNumberElement options={CARD_OPTIONS} onChange={onChange} />
    </div>
    <div className="control">
      <div>
        <FormRowLabel htmlFor={id} className="label">
          Card Number
        </FormRowLabel>
      </div>
      <CardExpiryElement options={CARD_OPTIONS} onChange={onChange} />
    </div>
  </div>
);

const Field = ({
  label,
  id,
  type,
  placeholder,
  required,
  autoComplete,
  value,
  onChange
}) => (
  <FormRow className="control">
    <FormRowLabel htmlFor={id} className="label">
      {label}
    </FormRowLabel>
    <FormRowInput
      className="input"
      id={id}
      type={type}
      placeholder={placeholder}
      required={required}
      autoComplete={autoComplete}
      value={value}
      onChange={onChange}
    />
  </FormRow>
);

const SubmitButton = ({ processing, error, children, disabled }) => (
  <Submit
    className={`SubmitButton ${error ? 'SubmitButton--error' : ''}`}
    type="submit"
    disabled={processing || disabled}
  >
    {processing ? 'Processing...' : children}
  </Submit>
);

const ErrorMessage = ({ children }) => (
  <ErrorMsg className="ErrorMessage" role="alert">
    <svg width="16" height="16" viewBox="0 0 17 17">
      <path
        fill="#FFF"
        d="M8.5,17 C3.80557963,17 0,13.1944204 0,8.5 C0,3.80557963 3.80557963,0 8.5,0 C13.1944204,0 17,3.80557963 17,8.5 C17,13.1944204 13.1944204,17 8.5,17 Z"
      />
      <path
        fill="#6772e5"
        d="M8.5,7.29791847 L6.12604076,4.92395924 C5.79409512,4.59201359 5.25590488,4.59201359 4.92395924,4.92395924 C4.59201359,5.25590488 4.59201359,5.79409512 4.92395924,6.12604076 L7.29791847,8.5 L4.92395924,10.8739592 C4.59201359,11.2059049 4.59201359,11.7440951 4.92395924,12.0760408 C5.25590488,12.4079864 5.79409512,12.4079864 6.12604076,12.0760408 L8.5,9.70208153 L10.8739592,12.0760408 C11.2059049,12.4079864 11.7440951,12.4079864 12.0760408,12.0760408 C12.4079864,11.7440951 12.4079864,11.2059049 12.0760408,10.8739592 L9.70208153,8.5 L12.0760408,6.12604076 C12.4079864,5.79409512 12.4079864,5.25590488 12.0760408,4.92395924 C11.7440951,4.59201359 11.2059049,4.59201359 10.8739592,4.92395924 L8.5,7.29791847 L8.5,7.29791847 Z"
      />
    </svg>
    {children}
  </ErrorMsg>
);

const ResetButton = ({ onClick }) => (
  <button type="button" className="ResetButton" onClick={onClick}>
    <svg width="32px" height="32px" viewBox="0 0 32 32">
      <path
        fill="#FFF"
        d="M15,7.05492878 C10.5000495,7.55237307 7,11.3674463 7,16 C7,20.9705627 11.0294373,25 16,25 C20.9705627,25 25,20.9705627 25,16 C25,15.3627484 24.4834055,14.8461538 23.8461538,14.8461538 C23.2089022,14.8461538 22.6923077,15.3627484 22.6923077,16 C22.6923077,19.6960595 19.6960595,22.6923077 16,22.6923077 C12.3039405,22.6923077 9.30769231,19.6960595 9.30769231,16 C9.30769231,12.3039405 12.3039405,9.30769231 16,9.30769231 L16,12.0841673 C16,12.1800431 16.0275652,12.2738974 16.0794108,12.354546 C16.2287368,12.5868311 16.5380938,12.6540826 16.7703788,12.5047565 L22.3457501,8.92058924 L22.3457501,8.92058924 C22.4060014,8.88185624 22.4572275,8.83063012 22.4959605,8.7703788 C22.6452866,8.53809377 22.5780351,8.22873685 22.3457501,8.07941076 L22.3457501,8.07941076 L16.7703788,4.49524351 C16.6897301,4.44339794 16.5958758,4.41583275 16.5,4.41583275 C16.2238576,4.41583275 16,4.63969037 16,4.91583275 L16,7 L15,7 L15,7.05492878 Z M16,32 C7.163444,32 0,24.836556 0,16 C0,7.163444 7.163444,0 16,0 C24.836556,0 32,7.163444 32,16 C32,24.836556 24.836556,32 16,32 Z"
      />
    </svg>
  </button>
);

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  const [cardComplete, setCardComplete] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [billingDetails, setBillingDetails] = useState({
    email: '',
    phone: '',
    name: ''
  });

  const handleSubmit = async event => {
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }

    if (error) {
      elements.getElement('card').focus();
      return;
    }

    if (cardComplete) {
      setProcessing(true);
    }

    const payload = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement),
      billing_details: billingDetails
    });

    setProcessing(false);

    if (payload.error) {
      setError(payload.error);
    } else {
      setPaymentMethod(payload.paymentMethod);
    }
  };

  const reset = () => {
    setError(null);
    setProcessing(false);
    setPaymentMethod(null);
    setBillingDetails({
      email: '',
      phone: '',
      name: ''
    });
  };

  const onToken = (token, addresses) => {
    console.log(token, addresses);
  };

  return (
    <StripeCheckout
      name="Fire beat"
      description="AIDS"
      image={`${process.env.REACT_APP_NOMAD_MUSIC_S3}/bleak/cover/cover_bleak.jpg`}
      stripeKey={process.env.REACT_APP_PUBLIC_STRIPE_KEY}
      amount={1000000}
      token={onToken}
    />
  );
};

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
export default CheckoutForm;