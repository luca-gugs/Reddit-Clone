import { withUrqlClient } from 'next-urql';
import React from 'react';
import { ForgotPassForm } from '../components/Organisms/AuthForms/ForgotPassForm';
import { Nav } from '../components/Organisms/Nav';
import { createUrqlClient } from '../utils/createUrqlClient';

interface forgotPasswordProps {}

const ForgotPassword: React.FC<forgotPasswordProps> = ({}) => {
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
        <ForgotPassForm />
      </div>
    </>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(ForgotPassword);
