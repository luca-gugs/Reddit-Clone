import { withUrqlClient } from 'next-urql';
import React from 'react';
import { CreatePostCollapse } from '../components/Organisms/CreatePostCollapse';
import { Nav } from '../components/Organisms/Nav';
import { usePostsQuery } from '../generated/graphql';
import { createUrqlClient } from '../utils/createUrqlClient';
import { TopicCard } from '../components/Organisms/TopicCards';
import { Box, Flex } from '@chakra-ui/core';

interface indexProps {}

const Index: React.FC<indexProps> = ({}) => {
  const [{ data }] = usePostsQuery();
  console.log(data?.posts, 'data');

  return (
    <div
      style={{
        height: '100vh',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Nav />
      <CreatePostCollapse />
      <Flex w='100%' p='0 4rem' flexWrap='wrap'>
        {data
          ? data.posts.map(elm => {
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
      </Flex>
    </div>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Index);
