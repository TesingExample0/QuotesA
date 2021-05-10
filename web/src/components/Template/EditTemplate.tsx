import React, { useState, useRef, useEffect } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Box,
  useDisclosure,
  Checkbox,
  Textarea,
  Text,
} from '@chakra-ui/react';
import { withApollo } from '../../utils/withApollo';
import { useUpdateTemplatesMutation } from '../../generated/graphql';
import dynamic from 'next/dynamic';
import {
  EditorState,
  convertToRaw,
  ContentState,
  convertFromHTML,
  CompositeDecorator,
  getDefaultKeyBinding,
} from 'draft-js';
import '../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import draftToHtml from 'draftjs-to-html';
import { useToast } from '@chakra-ui/react';

const getHtml = (editarState: any) =>
  draftToHtml(convertToRaw(editarState.getCurrentContent()));
const Editor = dynamic(
  () => {
    return import('react-draft-wysiwyg').then((mod: any) => mod.Editor);
  },
  { ssr: false }
);

interface EditTemplateProps {
  id: number;
  body: string;
  subject: string;
  Active: boolean;
  title: string;
}
const EditTemplates: React.FC<EditTemplateProps> = ({
  id,
  body,
  subject,
  Active,
  title,
}) => {
  const [updateTemplate] = useUpdateTemplatesMutation();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [editarState, seteditarState] = useState(EditorState.createEmpty());
  const [Check, setCheck] = useState(Active);
  const blocksFromHTML = convertFromHTML(body);
  const [subjects, setsubjects] = useState(subject);
  const toast = useToast();
  const state = ContentState.createFromBlockArray(
    blocksFromHTML.contentBlocks,
    blocksFromHTML.entityMap
  );
  useEffect(() => {
    seteditarState(EditorState.createWithContent(state));
  }, []);

  const onEditorStateChangevalue = (value: any) => {
    seteditarState(value);
  };

  const handlechange = (e: any) => {
    setCheck(e.target.checked);
  };
  const handleInputChange = (e: any) => {
    setsubjects(e.target.value);
  };
  const SaveupdateTemplate = async () => {
    const template = getHtml(editarState);
    const response = await updateTemplate({
      variables: {
        id: id,
        title: title,
        body: template,
        subject: subjects,
        Active: Check,
      },
    });
    if (response.data?.updateTemplates.errors) {
      console.log(response.data.updateTemplates.errors);
      toast({
        title: 'Warning',
        status: 'warning',
        duration: 3000,
        isClosable: true,
        description: response.data.updateTemplates.errors[0].message,
      });
    } else if (response.data?.updateTemplates.template) {
      toast({
        title: 'Updated',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      onClose();
      // action();
    }
  };

  return (
    <>
      <Button onClick={onOpen}>Edit</Button>
      <Modal
        closeOnOverlayClick={false}
        isOpen={isOpen}
        onClose={onClose}
        size='4xl'
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Template</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <Box mb={4}>
              <Text mb='8px'>Subject</Text>
              <Textarea
                value={subjects}
                onChange={handleInputChange}
                placeholder='The subject goes here...'
                size='sm'
                resize='none'
              />
            </Box>

            <Text mb='8px'>Body</Text>
            <Box
              borderWidth='1px'
              borderRadius='lg'
              overflowY='scroll'
              w='100%'
              h='380px'
            >
              {/* <Editor
              // @ts-ignore
                editorState={editarState}
                onEditorStateChange={onEditorStateChangevalue}
                placeholder="The message goes here..."
              /> */}
            </Box>
          </ModalBody>

          <ModalFooter>
            <Checkbox
              colorScheme='green'
              name='DefaultTemplates'
              isChecked={Check}
              onChange={handlechange}
              mt={2}
              mb={3}
              w='70%'
              justifyContent='flex-start'
            >
              Use this Template
            </Checkbox>

            <Button
              mr={3}
              type='submit'
              background='blue'
              color='white'
              onClick={SaveupdateTemplate}
            >
              update Template
            </Button>

            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default withApollo({ ssr: false })(EditTemplates);
