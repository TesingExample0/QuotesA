import React from 'react';
import { Box } from '@chakra-ui/react';
import { SideBar } from './SideBar';

export type WrapperVariant = 'small' | 'regular';

interface WrapperProps {
  variant?: WrapperVariant;
}

export const Wrapper: React.FC<WrapperProps> = ({
  children,
  variant = 'regular',
}) => {
  return (
    <>
      <Box
        mx='auto'
        pt={30}
        maxW={variant === 'regular' ? '1000px' : '400px'}
        w='100%'
      >
        {children}
      </Box>
    </>
  );
};
