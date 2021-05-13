import React, { useState } from 'react';
import { useRouter } from 'next/router';
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogOverlay,
  Box,
  Button,
  useToast,
  AlertDialogHeader,
} from '@chakra-ui/react';
import { useCancelSubscriptionMutation } from '../../generated/graphql';

const CancelMemeberhip = () => {
  const [cancelSubscription] = useCancelSubscriptionMutation();
  const [isOpen, setIsOpen] = React.useState(false);
  const onClose = () => setIsOpen(false);
  const cancelRef = React.useRef() as any;
  const toast = useToast();
  const router = useRouter();

  return (
    <>
      <Box mt={4}>
        <Button onClick={() => setIsOpen(true)}>Cancel Memebership</Button>
      </Box>
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
              Cancel Memebership
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? You can't undo this action afterwards.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                No
              </Button>
              <Button
                colorScheme='red'
                onClick={() => {
                  onClose();
                  cancelSubscription() as any;
                  toast({
                    title: 'Success',
                    description: 'Your account information has been saved.',
                    status: 'success',
                    duration: 9000,
                    isClosable: true,
                  });

                  router.push('/');
                }}
                ml={3}
              >
                Yes
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};

export default CancelMemeberhip;
