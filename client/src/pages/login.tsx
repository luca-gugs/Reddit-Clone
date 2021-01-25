import React from 'react';
import { LoginForm } from '../components/Organisms/LoginForm';
import { Nav } from '../components/Organisms/Nav';

interface registerProps {}

const Login: React.FC<registerProps> = ({}) => {
  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Nav />
      <LoginForm />
    </div>
  );
};

export default Login;
