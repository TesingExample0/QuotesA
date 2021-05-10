import React, { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Button,
  Box,
  useDisclosure,
  Text,
} from "@chakra-ui/react";
import { withApollo } from "../../utils/withApollo";

type outputProps = {
  body: string;
  subject: string;
};

const ViewModal: React.FC<outputProps> = ({ body, subject }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Button onClick={onOpen} mr={5}>
        View Template
      </Button>

      <Modal
        closeOnOverlayClick={false}
        isOpen={isOpen}
        onClose={onClose}
        size="4xl"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>View Template</ModalHeader>
          <ModalBody>
            <Box overflowY="scroll" overflowX="scroll" w="100%" h="380px">
              <Box mb={4}>
                <Text>Subject: {subject}</Text>
              </Box>
              <Box dangerouslySetInnerHTML={{ __html: body }}></Box>
            </Box>
          </ModalBody>
          <ModalCloseButton></ModalCloseButton>
        </ModalContent>
      </Modal>
    </>
  );
};

export default withApollo({ ssr: false })(ViewModal);
