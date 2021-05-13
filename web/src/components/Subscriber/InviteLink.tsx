import { CopyIcon } from "@chakra-ui/icons";
import { Box, Flex, IconButton, Input, useToast } from "@chakra-ui/react";
import React, { useRef } from "react";
import { useMeQuery } from "../../generated/graphql";
import { isServer } from "../../utils/isServer";

export const InviteLink = () => {
  const { data, loading } = useMeQuery({
    skip: isServer(),
  });
  const toast = useToast();
  const textAreaRef = useRef<HTMLInputElement>(null);

  const copyTextToClipboard = () => {
    if (textAreaRef.current != null) {
      textAreaRef.current.select();
      document.execCommand("copy");
    }

    toast({
      title: "Invite Link Copied",
      status: "success",
      duration: 9000,
      isClosable: true,
    });
  };

  let body = null;

  if (loading) {
  } else if (!data?.me) {
    body = <></>;
  } else {
    const link = `${process.env.CLIENT_URL}/invite/${data.me.inviteLink}`;
    body = (
      <>
        <Flex align="center">
          <Input ref={textAreaRef} value={link} isReadOnly />
          <IconButton
            ml={2}
            icon={<CopyIcon />}
            aria-label="Copy Invite Link"
            onClick={copyTextToClipboard}
          />
        </Flex>
      </>
    );
  }

  return <Box ml={"auto"}>{body}</Box>;
};
