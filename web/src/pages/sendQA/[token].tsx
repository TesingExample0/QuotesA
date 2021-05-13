import React, { useState, useEffect } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  Flex,
  Box,
  Select,
  Tooltip,
  Heading,
  Img,
  Text,
  Textarea,
} from "@chakra-ui/react";
import { NextPage } from "next";
import { withApollo } from "../../utils/withApollo";
import { useCreateSubFromContactMutation } from "../../generated/graphql";
import { useRouter } from "next/router";
import { InputField } from "../../components/Inputs/InputField";
import { Form, Formik } from "formik";

const SendQAtocontact: NextPage = () => {
  const router = useRouter();
  const [createSub] = useCreateSubFromContactMutation();
  return (
    <Box mx="auto" pt={30} pl={20} maxW="600px" w="100%">
      <Img
        boxSize="75px"
        objectFit="cover"
        src="/static/logo.png"
        alt="Logo"
        mx="auto"
      />
      <Heading>Welcome to Quote Actions</Heading>

      <Formik
        initialValues={{ emails: "" }}
        onSubmit={async (values, { setErrors }) => {
          const response = await createSub({
            variables: {
              token:
                typeof router.query.token === "string"
                  ? router.query.token
                  : "",
              emails: values.emails,
            },
          });
        }}
      >
        {({ isSubmitting }) => {
          return (
            <Form>
              <InputField
                name="emails"
                placeholder="Add emails here"
                textarea
                label="Add emails of your contacts"
                //@ts-ignore
                focusBorderColor = "blue.500"
                borderWidth="medium"
              />

              <Button
                mr={2}
                mt={4}
                type="submit"
                isLoading={isSubmitting}
                background="blue"
                color="white"
              >
                Send
              </Button>
            </Form>
          );
        }}
      </Formik>
    </Box>
  );
};

export default withApollo({ ssr: false })(SendQAtocontact);
