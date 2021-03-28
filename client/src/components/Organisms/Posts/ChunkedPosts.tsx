import { Box } from '@chakra-ui/core';
import React from 'react';
import { TopicCard } from './TopicCards';
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
              points: number;
              voteStatus: number | null;
            }) => {
              return !elm ? null : (
                <TopicCard
                  key={elm.id}
                  title={elm.title}
                  text={elm.text}
                  id={elm.id}
                  anon={elm?.anon}
                  creator={elm.creator}
                  points={elm.points}
                  voteStatus={elm.voteStatus}
                />
              );
            }
          )
        : null}
    </Box>
  );
};
