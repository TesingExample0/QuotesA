import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { Button, Text, useToast } from '@chakra-ui/react';
import { useChangeCreditCardMutation } from '../../generated/graphql';
import { useOptions } from './StripeStyle';

interface ChangeCreditProps {
  data: {
    ccLast4: string;
  };
}

const ChangeCredit: React.FC<ChangeCreditProps> = ({ data: { ccLast4 } }) => {
  const stripe = useStripe();
  const elements = useElements();
  const toast = useToast();
  const router = useRouter();
  const [changeCreditCard] = useChangeCreditCardMutation();
  const options = useOptions();
  const [error, setError] = useState('');
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
      setSubmitting(false);
      setError(error.message as string);
      console.log('[error]', error);
    } else {
      const response = await changeCreditCard({
        variables: {
          source: source?.id!,
          ccLast4: source?.card?.last4!,
        },
      });
      setSubmitting(false);
      if (response.data?.changeCreditCard.errors) {
        console.log(error);
      } else if (response.data?.changeCreditCard.user) {
        console.log('success');
        toast({
          title: 'Success',
          description: 'Your account information has been saved.',
          status: 'success',
          duration: 9000,
          isClosable: true,
        });
        router.push('/');
      }
    }
  };

  return (
    <>
      <Text mt={4} mb={4} fontSize='3xl'>
        Update credit card ending in {ccLast4}
      </Text>
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

export default ChangeCredit;
