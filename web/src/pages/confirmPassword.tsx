import React, { useState, useEffect } from "react";
import { withApollo } from "../utils/withApollo";
import { useUpdateUserAuthMutation } from "../generated/graphql";
import { Box, Text, Button, useToast } from "@chakra-ui/react";
import { Formik, Form } from "formik";
import { InputField } from "../components/Inputs/InputField";
import { toErrorMap } from "../utils/toErrorMap";
import { useMeQuery } from "../generated/graphql";
import { useRouter } from "next/router";

const confirmPassword = () => {
  const [updateAuth] = useUpdateUserAuthMutation();
  const toast = useToast();
  const [Loader, setLoader] = useState(true);
  const { data, loading } = useMeQuery();
  const router = useRouter();
  useEffect(() => {
    if (data) {
      setLoader(false);
    }
  }, [data]);

  return (
    <Box mb={6} pr={12}>
      {Loader ? (
        <div>
          <img className="loader" src="/static/Loader.gif" />
        </div>
      ) : (
        <>
          <Text mt={4} mb={4} fontSize="3xl">
            Manage your security
          </Text>
          <Formik
            initialValues={{
              email: data!.me!.email,
              //   email: null,
              password: null,
              confirm: null,
            }}
            onSubmit={async (values, { setErrors }) => {
              let confirm;
              let password;

              if (values.password !== "") {
                password = values.password;
                confirm = values.confirm;   
              }
              const response = await updateAuth({
                variables: {
                  input: {
                    email: values.email,
                    password,
                    confirm,
                  },
                },
              });
              if (response.data?.updateAuth.errors) {
                const errorMap = toErrorMap(response.data.updateAuth.errors);
                setErrors(errorMap);
              } else if (response.data?.updateAuth.user) {
                toast({
                  title: "Success",
                  description: "Your account information has been saved.",
                  status: "success",
                  duration: 9000,
                  isClosable: true,
                });
                router.push("/");
              }
            }}
          >
            {({ isSubmitting }) => (
              <Form>
                <Box mt={4}>
                  <InputField name="email" placeholder="email" label="Email" />
                </Box>
                <Box mt={4}>
                  <InputField
                    name="password"
                    label="Password"
                    type="password"
                  />
                </Box>
                <Box mt={4}>
                  <InputField
                    name="confirm"
                    label="Comfirm Password"
                    type="password"
                  />
                </Box>

                <Button
                  mt={4}
                  type="submit"
                  isLoading={isSubmitting}
                  background="blue"
                  color="white"
                >
                  update profile
                </Button>
              </Form>
            )}
          </Formik>
        </>
      )}
    </Box>
  );
};

export default withApollo({ ssr: false })(confirmPassword);
