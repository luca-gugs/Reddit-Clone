import { Box, Flex, Text, useDisclosure } from '@chakra-ui/core';
import { ScaleFade } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { timeDifference } from '../../utils/timeAgo';
import { Link } from '../Atoms/Link';

interface commentSectionProps {
  comments: any;
}

export const CommentSection: React.FC<commentSectionProps> = ({ comments }) => {
  const { isOpen, onToggle } = useDisclosure();

  var current = new Date();

  if (comments) {
    for (let i = 0; i < comments.length; i++) {
      var current = new Date();
      let createdAt = timeDifference(current, comments[i].createdAt);
      comments[i].createdAt = createdAt;
    }
  }

  useEffect(() => {
    !isOpen && onToggle();
  }, []);
  console.log(comments, 'commets');
  return (
    <ScaleFade initialScale={0.9} in={isOpen}>
      {comments?.map((elm: { creator: any; createdAt: any; text: any }) => {
        return (
          <Box
            minW='45%'
            maxW='45%'
            shadow='md'
            ml={12}
            mt={4}
            backgroundColor='#fffaf1'
            px={4}
            py={2}
          >
            <Flex
              w='100%'
              justifyContent='space-between'
              alignItems='center'
              pb={1}
            >
              <Link to={`/user/${elm.creator.id}`}>{elm.creator.handle}</Link>
              <Text fontSize='sm'>{elm.createdAt}</Text>
            </Flex>
            <Text w='85%' fontSize='xl'>
              {elm.text}
            </Text>
          </Box>
        );
      })}
    </ScaleFade>
  );
};
