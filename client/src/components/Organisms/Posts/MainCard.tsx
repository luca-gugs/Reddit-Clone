import { Box, Heading, PseudoBox, useDisclosure, Text } from '@chakra-ui/core';
import { ScaleFade } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { DootSection } from '../../Atoms/DootSection';
interface mainCardProps {
  post: any;
}

export const MainCard: React.FC<mainCardProps> = ({ post }) => {
  const { isOpen, onToggle } = useDisclosure();

  useEffect(() => {
    !isOpen && onToggle();
  }, []);

  return (
    <ScaleFade initialScale={0.9} in={isOpen}>
      <PseudoBox
        position='relative'
        minHeight='10rem'
        minWidth='300px'
        w='80%'
        shadow='md'
        ml={8}
        mt={4}
        backgroundColor='#f9f9f9'
        pt={2}
        pl={4}
      >
        <Heading
          as='h2'
          w='85%'
          size={post?.title?.length < 100 ? 'xl' : 'md'}
          pb='4'
        >
          {post?.title}
        </Heading>
        <Text w='85%' fontSize='xl' pb='4'>
          {post?.text}
        </Text>

        <DootSection
          size='large'
          points={post?.points}
          postId={post?.id}
          voteStatus={post?.voteStatus}
        />
      </PseudoBox>
    </ScaleFade>
  );
};
