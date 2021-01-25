import React, { useState } from 'react';
import { Link } from '../Atoms/Link';
import {
  useDisclosure,
  RadioGroup,
  Stack,
  Radio,
  Button,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  Flex,
  Heading,
} from '@chakra-ui/core';

interface NavProps {}

export const Nav: React.FC<NavProps> = ({}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [placement, setPlacement] = useState<any>('top');

  return (
    <>
      <Heading position='absolute' top='2rem' left='2rem' mb={4}>
        Comp Anon
      </Heading>

      <Button
        position='absolute'
        bottom='2rem'
        left='2rem'
        zIndex={999}
        variantColor='blue'
        onClick={onOpen}
      >
        Menu
      </Button>
      <Drawer placement={placement} onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay>
          <DrawerContent>
            <Flex justifyContent='space-between' alignItems='center'>
              <DrawerHeader border='none' borderBottomWidth='1px'>
                Comp Anon
              </DrawerHeader>
              <Flex>
                <Link mr='1rem' to='/login'>
                  Login
                </Link>
                <Link mr='1rem' to='/register'>
                  Register
                </Link>
              </Flex>
            </Flex>

            <DrawerBody borderTop='0.25px solid #cecece'>
              <p>Some contents...</p>
              <p>Some contents...</p>
              <p>Some contents...</p>
            </DrawerBody>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </>
  );
};
