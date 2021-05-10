import React from "react";
import {
  Box,
  Link,
  Avatar,
  MenuButton,
  MenuItem,
  MenuList,
  Menu,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { useApolloClient } from "@apollo/client";
import { useLogoutMutation } from "../../generated/graphql";
import { useRouter } from "next/router";

interface ProfileAvatarProps {
  email: string | undefined;
}

export const ProfileAvatar: React.FC<ProfileAvatarProps> = ({ email }) => {
  const [logout, { loading: logoutFetching }] = useLogoutMutation();
  const apolloClient = useApolloClient();
  // let body = null;
  const router = useRouter();

  return (
    <Box mx="auto">
      <Menu>
        <MenuButton>
          <Avatar name={email} bg="yellow" />
        </MenuButton>
        <MenuList>
          <MenuItem>
            <NextLink href="/profile">
              <Link>Profile</Link>
            </NextLink>
          </MenuItem>
          <MenuItem
            onClick={async () => {
              await logout();
              await router.replace("/login?next=" + router.pathname);
              await apolloClient.resetStore();
            }}
            isLoading={logoutFetching}
            variant="link"
          >
            Logout
          </MenuItem>
        </MenuList>
      </Menu>
    </Box>
  );
};
