import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Heading,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  useDisclosure,
} from '@chakra-ui/core';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useLogoutMutation, useMeQuery } from '../../generated/graphql';
import { Link } from '../Atoms/Link';
import { isServer } from '../../utils/isServer';

interface NavProps {}

export const Nav: React.FC<NavProps> = ({}) => {
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [placement, setPlacement] = useState<any>('top');
  const [{ data, fetching }] = useMeQuery({
    pause: isServer(),
  });
  const [{ fetching: fetchingLogout }, logout] = useLogoutMutation();

  let body = null;
  // const hideOnPath =
  //   router.asPath === '/login' || router.asPath === '/register';
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
          <Link m='0 0.5rem' to='/register'>
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
          <Popover>
            <PopoverTrigger>
              <Button
                bg='none'
                mt='0.5rem'
                outline='none'
                height='1rem'
                _hover={{
                  bg: 'none',
                  outline: 'none',
                }}
                _active={{
                  bg: 'none',
                  outline: 'none',
                }}
                _focus={{
                  bg: 'none',
                  outline: 'none',
                }}
              >
                {data.me.handle}
              </Button>
            </PopoverTrigger>
            <PopoverContent
              // top='-4rem'
              _focus={{
                bg: 'none',
                outline: 'none',
              }}
            >
              <PopoverHeader>Confirmation!</PopoverHeader>
              <PopoverBody>
                <Button
                  variant='link'
                  isLoading={fetchingLogout}
                  onClick={() => {
                    logout();
                  }}
                >
                  Logout
                </Button>{' '}
              </PopoverBody>
            </PopoverContent>
          </Popover>
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
