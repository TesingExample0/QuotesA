import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { Box, Button, Select, Text, useToast } from '@chakra-ui/react';
import { useReSubribeUserNewCcMutation } from '../../generated/graphql';
import ReSubscribeMemberShipExisting from './ReSubscribeMemberShipExisting';
import { useOptions } from './StripeStyle';

interface ReSubscribeMemberShipExNewProps {
  data: {
    ccLast4: string;
  };
}

const ReSubscribeMemberShipExNew: React.FC<ReSubscribeMemberShipExNewProps> = ({
  data: { ccLast4 },
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const toast = useToast();
  const router = useRouter();
  const options = useOptions();
  const [reSubribeUserNewCC] = useReSubribeUserNewCcMutation();
  const [selectValue, setSelectValue] = useState('');
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

    console.log(source?.card?.last4);

    if (error) {
      setSubmitting(false);
      console.log('[error]', error);
    } else {
      const response = await reSubribeUserNewCC({
        variables: {
          source: source?.id!,
          ccLast4: source?.card?.last4!,
        },
      });
      setSubmitting(false);
      if (response.data?.reSubribeUserNewCC.errors) {
        console.log(error);
      } else if (response.data?.reSubribeUserNewCC.user) {
        console.log('success');
        toast({
          title: 'Success',
          description: 'Your subrsciption has been renewed.',
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
      <Text mb={4} fontSize='3xl'>
        Renew Your Subscription
      </Text>
      <Select
        placeholder='Select method of payment'
        onChange={(e) => {
          const value = e.currentTarget.value;
          setSelectValue(value);
        }}
        maxWidth='500px'
      >
        <option value='1'>Existing Credit Card ending in {ccLast4}</option>
        <option value='2'>Enter a new credit card</option>
      </Select>

      {selectValue === '1' && (
        <Box mb={6}>
          <ReSubscribeMemberShipExisting />
        </Box>
      )}

      {selectValue === '2' && (
        <Box mt={4}>
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
              Subscribe New
            </Button>
          </form>
        </Box>
      )}
    </>
  );
};

export default ReSubscribeMemberShipExNew;
