import React from 'react';
import { Wrapper, WrapperVariant } from './Wrapper';

import { SideBar } from './SideBar';
import { DrawerBar } from './Drawer';
import { Box, Flex, Grid, GridItem } from '@chakra-ui/react';

interface LayoutProps {
  variant?: WrapperVariant;
}

export const Layout: React.FC<LayoutProps> = ({ children, variant }) => {
  return (
    <Grid
      templateColumns={{
        base: 'repeat(0, 1fr)',
        md: 'repeat(4, 1fr)',
        lg: 'repeat(6, 1fr)',
      }}
      templateRows='repeat(1, 1fr)'
      height='100vh'
      gap={2}
    >
      <GridItem
        colSpan={1}
        display={{ base: 'none', md: 'none', lg: 'initial' }}
      >
        <SideBar />
      </GridItem>
      <GridItem colSpan={4} p={2} rowSpan={1}>
        <DrawerBar />
        <Wrapper variant={variant}>{children}</Wrapper>
      </GridItem>
    </Grid>
  );
};
