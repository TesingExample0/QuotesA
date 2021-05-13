import React, { useState, useEffect } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  Flex,
  Box,
  Select,
  Tooltip,
  Heading,
  Img,
  Text,
  Textarea,
} from "@chakra-ui/react";
import { Wrapper } from "../../components/Wrapper";
import { usePaginatedActivityQuery } from "../../generated/graphql";
import { withApollo } from "../../utils/withApollo";
// import { useIsAuth } from "../../utils/useIsAuth";
// import ActivityModal from "./AvtivityModal";
// import { useAlluserQuery } from "../../generated/graphql";

const SendQAtocontact = () => {
  return (
    <Box mx="auto" pt={30} pl={20} maxW="600px" w="100%">
      <Img
        boxSize="75px"
        objectFit="cover"
        src="/static/logo.png"
        alt="Logo"
        mx="auto"
      />
      <Heading>Welcome to Quote Actions</Heading>
      <Text mt={4}>Add Emails of your contacts</Text>
      <Textarea
        placeholder="Add emails here"
        size="md"
        resize="none"
        mt={4}
        h="200px"
        focusBorderColor="blue.500"
        colorScheme="blue"
        borderWidth="medium"
        // border="5px"
        // borderColor="gray.500"
      />
      <Button
        mt={4}
        type="submit"
        // isLoading={isSubmitting}
        background="blue"
        color="white"
      >
        Send
      </Button>
    </Box>
  );
};

export default withApollo({ ssr: false })(SendQAtocontact);
