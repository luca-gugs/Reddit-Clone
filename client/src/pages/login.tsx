import { withUrqlClient } from 'next-urql';
// import { random } from '../public/static/random.png';
import { useRouter } from 'next/router';
import React from 'react';
import { LoginForm } from '../components/Organisms/AuthForms/LoginForm';
import { Nav } from '../components/Organisms/Nav';
import { createUrqlClient } from '../utils/createUrqlClient';
interface registerProps {}

const Login: React.FC<registerProps> = ({}) => {
  const router = useRouter();
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

export default withUrqlClient(createUrqlClient)(Login);
