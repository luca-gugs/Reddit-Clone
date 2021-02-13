import { Flex } from '@chakra-ui/core';
import { withUrqlClient } from 'next-urql';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { CreatePostCollapse } from '../components/Organisms/CreatePostCollapse';
import { Nav } from '../components/Organisms/Nav';
import { ChunkedPosts } from '../components/Organisms/Posts/ChunkedPosts';
import { usePostsQuery } from '../generated/graphql';
import { splitToChunks } from '../utils/chunkifyData';
import { createUrqlClient } from '../utils/createUrqlClient';
import { useWindowSize } from '../utils/useWindow';

interface indexProps {}

const Index: React.FC<indexProps> = ({}) => {
  const { width, height } = useWindowSize();
  const [{ data }] = usePostsQuery();
  const [postData, setPostData] = useState([]);

  useEffect(() => {
    if (data?.posts) {
      if (width > 0 && width < 500) {
        setPostData(splitToChunks(data?.posts, 1));
      } else if (width >= 500 && width < 900) {
        setPostData(splitToChunks(data?.posts, 2));
      } else if (width >= 900 && width < 1375) {
        setPostData(splitToChunks(data?.posts, 3));
      } else if (width >= 1375) {
        setPostData(splitToChunks(data?.posts, 4));
      }
    }
  }, [width, data]);

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
      <Flex w='100%' flexWrap='wrap' p='0 0 2rem 0' justifyContent='center'>
        {postData !== undefined &&
          postData.map(elm => {
            return <ChunkedPosts posts={elm} />;
          })}
      </Flex>
    </div>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Index);
