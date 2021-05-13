import {
  Box,
  Button,
  Flex,
  Heading,
  Text,
  Img,
  useToast,
} from "@chakra-ui/react";
import { Formik, Form } from "formik";
import { NextPage } from "next";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { InputField } from "../../components/Inputs/InputField";
import { SelectField } from "../../components/Inputs/SelectField";
import { Wrapper } from "../../components/Wrapper";
import { useAcceptInviteMutation } from "../../generated/graphql";
import { toErrorMap } from "../../utils/toErrorMap";
import { withApollo } from "../../utils/withApollo";

const SubSubscriber: NextPage = () => {
  const router = useRouter();
  const [acceptInvite, { loading }] = useAcceptInviteMutation();
  const [tokenError, setTokenError] = useState("");
  const toast = useToast();
  //Show a congrats page instead of home page

  return (
    <Wrapper variant="regular">
      <Img
        boxSize="75px"
        objectFit="cover"
        src="/static/logo.png"
        alt="Logo"
        mx="auto"
      />
      <Heading>Welcome to Quote Actions</Heading>
      <Text>Please confirm your invite below:</Text>
      <Formik
        initialValues={{
          frequency: 1,
        }}
        onSubmit={async (values, { setErrors }) => {
          const response = await acceptInvite({
            variables: {
              subscribed: true,
              token:
                typeof router.query.token === "string"
                  ? router.query.token
                  : "",
              frequency: parseInt(values.frequency as any),
            },
          });

          if (response.data?.acceptInvite.errors) {
            const errorMap = toErrorMap(response.data.acceptInvite.errors);
            if ("token" in errorMap) {
              setTokenError(errorMap.token);
            }
          } else if (response.data?.acceptInvite.sub) {
            // worked
            toast({
              title: "Success",
              status: "success",
              duration: 4000,
              isClosable: true,
              description: "Thanks for confirming",
            });

            // router.push(`/confirmPassword`);
            router.push(`/`);
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            {tokenError ? (
              <Flex>
                <Box mr={2} style={{ color: "red" }}>
                  {tokenError}
                </Box>
              </Flex>
            ) : null}

            <Box mt={4}>
              <SelectField name="frequency" label="Frequency" />
            </Box>
            <Button
              mt={4}
              type="submit"
              isLoading={isSubmitting}
              background="blue"
              color="white"
            >
              Confirm Invite
            </Button>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

export default withApollo({ ssr: false })(SubSubscriber);
