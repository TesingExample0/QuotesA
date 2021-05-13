import React, { useRef } from 'react';
import {
  Box,
  IconButton,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Button,
} from '@chakra-ui/react';
import { DeleteIcon } from '@chakra-ui/icons';
import { useDeleteQuoteMutation, useMeQuery } from '../../generated/graphql';

interface DeleteQuoteButtonProps {
  id: number;
  creatorId: number;
}

export const DeleteQuoteButton: React.FC<DeleteQuoteButtonProps> = ({
  id,
  creatorId,
}) => {
  const { data: meData } = useMeQuery();
  const [deleteQuote] = useDeleteQuoteMutation();
  const [isOpen, setIsOpen] = React.useState(false);
  const onClose = () => setIsOpen(false);

  const cancelRef = useRef<HTMLDivElement>(null);

  if (meData?.me?.id !== creatorId) {
    return null;
  }

  return (
    <>
      <Box>
        <IconButton
          icon={<DeleteIcon />}
          aria-label='Delete Subcriber'
          onClick={() => setIsOpen(true)}
        />
      </Box>
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
              Delete Quote
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? You can't undo this action afterwards.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button onClick={onClose}>Cancel</Button>
              <Button
                colorScheme='red'
                onClick={async () => {
                  await deleteQuote({
                    variables: { id },
                    update: (cache) => {
                      cache.evict({ id: 'Quote:' + id });
                    },
                  });
                  onClose();
                }}
                ml={3}
              >
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};
