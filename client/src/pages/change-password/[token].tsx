import { NextPage } from 'next';
import React from 'react';
import { ChangePassForm } from '../../components/Organisms/AuthForms/ChangePassForm';
import { Nav } from '../../components/Organisms/Nav';

interface changePasswordProps {}

const ChangePassword: NextPage<{ token: string }> = ({ token }) => {
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
        <ChangePassForm />
      </div>
    </>
  );
};

ChangePassword.getInitialProps = ({ query }) => {
  return {
    token: query.token as string,
  };
};

export default ChangePassword;
