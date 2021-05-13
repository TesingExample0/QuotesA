import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

import CreateMembership from './CreateMembership';
import ChangeCredit from './ChangeCred';
import ReSubscribeMemberShipExNew from './ReSubscribeMemberShipNew';
const stripePromise = loadStripe(process.env.STRIPE_PUBLISHABLE!);

interface StripeWrapperProps {
  data: {
    customerType: string;
    ccLast4: string;
    email: string;
    name: string;
  };
}

const StripeWrapper: React.FC<StripeWrapperProps> = ({
  data,
  data: { customerType, ccLast4, email, name },
}) => {
  let membership = null;

  if (customerType === 'free-trial') {
    if (ccLast4) {
      membership = <ReSubscribeMemberShipExNew data={data} />;
    } else {
      membership = <CreateMembership />;
    }
  } else {
    membership = <ChangeCredit data={data} />;
  }

  return (
    <div>
      <Elements stripe={stripePromise}>{membership}</Elements>
    </div>
  );
};

export default StripeWrapper;
