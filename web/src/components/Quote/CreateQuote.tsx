import React, { useState } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
} from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import { withApollo } from '../../utils/withApollo';
import { InputField } from '../Inputs/InputField';
import { useCreateQuoteMutation } from '../../generated/graphql';
import { toErrorMap } from '../../utils/toErrorMap';
import { ProfessionSelectField } from '../Inputs/ProfessionSelect';

const CreateQuote: React.FC<{}> = ({}) => {
  const [createQuote] = useCreateQuoteMutation();
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button onClick={onOpen}>Create Quote</Button>

      <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create a Quote</ModalHeader>
          <Formik
            initialValues={{ name: '', catagory: '' }}
            onSubmit={async (values, { setErrors }) => {
              const response = await createQuote({
                variables: { input: values },
                update: (cache, { data }) => {
                  if (!data?.createQuote.errors) {
                    cache.evict({ fieldName: 'quotes:{}' });
                  }
                },
              });

              if (response.data?.createQuote.errors) {
                setErrors(toErrorMap(response.data.createQuote.errors));
                console.log(response.data.createQuote.errors);
              } else if (response.data?.createQuote.quote) {
              }
            }}
          >
            {({ isSubmitting }) => {
              return (
                <Form>
                  {isSubmitting ? null : <ModalCloseButton />}
                  <ModalBody pb={6}>
                    <InputField
                      name='name'
                      placeholder='Quote'
                      textarea
                      label='Quote'
                    />
                    <ProfessionSelectField label='Catagory' name='catagory' />
                  </ModalBody>

                  <ModalFooter>
                    <Button
                      mr={2}
                      type='submit'
                      isLoading={isSubmitting}
                      background='blue'
                      color='white'
                    >
                      Save Quote
                    </Button>

                    <Button isLoading={isSubmitting} onClick={onClose}>
                      Cancel
                    </Button>
                  </ModalFooter>
                </Form>
              );
            }}
          </Formik>
        
        </ModalContent>
      </Modal>
    </>
  );
};

export default withApollo({ ssr: false })(CreateQuote);
