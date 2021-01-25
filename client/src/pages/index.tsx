import { Link as ChakraLink, List } from '@chakra-ui/core';
import React from 'react';
import { Nav } from '../components/Organisms/Nav';

interface indexProps {}

const Index: React.FC<indexProps> = ({}) => {
  return (
    <div
      style={{
        // height: '100vh',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Nav />
    </div>
  );
};

export default Index;
