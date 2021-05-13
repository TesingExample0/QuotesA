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
import { useDeleteSubMutation, useMeQuery } from '../../generated/graphql';

interface DeleteSubButtonsProps {
  id: number;
  creatorId: number;
}

export const DeleteSubButtons: React.FC<DeleteSubButtonsProps> = ({
  id,
  creatorId,
}) => {
  const { data: meData } = useMeQuery();
  const [deleteSub] = useDeleteSubMutation();
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
              Delete Customer
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? You can't undo this action afterwards.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button onClick={onClose}>Cancel</Button>
              <Button
                colorScheme='red'
                onClick={async () => {
                  await deleteSub({
                    variables: { id },
                    update: (cache) => {
                      cache.evict({ id: 'Sub:' + id });
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
