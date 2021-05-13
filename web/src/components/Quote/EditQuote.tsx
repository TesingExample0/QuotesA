import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Box,
  useDisclosure,
} from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { withApollo } from "../../utils/withApollo";
import { InputField } from "../Inputs/InputField";
import { useUpdateQuoteMutation } from "../../generated/graphql";
import { ProfessionSelectField } from "../Inputs/ProfessionSelect";
import { toErrorMap } from "../../utils/toErrorMap";
interface EditQuoteProps {
  id: number;
  name: string;
  catagory: string;
}

const EditQuote: React.FC<EditQuoteProps> = ({ id, name, catagory }) => {
  const [updateQuote] = useUpdateQuoteMutation();
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button onClick={onOpen}>Edit</Button>
      <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit quote</ModalHeader>
          <ModalCloseButton />
          <Formik
            initialValues={{ name, catagory }}
            onSubmit={async (values, { setErrors }) => {
              const response = await updateQuote({
                variables: { id: id, ...values },
                update: (cache, { data }) => {
                  if (!data?.updateQuote!.errors) {
                    cache.evict({ fieldName: "quotes:{}" });
                  }
                },
              });
              if (response.data?.updateQuote!.errors) {
                setErrors(toErrorMap(response.data.updateQuote.errors));
                console.log(response.data.updateQuote.errors);
              } else if (response.data?.updateQuote!.quote) {
              }
              // onClose();
            }}
          >
            {({ isSubmitting }) => (
              <Form>
                <ModalBody pb={6}>
                  <InputField
                    name="name"
                    placeholder="name"
                    label="Name"
                    textarea
                  />
                  <ProfessionSelectField label="Catagory" name="catagory" />
                </ModalBody>

                <ModalFooter>
                  <Button
                    mr={3}
                    type="submit"
                    isLoading={isSubmitting}
                    background="blue"
                    color="white"
                  >
                    update quote
                  </Button>

                  <Button onClick={onClose}>Cancel</Button>
                </ModalFooter>
              </Form>
            )}
          </Formik>
        </ModalContent>
      </Modal>
    </>
  );
};

export default withApollo({ ssr: false })(EditQuote);
