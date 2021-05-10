import React, { useState, useRef } from 'react';
import dynamic from 'next/dynamic';
import { EditorState, convertToRaw } from 'draft-js';
import { withApollo } from '../../utils/withApollo';
import { useIsAuth } from '../../utils/useIsAuth';
import '../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import draftToHtml from 'draftjs-to-html';
import {
  Box,
  Input,
  Select,
  Flex,
  IconButton,
  useToast,
  Text,
  Textarea,
} from '@chakra-ui/react';
import ViewModal from './ViewModal';
import Savemodal from './savemodal';
import { CopyIcon } from '@chakra-ui/icons';

const getHtml = (editarState: any) =>
  draftToHtml(convertToRaw(editarState.getCurrentContent()));

const Editor = dynamic(
  () => {
    return import('react-draft-wysiwyg').then((mod: any) => mod.Editor);
  },
  { ssr: false }
);

const dropDown = [
  { name: 'Select', value: '' },
  { name: 'Subscriber Name', value: '#SubscriberName#' },
  { name: 'Quotes', value: '#Quotes#' },
  { name: 'User Name', value: '#UserName#' },
  { name: 'Users Email', value: '#UsersEmail#' },
  { name: 'Unsubscribe Link', value: '#UnsubscribeLink#' },
];

const AddTemplates = () => {
  useIsAuth();
  const [editarState, seteditarState] = useState(EditorState.createEmpty());
  const [mergeFeild, setmergeFeild] = useState('');
  const [subject, setsubject] = useState('');
  const textAreaRef = useRef<HTMLInputElement>(null);
  const toast = useToast();
  const onEditorStateChangevalue = (value: any) => {
    seteditarState(value);
  };
  const handleInputChange = async (e: any) => {
    await setsubject(e.target.value);
  };

  const copyTextToClipboard = () => {
    if (textAreaRef.current != null) {
      textAreaRef.current.select();
      document.execCommand('copy');
    }

    toast({
      title: 'Feild Copied',
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
  };

  return (
    <>
      <ViewModal body={getHtml(editarState)} subject={subject} />
      <Savemodal body={getHtml(editarState)} subject={subject} />
      <Flex mb={4} mt={5}>
        <Text w='20%' mt={2}>
          Merge Fields
        </Text>
        <Select onChange={(e) => setmergeFeild(e.target.value)} mr={4} w='60%'>
          {dropDown.map((d, index) => (
            <option key={index} value={d.value}>
              {d.name}
            </option>
          ))}
        </Select>
        <Input
          placeholder='Merge Text'
          value={mergeFeild}
          size='md'
          ref={textAreaRef}
          readOnly
          w='60%'
        />
        <IconButton
          ml={2}
          icon={<CopyIcon />}
          aria-label='Copy Invite Link'
          onClick={copyTextToClipboard}
        />
      </Flex>
      <Flex mb={4} mt={5}>
        <Text w='15%' mt={2}>
          Subject
        </Text>
        <Textarea
          value={subject}
          onChange={handleInputChange}
          placeholder='The subject goes here...'
          size='sm'
          resize='none'
        />
      </Flex>
      <Box
        mt={5}
        borderWidth='1px'
        borderRadius='lg'
        overflowY='scroll'
        w='100%'
        h='500px'
      >
        <Editor
          // @ts-ignore
          editorState={editarState}
          onEditorStateChange={onEditorStateChangevalue}
          placeholder="The message goes here..."
        />
      </Box>
    </>
  );
};

export default withApollo({ ssr: false })(AddTemplates);
