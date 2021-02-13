import React from 'react';
import { RegisterForm } from '../components/Organisms/AuthForms/RegisterForm';
import { Nav } from '../components/Organisms/Nav';
import { withUrqlClient } from 'next-urql';
import { createUrqlClient } from '../utils/createUrqlClient';
import { CreatePostCollapse } from '../components/Organisms/CreatePostCollapse';

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
        }}
      >
        <h2>Test Page</h2>
        <CreatePostCollapse />
      </div>
    </>
  );
};

export default withUrqlClient(createUrqlClient)(Test);
