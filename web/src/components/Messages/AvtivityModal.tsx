import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
  Td,
  Box,
  Text,
  Grid,
} from "@chakra-ui/react";
import { withApollo } from "../../utils/withApollo";

interface ActivityProps {
  id: number;
  subject: string;
  openCount: number;
  clickCount: number;
  sendDate: number;
  senderMail: string;
  reciverMail: string;
  senderName: string;
  reciverName: string;
  Status: string;
  body: string;
}

const ActivityModal: React.FC<ActivityProps> = ({
  id,
  subject,
  openCount,
  clickCount,
  sendDate,
  senderMail,
  senderName,
  reciverMail,
  reciverName,
  Status,
  body,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button onClick={onOpen}>Details</Button>
      <Modal
        closeOnOverlayClick={false}
        isOpen={isOpen}
        onClose={onClose}
        size="4xl"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Message Details</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box overflowY="scroll" h="600px">
              <Grid templateColumns="repeat(2, 1fr)" gap={6} mt={2} mb={6}>
                <Text>Sender Name</Text>
                <Text>{senderName}</Text>
              </Grid>
              <hr />

              <Grid templateColumns="repeat(2, 1fr)" gap={6} mt={2} mb={6}>
                <Text>Sender Mail</Text>
                <Text>{senderMail}</Text>
              </Grid>
              <hr />

              <Grid templateColumns="repeat(2, 1fr)" gap={6} mt={2} mb={6}>
                <Text>Receiver Name</Text>
                <Text>{reciverName}</Text>
              </Grid>
              <hr />

              <Grid templateColumns="repeat(2, 1fr)" gap={6} mt={2} mb={6}>
                <Text>Receiver Mail</Text>
                <Td>{reciverMail}</Td>
              </Grid>
              <hr />

              <Grid templateColumns="repeat(2, 1fr)" gap={6} mt={2} mb={6}>
                <Text>Send Date</Text>
                <Text>{sendDate}</Text>
              </Grid>
              <hr />

              <Grid templateColumns="repeat(2, 1fr)" gap={6} mt={2} mb={6}>
                <Text>Status</Text>
                <Text>{Status}</Text>
              </Grid>
              <hr />

              <Grid templateColumns="repeat(2, 1fr)" gap={6} mt={2} mb={6}>
                <Text>Open</Text>
                <Text>{openCount}</Text>
              </Grid>
              <hr />

              <Grid templateColumns="repeat(2, 1fr)" gap={6} mt={2} mb={6}>
                <Text>Clicked</Text>
                <Text>{clickCount}</Text>
              </Grid>
              <hr />

              <Grid templateColumns="repeat(2, 1fr)" gap={6} mt={2} mb={6}>
                <Text>Quote subject</Text>
                <Text>{subject}</Text>
              </Grid>
              <hr />

              <Grid templateColumns="repeat(2, 1fr)" gap={6} mt={2} mb={6}>
                <Text>Quote Body</Text>
                <Text>{body}</Text>
              </Grid>
              <hr />
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default withApollo({ ssr: false })(ActivityModal);
