import React from 'react';
import { RegisterForm } from '../components/Organisms/AuthForms/RegisterForm';
import { Nav } from '../components/Organisms/Nav';
import { withUrqlClient } from 'next-urql';
import { createUrqlClient } from '../utils/createUrqlClient';

interface registerProps {}

const Register: React.FC<registerProps> = ({}) => {
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
        <RegisterForm />
      </div>
    </>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Register);
