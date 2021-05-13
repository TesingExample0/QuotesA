import React, { useRef } from "react";
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
} from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";
import { useDeleteTemplateMutation, useMeQuery } from "../../generated/graphql";

interface DeleteTemplateButtonProps {
  id: number;
}

export const DeleteTemplateButton: React.FC<DeleteTemplateButtonProps> = ({
  id,
}) => {
  const { data: meData } = useMeQuery();
  const [deleteTemplate] = useDeleteTemplateMutation();
  const [isOpen, setIsOpen] = React.useState(false);
  const onClose = () => setIsOpen(false);
  const cancelRef = useRef<HTMLDivElement>(null);


  return (
    <>
      <Box>
        <IconButton
          icon={<DeleteIcon />}
          aria-label="Delete Template"
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
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete Template
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? You can't undo this action afterwards.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button onClick={onClose}>Cancel</Button>
              <Button
                colorScheme="red"
                onClick={async () => {
                  await deleteTemplate({
                    variables: { id },
                    update: (cache) => {
                      cache.evict({ id: "Templates:" + id });
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
