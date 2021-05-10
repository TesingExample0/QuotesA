import { Box } from '@chakra-ui/react';
import React from 'react';
import { withApollo } from '../../utils/withApollo';
import StripeWrapper from '../Stripe';

interface UserSubscriptionProps {
  data: {
    email: string;
    name: string;
    customerType: string;
    ccLast4: string;
  };
}

const UserSubscription: React.FC<UserSubscriptionProps> = ({ data }) => {
  return (
    <Box mb={6} pr={12}>
      <StripeWrapper data={data} />
    </Box>
  );
};

export default withApollo({ ssr: false })(UserSubscription);
