import React from 'react';
import NextLink from 'next/link';
import { Box, Link as ChakraLink } from '@chakra-ui/core';
import { TopicCard } from './TopicCards';
interface chunkedPostsProps {
  posts: [];
}

export const ChunkedPosts: React.FC<chunkedPostsProps> = ({ posts }) => {
  return (
    <Box>
      {posts
        ? posts.map((elm: { id: number; title: string; text: string }) => {
            return (
              <TopicCard
                key={elm.id}
                title={elm.title}
                text={elm.text}
                id={elm.id}
              />
            );
          })
        : null}
    </Box>
  );
};
