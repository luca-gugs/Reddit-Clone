import React from 'react';
import NextLink from 'next/link';
import { Box, Link as ChakraLink } from '@chakra-ui/core';
import { TopicCard } from './TopicCards';
import { m } from 'framer-motion';
interface chunkedPostsProps {
  posts: [];
}

export const ChunkedPosts: React.FC<chunkedPostsProps> = ({ posts }) => {
  return (
    <Box>
      {posts
        ? posts.map(
            (elm: {
              id: number;
              title: string;
              text: string;
              anon: boolean | null;
              creator: { handle: string; id: number };
            }) => {
              return (
                <TopicCard
                  key={elm.id}
                  title={elm.title}
                  text={elm.text}
                  id={elm.id}
                  anon={elm?.anon}
                  creator={elm.creator}
                />
              );
            }
          )
        : null}
    </Box>
  );
};
