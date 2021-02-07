import React from 'react';
import { withUrqlClient } from 'next-urql';
import { Nav } from '../components/Organisms/Nav';
import { createUrqlClient } from '../utils/createUrqlClient';
import { usePostsQuery } from '../generated/graphql';

interface indexProps {}

const Index: React.FC<indexProps> = ({}) => {
  const [{ data }] = usePostsQuery();
  return (
    <div
      style={{
        height: '100vh',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Nav />
      {/* {!data ? (
        <div>loading...</div>
      ) : (
        data.posts.map(p => <div key={p.id}>{p.title}</div>)
      )} */}
    </div>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Index);
