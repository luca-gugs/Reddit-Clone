import { Box, Button, Flex, Heading } from '@chakra-ui/core';
import {
  Menu,
  MenuButton,
  MenuDivider,
  MenuGroup,
  MenuItem,
  MenuList,
} from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';
import { useRouter } from 'next/router';
import React from 'react';
import { useLogoutMutation, useMeQuery } from '../../generated/graphql';
import { isServer } from '../../utils/isServer';
import { Link } from '../Atoms/Link';
import { chakra } from '@chakra-ui/react';

interface NavProps {}

export const Nav: React.FC<NavProps> = ({}) => {
  const router = useRouter();
  // const { isOpen, onOpen, onClose } = useDisclosure();
  const [{ data, fetching }] = useMeQuery({
    pause: isServer(),
  });
  const [, logout] = useLogoutMutation();

  let body = null;
  const hideOnPath =
    router.asPath === '/login' || router.asPath === '/register';
  if (data?.me && hideOnPath) {
    router.push('/');
  }
  if (fetching) {
  } else if (!data?.me) {
    body = null;
  } else {
    body = (
      <>
        <Box left='0' right='0' ml='auto' mr='auto' textAlign='center'>
          <Link to={`/user/${data.me.id}`}>{data.me.handle}</Link>
        </Box>
      </>
    );
  }

  return (
    <>
      <Flex
        w='100%'
        h='7rem'
        position='sticky'
        top='0'
        alignItems='center'
        justifyContent='space-between'
        zIndex={999}
        backgroundColor='rgba(255,255,255,0.5)'
      >
        <Link to='/'>
          <Heading pl={8}>CAC</Heading>
        </Link>
        {body}
        <Box pr={8}>
          <Menu>
            <MenuButton
              color='white'
              style={{ backgroundColor: '#3182ce' }}
              as={Button}
            >
              Actions
            </MenuButton>
            <MenuList
              w='200px'
              bgColor='white'
              borderRadius='0.4rem'
              borderWidth='1px'
              borderColor='1px solidrgb(226, 232, 240)'
              shadow='0 1px 2px 0 rgb(0 0 0 / 5%)'
            >
              {data?.me && (
                <>
                  <Link to='/account'>
                    <MenuItem
                      p='0.25rem 0.5rem'
                      _hover={{ bgColor: '#EDF2F7' }}
                    >
                      My Account
                    </MenuItem>
                  </Link>

                  <MenuItem
                    p='0.25rem 0.5rem'
                    textAlign='right'
                    _hover={{ bgColor: '#EDF2F7' }}
                    onClick={() => {
                      logout();
                    }}
                  >
                    Logout
                  </MenuItem>
                </>
              )}

              {!data?.me && (
                <>
                  <Link to='/login'>
                    <MenuItem
                      p='0.25rem 0.5rem'
                      _hover={{ bgColor: '#EDF2F7' }}
                    >
                      Login
                    </MenuItem>
                  </Link>
                  <Link to='/register'>
                    <MenuItem
                      p='0.25rem 0.5rem'
                      _hover={{ bgColor: '#EDF2F7' }}
                    >
                      Register
                    </MenuItem>
                  </Link>
                </>
              )}
            </MenuList>
          </Menu>
        </Box>
      </Flex>
    </>
  );
};
