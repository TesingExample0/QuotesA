import React, { useState, useEffect } from "react";
import { NextPage } from "next";
import { Wrapper } from "../../components/Wrapper";
import { toErrorMap } from "../../utils/toErrorMap";
import {
  Box,
  Button,
  Flex,
  Heading,
  Text,
  Img,
  Select,
  Input,
  SimpleGrid,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { withApollo } from "../../utils/withApollo";
import {
  useUnsubscribeSubMutation,
  useSubbytokenQuery,
  useUpdateMailandFrequencyMutation,
  useCreateSubsfrwdpageMutation,
} from "../../generated/graphql";
import { InputField } from "../../components/Inputs/InputField";
import { Formik, Form } from "formik";
import { SelectField } from "../../components/Inputs/SelectField";

const Subfrwdpage: NextPage = () => {
  const router = useRouter();
  const { data } = useSubbytokenQuery({
    variables: {
      token: typeof router.query.token === "string" ? router.query.token : "",
    },
    notifyOnNetworkStatusChange: true,
  });
  const [createSub] = useCreateSubsfrwdpageMutation();
  return (
    <Box mx="auto" pt={30} pl={20} maxW="600px" w="100%">
      <Img
        boxSize="75px"
        objectFit="cover"
        src="/static/logo.png"
        alt="Logo"
        mx="auto"
      />
      <Box>
        <Heading>Welcome to Quote Actions</Heading>
        <Text mb={6}>Please confirm your subscription preference below:</Text>

        <Formik
          initialValues={{
            name: "",
            email: "",
            frequency: "1",
          }}
          onSubmit={async (values, { setErrors }) => {
            const response = await createSub({
              variables: {
                token:
                  typeof router.query.token === "string"
                    ? router.query.token
                    : "",
                frequency: parseFloat(values.frequency),
                email: values.email,
                name: values.name,
              },
            });
            // console.log(response.data);
            if (response.data?.createSubsfrwdpage.errors) {
              const errorMap = toErrorMap(
                response.data.createSubsfrwdpage.errors
              );
              setErrors(errorMap);
            } else if (response.data?.createSubsfrwdpage.sub) {
              console.log(response.data);
              router.push("/");
            }
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <Box flex="1" mr={6}>
                <InputField name="name" placeholder="name" label="Name" />
                <Box mt={4}>
                  <InputField name="email" placeholder="email" label="Email" />
                </Box>
                <Box mt={4} >
                  <SelectField name="frequency" label="Frequency" />
                </Box>
              </Box>

              <Button
                mt={4}
                type="submit"
                isLoading={isSubmitting}
                background="blue"
                color="white"
              >
                Subscribe
              </Button>
            </Form>
          )}
        </Formik>
      </Box>
    </Box>
  );
};

export default withApollo({ ssr: false })(Subfrwdpage);
