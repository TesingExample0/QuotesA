import React from 'react';
import { withApollo } from '../../utils/withApollo';
import { useUpdateUserMutation } from '../../generated/graphql';
import { Box, Text, Button, useToast, Flex, Spacer } from '@chakra-ui/react';
import { Formik, Form } from 'formik';
import { InputField } from '../Inputs/InputField';
import { toErrorMap } from '../../utils/toErrorMap';
import { ProfessionSelectField } from '../Inputs/ProfessionSelect';
import { useRouter } from 'next/router';

const Finish = () => {
  const [updateUser] = useUpdateUserMutation();
  const router = useRouter();
  return (
    <Box mb={6} pr={12}>
      <Formik
        initialValues={{
          name: '',
          address: '',
          city: '',
          state: '',
          zip: '',
          title: '',
          catagory: '',
          company: '',
          twitter: '',
          facebook: '',
          website: '',
          linkedIn: '',
          DefaultTemplates: false
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
            console.log(response.data);

            router.push('/');
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <Box flex='1' mr={6}>
              <InputField name='name' placeholder='name' label='Name' />
              <Box mt={4}>
                <InputField name='title' placeholder='title' label='Title' />
              </Box>
              <Box mt={4}>
                <InputField
                  name='company'
                  placeholder='company'
                  label='Company'
                />
              </Box>
              <Box mt={4}>
                <ProfessionSelectField label='Catagory' name='catagory' />
              </Box>
              <Box mt={4}>
                <InputField
                  name='address'
                  placeholder='address'
                  label='Address'
                />
              </Box>
              <Box mt={4}>
                <InputField name='city' placeholder='city' label='City' />
              </Box>
              <Box mt={4}>
                <InputField name='state' placeholder='state' label='State' />
              </Box>
              <Box mt={4}>
                <InputField name='zip' placeholder='zip' label='Zip' />
              </Box>
            </Box>

            <Box flex='1'>
              <InputField
                name='twitter'
                placeholder='twitter'
                label='Twitter'
              />
              <Box mt={4}>
                <InputField
                  name='facebook'
                  placeholder='facebook'
                  label='Facebook'
                />
              </Box>
              <Box mt={4}>
                <InputField
                  name='website'
                  placeholder='website'
                  label='Website'
                />
              </Box>
              <Box mt={4}>
                <InputField
                  name='linkedIn'
                  placeholder='linkedIn'
                  label='LinkedIn'
                />
              </Box>
            </Box>

            <Button
              mt={4}
              type='submit'
              isLoading={isSubmitting}
              background='blue'
              color='white'
            >
              Finish Signup
            </Button>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default withApollo({ ssr: false })(Finish);
