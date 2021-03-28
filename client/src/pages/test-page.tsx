import { withUrqlClient } from 'next-urql';
import React from 'react';
import { TestForm } from '../components/Atoms/TestForm';
import { CreatePostCollapse } from '../components/Organisms/CreatePostCollapse';
import { Nav } from '../components/Organisms/Nav';
import { createUrqlClient } from '../utils/createUrqlClient';

interface testProps {}

const Test: React.FC<testProps> = ({}) => {
  return (
    <>
      <Nav />
      <div
        style={{
          height: '90vh',
          minHeight: '30rem',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'blue',
        }}
      >
        <h2>Test Page</h2>
        <TestForm />
        {/* <CreatePostCollapse /> */}
      </div>
    </>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Test);
