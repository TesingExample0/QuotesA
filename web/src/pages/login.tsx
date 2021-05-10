import React, { useState, useEffect } from "react";
import { Formik, Form } from "formik";
import {
  Box,
  Button,
  Link,
  Flex,
  Heading,
  Img,
  useToast,
} from "@chakra-ui/react";
import { FaFacebook, FaLinkedin, FaGoogle } from "react-icons/fa";
import { Wrapper } from "../components/Wrapper";
import { InputField } from "../components/Inputs/InputField";
import { useLoginMutation, MeQuery, MeDocument } from "../generated/graphql";
import { toErrorMap } from "../utils/toErrorMap";
import { useRouter } from "next/router";
import NextLink from "next/link";
import { withApollo } from "../utils/withApollo";
import Cookies from "js-cookie";

const Login: React.FC<{}> = ({}) => {
  const router = useRouter();
  const [login] = useLoginMutation();
  const toast = useToast();
  const [message, setmessage] = useState("" as any);

  useEffect(() => {
    if (Cookies.get("err")) {
      setmessage(Cookies.get("err"));
    }
    Cookies.remove("err");
  }, []);
  if (message) {
    toast({
      title: message,
      status: "warning",
      duration: 4000,
      isClosable: true,
    });
  }
  return (
    <Wrapper variant="small">
      <Box mt={8} p={4}>
        <Img
          boxSize="130px"
          w="100%"
          objectFit="cover"
          src="/static/QA_Cursive_Logo.png"
          alt="Logo"
          mx="auto"
        />
        <Heading textAlign="center" mt={4}>
          LogIn
        </Heading>
        <Formik
          initialValues={{ email: "", password: "" }}
          onSubmit={async (values, { setErrors }) => {
            const response = await login({
              variables: values,
              update: (cache, { data }) => {
                cache.writeQuery<MeQuery>({
                  query: MeDocument,
                  data: {
                    __typename: "Query",
                    me: data?.login.user,
                  },
                });
                cache.evict({ fieldName: "posts:{}" });
              },
            });
            if (response.data?.login.errors) {
              setErrors(toErrorMap(response.data.login.errors));
            } else if (response.data?.login.user) {
              if (typeof router.query.next === "string") {
                router.push(router.query.next);
              } else {
                // worked
                router.push("/");
              }
            }
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <InputField name="email" placeholder="email" label="Email" />
              <Box mt={4}>
                <InputField
                  name="password"
                  placeholder="password"
                  label="Password"
                  type="password"
                />
              </Box>
              <Flex mt={2}>
                <NextLink href="/signup">
                  <Link>SignUp</Link>
                </NextLink>
                <NextLink href="/forgot-password">
                  <Link ml="auto">Forgot password?</Link>
                </NextLink>
              </Flex>
              <Button
                mt={4}
                type="submit"
                isLoading={isSubmitting}
                background="blue"
                color="white"
              >
                LogIn with email
              </Button>
            </Form>
          )}
        </Formik>
        <Box mt={6} display="grid">
          <hr />
          <Button
            href={process.env.FACEBOOK_URL}
            as={Link}
            mt={6}
            colorScheme="facebook"
            rightIcon={<FaFacebook />}
          >
            LogIn with Facebook
          </Button>

          <Button
            href={process.env.LINKEDIN_URL}
            as={Link}
            mt={4}
            colorScheme="linkedin"
            rightIcon={<FaLinkedin />}
          >
            LogIn with LinkedIn
          </Button>

          <Button
            href={process.env.GOOGLE_URL}
            as={Link}
            mt={4}
            colorScheme="red"
            rightIcon={<FaGoogle />}
          >
            LogIn with Google
          </Button>
        </Box>
      </Box>
    </Wrapper>
  );
};

export default withApollo({ ssr: false })(Login);
