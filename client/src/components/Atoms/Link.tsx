import React from 'react';
import NextLink from 'next/link';
import { Box, Link as ChakraLink } from '@chakra-ui/core';
interface linkProps {
  to: string;
  mr?: string;
}

export const Link: React.FC<linkProps> = ({ to, children, ...props }) => {
  console.log('test');
  return (
    <Box {...props}>
      <NextLink href={to} as={to}>
        <ChakraLink>{children}</ChakraLink>
      </NextLink>
    </Box>
  );
};
