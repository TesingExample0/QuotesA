import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { Box, Button, Text, useToast } from '@chakra-ui/react';
import { useCreateSubscriptionMutation } from '../../generated/graphql';
import { useRouter } from 'next/router';
import { useOptions } from './StripeStyle';

const CreateMembership = () => {
  const stripe = useStripe();
  const elements = useElements();
  const toast = useToast();
  const router = useRouter();
  const options = useOptions();
  const [createSubscription] = useCreateSubscriptionMutation();
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    setSubmitting(true);

    if (!stripe || !elements) {
      setSubmitting(false);
      return;
    }

    const cardElement = elements.getElement(CardElement);

    const { error, source } = await stripe.createSource(cardElement!, {
      type: 'card',
    });

    if (error) {
      console.log('[error]', error);
      setSubmitting(false);
    } else {
      const response = await createSubscription({
        variables: {
          source: source?.id!,
          ccLast4: source?.card?.last4!,
        },
      });

      if (response.data?.createSubscription.errors) {
        setSubmitting(false);
        console.log(error);
      } else if (response.data?.createSubscription.user) {
        console.log('success');
        toast({
          title: 'Success',
          description: 'Your account information has been saved.',
          status: 'success',
          duration: 9000,
          isClosable: true,
        });
        router.push('/');
        setSubmitting(false);
      }
    }
  };

  return (
    <>
      <Box mb={6}>
        <Text mt={4} mb={4} fontSize='3xl'>
          Upgrade Subscription
        </Text>
        <Text fontSize='xl'>Your current subscription is Free Trial.</Text>
      </Box>
      <form onSubmit={handleSubmit}>
        <CardElement options={options} />

        <Button
          mt={4}
          type='submit'
          isDisabled={!stripe}
          background='blue'
          color='white'
          disabled={submitting}
        >
          Pay
        </Button>
      </form>
    </>
  );
};

export default CreateMembership;
