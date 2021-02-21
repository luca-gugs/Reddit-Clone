import { Button, Flex, Spinner } from '@chakra-ui/core';
import { withUrqlClient } from 'next-urql';
import React, { useEffect, useState } from 'react';
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
  const [variables, setVariables] = useState({
    limit: 16,
    cursor: null as null | string,
  });
  const [{ data, fetching }] = usePostsQuery({
    variables,
  });

  const [postData, setPostData] = useState([]);

  useEffect(() => {
    if (data?.posts) {
      if (width > 0 && width < 500) {
        setPostData(splitToChunks(data?.posts.posts, 1));
      } else if (width >= 500 && width < 900) {
        setPostData(splitToChunks(data?.posts.posts, 2));
      } else if (width >= 900 && width < 1375) {
        setPostData(splitToChunks(data?.posts.posts, 3));
      } else if (width >= 1375) {
        setPostData(splitToChunks(data?.posts.posts, 4));
      }
    }
  }, [width, data]);

  return (
    <div
      style={{
        minHeight: '100vh',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Nav />
      <CreatePostCollapse />
      <Flex
        w='100%'
        flexWrap='wrap'
        p='0 0 2rem 0'
        justifyContent='center'
        alignItems={!data ? 'center' : ''}
        minHeight='500px'
      >
        {fetching && data ? (
          <Spinner size='xl' />
        ) : postData !== undefined ? (
          postData.map(elm => {
            return <ChunkedPosts posts={elm} />;
          })
        ) : (
          'no posts'
        )}
        {data?.posts && data.posts.hasMore && (
          <Flex w='100%' justifyContent='center' pb={4} pt={4}>
            <Button
              onClick={() =>
                setVariables({
                  limit: variables.limit,
                  cursor:
                    data.posts.posts[data?.posts.posts.length - 1].createdAt,
                })
              }
              isLoading={fetching}
              variantColor='blue'
            >
              Button
            </Button>
          </Flex>
        )}
      </Flex>
    </div>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Index);
