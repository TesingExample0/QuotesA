import React from "react";
import { Formik, Form } from "formik";
import { Box, Button, Img, Heading, Flex, Link } from "@chakra-ui/react";
import { FaFacebook, FaLinkedin, FaGoogle } from "react-icons/fa";
import { useRouter } from "next/router";
import { InputField } from "../components/Inputs/InputField";
import NextLink from "next/link";
import { useRegisterMutation, MeQuery, MeDocument } from "../generated/graphql";
import { toErrorMap } from "../utils/toErrorMap";
import { withApollo } from "../utils/withApollo";
import { Wrapper } from "../components/Wrapper";

const Register = () => {
  const [register] = useRegisterMutation();
  const router = useRouter();
  return (
    <Wrapper variant="small">
      <Box mt={8} p={4}>
        <Img
          boxSize="75px"
          objectFit="cover"
          src="/static/logo.png"
          alt="Logo"
          mx="auto"
        />
        <Heading textAlign="center" mt={4}>
          SignUp
        </Heading>
        <Formik
          initialValues={{ email: "", password: "" }}
          onSubmit={async (values, { setErrors }) => {
            const response = await register({
              variables: { options: values },
              update: (cache, { data }) => {
                cache.writeQuery<MeQuery>({
                  query: MeDocument,
                  data: {
                    __typename: "Query",
                    me: data?.register.user,
                  },
                });
              },
            });
            console.log(response.data);
            console.log("submitted");
            if (response.data?.register.errors) {
              setErrors(toErrorMap(response.data.register.errors));
            } else if (response.data?.register.user) {
              console.log("worked");

              // worked
              router.push("/finish");
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
                <NextLink href="/login">
                  <Link>LogIn</Link>
                </NextLink>
              </Flex>
              <Button
                mt={4}
                type="submit"
                isLoading={isSubmitting}
                background="blue"
                color="white"
              >
                SignUp in with email
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
            SignUp with Facebook
          </Button>

          <Button
            href={process.env.LINKEDIN_URL}
            as={Link}
            mt={4}
            colorScheme="linkedin"
            rightIcon={<FaLinkedin />}
          >
            SignUp with LinkedIn
          </Button>

          <Button
            href={process.env.GOOGLE_URL}
            as={Link}
            mt={4}
            colorScheme="red"
            rightIcon={<FaGoogle />}
          >
            SignUp with Google
          </Button>
        </Box>
      </Box>
    </Wrapper>
  );
};

export default withApollo({ ssr: false })(Register);
