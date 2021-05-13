import React from 'react';
import { withApollo } from '../../utils/withApollo';
import { useUpdateUserAuthMutation } from '../../generated/graphql';
import { Box, Text, Button, useToast } from '@chakra-ui/react';
import { Formik, Form } from 'formik';
import { InputField } from '../Inputs/InputField';
import { toErrorMap } from '../../utils/toErrorMap';

interface UserAuthProps {
  data: {
    email: string;
  };
}

const UserAuth: React.FC<UserAuthProps> = ({ data: { email } }) => {
  const [updateAuth] = useUpdateUserAuthMutation();
  const toast = useToast();
  return (
    <Box mb={6} pr={12}>
      <Text mt={4} mb={4} fontSize='3xl'>
        Manage Your Security
      </Text>
      <Formik
        initialValues={{ email, password: null, confirm: null }}
        onSubmit={async (values, { setErrors }) => {
          let confirm;
          let password;

          if (values.password !== '') {
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
              title: 'Success',
              description: 'Your account information has been saved.',
              status: 'success',
              duration: 9000,
              isClosable: true,
            });
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <Box mt={4}>
              <InputField name='email' placeholder='email' label='Email' />
            </Box>
            <Box mt={4}>
              <InputField name='password' label='Password' type='password' />
            </Box>
            <Box mt={4}>
              <InputField
                name='confirm'
                label='Comfirm Password'
                type='password'
              />
            </Box>

            <Button
              mt={4}
              type='submit'
              isLoading={isSubmitting}
              background='blue'
              color='white'
            >
              update profile
            </Button>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default withApollo({ ssr: false })(UserAuth);
