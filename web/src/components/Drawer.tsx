import React from "react";
import {
  Flex,
  Icon,
  Img,
  useDisclosure,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerOverlay,
  Button,
  DrawerCloseButton,
  IconButton,
} from "@chakra-ui/react";
import { MdHome, MdEmail, MdEventNote, MdNote } from "react-icons/md";
import { ImUsers, ImQuotesRight, ImBookmark } from "react-icons/im";
import ActiveLink from "./ActiveLink";
import { useMeQuery } from "../generated/graphql";
import { isServer } from "../utils/isServer";
import { ProfileAvatar } from "./Profile/ProfileAvatar";
import { HamburgerIcon } from "@chakra-ui/icons";

export const DrawerBar = () => {
  const { data, loading } = useMeQuery({
    skip: isServer(),
  });
  const { isOpen, onOpen, onClose } = useDisclosure();

  let quote = null;
  let mailActivity = null;
  let messages = null;
  let usermailActivity = null;
  let usermessages = null;
  let tempalte = null;

  if (loading) {
  } else if (data?.me?.role !== "admin") {
    usermessages = (
      <ActiveLink href="/UserMessages">
        <Icon as={MdEmail} mr={2} mb="2px" />
        Messages
      </ActiveLink>
    );
  } else {
    messages = (
      <ActiveLink href="/messages">
        <Icon as={MdEmail} mr={2} mb="2px" />
        Messages
      </ActiveLink>
    );
    quote = (
      <ActiveLink href="/quotes">
        <Icon as={ImQuotesRight} mr={2} mb="5px" />
        Quotes
      </ActiveLink>
    );

    tempalte = (
      <ActiveLink href="/templates">
        <Icon as={MdEventNote} mr={2} mb="5px" />
        Templates
      </ActiveLink>
    );
  }

  return (
    <>
      <Button
        as={IconButton}
        aria-label="Options"
        icon={<HamburgerIcon />}
        display={{ lg: "none" }}
        visibility={{ lg: "hidden" }}
        variant="outline"
        bg="yellow"
        onClick={onOpen}
        mt={2}
        ml={2}
      />
      <Drawer onClose={onClose} isOpen={isOpen} size="full" placement="left">
        <DrawerOverlay>
          <DrawerContent bg="gray.200">
            <DrawerCloseButton />
            <DrawerBody>
              <Flex
                height={{ base: "100%" }}
                flexDirection="column"
                justifyContent="space-between"
                mx="auto"
                mt={4}
              >
                <Flex
                  mt={{ base: "0", md: "30px", lg: "30px" }}
                  fontWeight={600}
                  fontSize={19}
                  flexDirection="column"
                >
                  <Img
                    boxSize="130px" 
                    // w="50%"
                    w='250px'
                    objectFit="cover"
                    src="/static/QA_Cursive_Logo.png"
                    alt="Logo"
                    mx="auto"
                  />
                  <Flex flexDirection="column" mx="auto" mt={4}>
                    <ActiveLink href="/">
                      <Icon as={MdHome} mr={2} mb="5px" mx="auto" />
                      Dashboard
                    </ActiveLink>
                    <ActiveLink href="/contacts">
                      <Icon as={ImUsers} mr={2} mb="5px" />
                      Contacts
                    </ActiveLink>
                    {/* for users */}
                    {usermessages}

                    {/* For admin */}
                    {tempalte}
                    {messages}
                    {quote}
                  </Flex>
                </Flex>
                <Flex mb={32} justifyContent="flex-end">
                  {data && <ProfileAvatar email={data.me?.email} />}
                </Flex>
              </Flex>{" "}
            </DrawerBody>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </>
  );
};
