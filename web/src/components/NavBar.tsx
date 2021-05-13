import React from 'react';
import {
  Box,
  Link,
  Flex,
  Heading,
  Avatar,
  MenuButton,
  Menu,
  MenuItem,
  MenuList,
} from '@chakra-ui/react';
import NextLink from 'next/link';
import { useMeQuery, useLogoutMutation } from '../generated/graphql';
import { isServer } from '../utils/isServer';
import { useApolloClient } from '@apollo/client';

interface NavBarProps {}

export const NavBar: React.FC<NavBarProps> = ({}) => {
  const [logout, { loading: logoutFetching }] = useLogoutMutation();
  const apolloClient = useApolloClient();
  const { data, loading } = useMeQuery({
    skip: isServer(),
  });

  let body = null;

  // data is loading
  if (loading) {
    // user not logged in
  } else if (!data?.me) {
    body = (
      <>
        <NextLink href='/login'>
          <Link mr={2}>Login</Link>
        </NextLink>
        <NextLink href='/signup'>
          <Link>Sign Up</Link>
        </NextLink>
      </>
    );
    // user is logged in
  } else {
    console.log(data);
    body = (
      <Flex align='center'>
        <Box mr={2}>
          <Menu>
            <MenuButton>
              <Avatar name={data.me.email} />
            </MenuButton>
            <MenuList>
              <MenuItem>
                <NextLink href='/profile'>
                  <Link>Profile</Link>
                </NextLink>
              </MenuItem>
              <MenuItem
                onClick={async () => {
                  await logout();
                  await apolloClient.resetStore();
                }}
                isLoading={logoutFetching}
                variant='link'
              >
                Logout
              </MenuItem>
            </MenuList>
          </Menu>
        </Box>
      </Flex>
    );
  }

  return (
    <Flex zIndex={1} position='sticky' top={0} bg='yellow' p={4}>
      <Flex flex={1} m='auto' align='center' maxW={800}>
        <Box ml={'auto'}>{body}</Box>
      </Flex>
    </Flex>
  );
};
