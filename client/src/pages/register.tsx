import React from 'react';

import { RegisterForm } from '../components/Organisms/RegisterForm';
import { Nav } from '../components/Organisms/Nav';

interface registerProps {}

const Register: React.FC<registerProps> = ({}) => {
  return (
    <div
      style={{
        height: '100vh',
        minHeight: '40rem',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Nav />
      <RegisterForm />
    </div>
  );
};

export default Register;
