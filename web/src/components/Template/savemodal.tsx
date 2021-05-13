import React, { useState } from "react";
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
  useToast,
} from "@chakra-ui/react";
import { withApollo } from "../../utils/withApollo";
import { Form, Formik } from "formik";
import { useCreateTemplatesMutation } from "../../generated/graphql";
import { InputField } from "../Inputs/InputField";
import { toErrorMap } from "../../utils/toErrorMap";

type outputProps = {
  body: string;
  subject: string;
};

const Savemodal: React.FC<outputProps> = ({ body, subject }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [addtemplate] = useCreateTemplatesMutation();
  const toast = useToast();
  return (
    <>
      <Button onClick={onOpen}>Save Template</Button>
      <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Save Template</ModalHeader>
          <Formik
            initialValues={{ title: "" }}
            onSubmit={async (values, { setErrors }) => {
              if (body.length === 8) {
                toast({
                  title: "Empty Template",
                  status: "warning",
                  duration: 3000,
                  isClosable: true,
                });
              } else {
                const response = await addtemplate({
                  variables: {
                    input: {
                      body: body,
                      title: values.title,
                      subject: subject,
                    },
                  },
                });
                if (response.data?.createTemplates.errors) {
                  // if()
                  console.log(response.data?.createTemplates.errors[0].field);
                  if (
                    response.data?.createTemplates.errors[0].field === "subject"
                  ) {
                    toast({
                      title: response.data?.createTemplates.errors[0].message,
                      status: "warning",
                      duration: 3000,
                      isClosable: true,
                    });
                  }

                  const errorMap = toErrorMap(
                    response.data.createTemplates.errors
                  );
                  setErrors(errorMap);
                } else if (response.data?.createTemplates.template) {
                  toast({
                    title: "Saved",
                    status: "success",
                    duration: 3000,
                    isClosable: true,
                  });
                }
              }
            }}
          >
            {({ isSubmitting }) => {
              return (
                <Form>
                  {isSubmitting ? null : <ModalCloseButton />}
                  <ModalBody pb={6}>
                    <Box mt={4}>
                      <InputField
                        name="title"
                        placeholder="Title"
                        label="Title"
                      />
                    </Box>
                  </ModalBody>
                  <ModalFooter>
                    <Button
                      mr={2}
                      type="submit"
                      isLoading={isSubmitting}
                      background="blue"
                      color="white"
                    >
                      Save
                    </Button>
                    <Button isLoading={isSubmitting} onClick={onClose}>
                      Cancel
                    </Button>
                  </ModalFooter>
                </Form>
              );
            }}
          </Formik>
        </ModalContent>
      </Modal>
    </>
  );
};

export default withApollo({ ssr: false })(Savemodal);
