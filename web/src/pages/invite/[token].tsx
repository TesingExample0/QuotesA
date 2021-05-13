import React, { useState } from 'react';
import { Box, Button, Flex, Heading, Img } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import { useRouter } from 'next/router';
import { InputField } from '../../components/Inputs/InputField';

import { useCreateSubFromInviteMutation } from '../../generated/graphql';
import { withApollo } from '../../utils/withApollo';
import { toErrorMap } from '../../utils/toErrorMap';
import { SelectField } from '../../components/Inputs/SelectField';
import { Wrapper } from '../../components/Wrapper';

const InviteLink = () => {
  const router = useRouter();
  const [createSubFromInvite] = useCreateSubFromInviteMutation();
  const [tokenError, setTokenError] = useState('');
  const token =
    typeof router.query.token === 'string' ? router.query.token : '';

  return (
    <Wrapper variant='small'>
      <Img
        boxSize='75px'
        objectFit='cover'
        src='/static/logo.png'
        alt='Logo'
        mx='auto'
      />
      <Heading textAlign='center' mt={4}>
        Subscribe
      </Heading>
      <Box>
        <Formik
          initialValues={{
            name: '',
            email: '',
            frequency: 1,
          }}
          onSubmit={async (values, { setErrors }) => {
            const response = await createSubFromInvite({
              variables: {
                input: {
                  name: values.name,
                  email: values.email,
                  frequency: parseInt(values.frequency as any),
                  token,
                },
              },
            });

            if (response.data?.createSubFromInvite.errors) {
              const errorMap = toErrorMap(
                response.data.createSubFromInvite.errors,
              );
              setErrors(errorMap);
              if ('token' in errorMap) {
                setTokenError(errorMap.token);
              }
            } else if (response.data?.createSubFromInvite.sub) {
              console.log('worked');

              // todo push to thank you page
            }
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              {tokenError ? (
                <Flex>
                  <Box mr={2} style={{ color: 'red' }}>
                    {tokenError}
                  </Box>
                </Flex>
              ) : null}
              <InputField name='name' placeholder='Name' label='Name' />
              <Box mt={4}>
                <InputField name='email' placeholder='email' label='Email' />
              </Box>
              <Box mt={4}>
                <SelectField name='frequency' label='Frequency' />
              </Box>
              <Button
                mt={4}
                type='submit'
                isLoading={isSubmitting}
                background='blue'
                color='white'
              >
                Submit
              </Button>
            </Form>
          )}
        </Formik>
      </Box>
    </Wrapper>
  );
};

export default withApollo({ ssr: false })(InviteLink);
