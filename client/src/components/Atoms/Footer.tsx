import { Flex } from '@chakra-ui/core';
import React, { InputHTMLAttributes } from 'react';

type footerProps = InputHTMLAttributes<HTMLInputElement> & {};

export const Footer: React.FC<footerProps> = ({}) => {
  return (
    <Flex
      position='sticky'
      top='0'
      w='100%'
      pt={8}
      mb={4}
      px={8}
      height={4}
    ></Flex>
  );
};
