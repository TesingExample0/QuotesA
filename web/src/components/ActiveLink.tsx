import React from 'react';
import { Box, Link, Icon } from '@chakra-ui/react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';

const mtStlye = { base: '4', md: '8', lg: '8' };
const linkDisplay = { base: 'inline', md: 'block', lg: 'block' };

interface ActiveLinkProps {
  href: string;
  children: object;
}

const ActiveLink: React.FC<ActiveLinkProps> = ({ href, children }) => {
  const router = useRouter();

  let color = router.pathname === href ? 'blue' : '';

  return (
    <NextLink href={href}>
      <Link color={color} display={linkDisplay} mt={mtStlye}>
        {children}
      </Link>
    </NextLink>
  );
};

export default ActiveLink;
