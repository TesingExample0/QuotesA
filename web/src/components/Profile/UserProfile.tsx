import React from "react";
import { withApollo } from "../../utils/withApollo";
import { useUpdateUserMutation } from "../../generated/graphql";
import {
  Box,
  Text,
  Button,
  useToast,
  Flex,
} from "@chakra-ui/react";
import { Formik, Form } from "formik";
import { InputField } from "../Inputs/InputField";
import { toErrorMap } from "../../utils/toErrorMap";
import { ProfessionSelectField } from "../Inputs/ProfessionSelect";

interface UserProfileProps {
  data: {
    email: string;
    name: string;
    address: string;
    city: string;
    state: string;
    zip: string;
    title: string;
    catagory: string;
    company: string;
    twitter: string;
    facebook: string;
    linkedIn: string;
    website: string;
    DefaultTemplates: boolean;
  };
}

const UserProfile: React.FC<UserProfileProps> = ({
  data: {
    name,
    address,
    city,
    state,
    zip,
    title,
    catagory,
    company,
    twitter,
    facebook,
    website,
    linkedIn,
    DefaultTemplates,
  },
}) => {
  console.log(name,DefaultTemplates);
  const [updateUser] = useUpdateUserMutation();
  const toast = useToast();
  return (
    <Box mb={6} pr={12}>
      <Text mt={4} mb={4} fontSize="3xl">
        Manage Your Profile
      </Text>
      <Formik
        initialValues={{
          name,
          address,
          city,
          state,
          zip,
          title,
          catagory,
          company,
          twitter,
          facebook,
          website,
          linkedIn,
          DefaultTemplates,
        }}
        onSubmit={async (values, { setErrors }) => {
          const response = await updateUser({
            variables: {
              input: values,
            },
          });

          if (response.data?.updateUser.errors) {
            const errorMap = toErrorMap(response.data.updateUser.errors);

            setErrors(errorMap);
          } else if (response.data?.updateUser.user) {
            toast({
              title: "Success",
              description: "Your account information has been saved.",
              status: "success",
              duration: 9000,
              isClosable: true,
            });
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <Flex>
              <Box flex="1" mr={6}>
                <InputField name="name" placeholder="name" label="Name" />
                <Box mt={4}>
                  <InputField name="title" placeholder="title" label="Title" />
                </Box>
                <Box mt={4}>
                  <InputField
                    name="company"
                    placeholder="company"
                    label="Company"
                  />
                </Box>
                <Box mt={4}>
                  <ProfessionSelectField label="Catagory" name="catagory" />
                </Box>
                <Box mt={4}>
                  <InputField
                    name="address"
                    placeholder="address"
                    label="Address"
                  />
                </Box>
                <Box mt={4}>
                  <InputField name="city" placeholder="city" label="City" />
                </Box>
                <Box mt={4}>
                  <InputField name="state" placeholder="state" label="State" />
                </Box>
                <Box mt={4}>
                  <InputField name="zip" placeholder="zip" label="Zip" />
                </Box>
              </Box>

              <Box flex="1">
                <InputField
                  name="twitter"
                  placeholder="twitter"
                  label="Twitter"
                />
                <Box mt={4}>
                  <InputField
                    name="facebook"
                    placeholder="facebook"
                    label="Facebook"
                  />
                </Box>
                <Box mt={4}>
                  <InputField
                    name="website"
                    placeholder="website"
                    label="Website"
                  />
                </Box>
                <Box mt={4}>
                  <InputField
                    name="linkedIn"
                    placeholder="linkedIn"
                    label="LinkedIn"
                  />
                </Box>
              </Box>
            </Flex>
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
    </Box>
  );
};

export default withApollo({ ssr: false })(UserProfile);
