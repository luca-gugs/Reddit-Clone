import React, { useEffect, useState } from 'react';
import { Link } from '../Atoms/Link';
import { useMeQuery } from '../../generated/graphql';
import { useRouter } from 'next/router';
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
  Box,
} from '@chakra-ui/core';

interface NavProps {}

export const Nav: React.FC<NavProps> = ({}) => {
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [placement, setPlacement] = useState<any>('top');
  const [{ data, fetching }] = useMeQuery();
  let body = null;
  console.log(router, 'router');
  const hideOnPath =
    router.asPath === '/login' || router.asPath === '/register';
  if (fetching) {
  } else if (!data?.me) {
    body = (
      <>
        <Flex
          position='absolute'
          left='0'
          right='0'
          ml='auto'
          mr='auto'
          justifyContent='center'
        >
          <Link m='0 0.5rem' to='/login'>
            Login
          </Link>
          <Link m='0 0.5rem' to='/login'>
            Register
          </Link>
        </Flex>
      </>
    );
  } else {
    body = (
      <>
        <Box
          position='absolute'
          left='0'
          right='0'
          ml='auto'
          mr='auto'
          textAlign='center'
        >
          {data.me.handle}
        </Box>
      </>
    );
  }

  return (
    <>
      <Flex w='100%' mt='2' position='relative' alignItems='center'>
        <Heading pl='4'>CAC</Heading>
        {body}
      </Flex>
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
                CAC
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
