import React from 'react';

import { RegisterForm } from '../components/Organisms/RegisterForm';
import { Nav } from '../components/Organisms/Nav';

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

export default Register;
