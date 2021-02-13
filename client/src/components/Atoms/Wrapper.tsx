import React from 'react';
import { Box } from '@chakra-ui/core';
import { createBreakpoints } from '@chakra-ui/theme-tools';

interface WrapperProps {
  variant?: 'small' | 'large' | 'xl';
}

const breakpoints = createBreakpoints({
  sm: '320px',
  md: '768px',
  lg: '960px',
  xl: '1200px',
});

export const Wrapper: React.FC<WrapperProps> = ({
  children,
  variant = 'regular',
}) => {
  let xl = ['90%'];
  let large = ['300px', '500px', '800px'];
  let small = ['300px', '400px'];
  return (
    <Box
      maxW={variant === 'large' ? large : variant === 'xl' ? xl : small}
      mx='auto'
      w='100%'
      mb={12}
    >
      {children}
    </Box>
  );
};
