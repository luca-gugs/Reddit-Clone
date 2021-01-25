import React from 'react';
import { LoginForm } from '../components/Organisms/LoginForm';
import { Nav } from '../components/Organisms/Nav';

interface registerProps {}

const Login: React.FC<registerProps> = ({}) => {
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
        <LoginForm />
      </div>
    </>
  );
};

export default Login;
