import React, { useState } from 'react';
import { useRouter } from 'next/router';

import { Box, Button, useToast } from '@chakra-ui/react';
import { useReSubribeUserExistingCcMutation } from '../../generated/graphql';

const ReSubscribeMemberShipExisting = () => {
  const [reSubribeUserExistingCC] = useReSubribeUserExistingCcMutation();
  const toast = useToast();
  const router = useRouter();

  return (
    <Box mt={4}>
      <Button
        background='blue'
        color='white'
        onClick={() => {
          reSubribeUserExistingCC() as any;
          toast({
            title: 'Success',
            description: 'Your subrsciption has been renewed.',
            status: 'success',
            duration: 9000,
            isClosable: true,
          });
          router.push('/');
        }}
      >
        Subscribe Existing CC
      </Button>
    </Box>
  );
};

export default ReSubscribeMemberShipExisting;
