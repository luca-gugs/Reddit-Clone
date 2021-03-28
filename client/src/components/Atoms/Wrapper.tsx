import { Box } from '@chakra-ui/core';
import React from 'react';

interface WrapperProps {
  variant?: 'small' | 'large' | 'xl';
}

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
      mb={6}
    >
      {children}
    </Box>
  );
};
