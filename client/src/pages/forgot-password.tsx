import React from 'react';
import { RegisterForm } from '../components/Organisms/AuthForms/RegisterForm';
import { Nav } from '../components/Organisms/Nav';
import { withUrqlClient } from 'next-urql';
import { createUrqlClient } from '../utils/createUrqlClient';
import { ForgotPassForm } from '../components/Organisms/AuthForms/ForgotPassForm';

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

export default withUrqlClient(createUrqlClient)(ForgotPassword);
