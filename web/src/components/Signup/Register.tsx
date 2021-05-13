import React from 'react';
import { Formik, Form } from 'formik';
import { Box, Button } from '@chakra-ui/react';
import {
  useRegisterMutation,
  MeQuery,
  MeDocument,
} from '../../generated/graphql';
import { toErrorMap } from '../../utils/toErrorMap';
import { withApollo } from '../../utils/withApollo';
import { InputField } from '../Inputs/InputField';

const Register = ({
  setSteps,
}: {
  setSteps: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const [register] = useRegisterMutation();
  return (
    <Formik
      initialValues={{ email: '', password: '' }}
      onSubmit={async (values, { setErrors }) => {
        const response = await register({
          variables: { options: values },
          update: (cache, { data }) => {
            cache.writeQuery<MeQuery>({
              query: MeDocument,
              data: {
                __typename: 'Query',
                me: data?.register.user,
              },
            });
          },
        });
        console.log(response.data);
        console.log('submitted');
        if (response.data?.register.errors) {
          setErrors(toErrorMap(response.data.register.errors));
        } else if (response.data?.register.user) {
          console.log('worked');

          // worked
          setSteps(2);
        }
      }}
    >
      {({ isSubmitting }) => (
        <Form>
          <Box mt={4}>
            <InputField name='email' placeholder='email' label='Email' />
          </Box>
          <Box mt={4}>
            <InputField
              name='password'
              placeholder='password'
              label='Password'
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
            register
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default withApollo({ ssr: false })(Register);
