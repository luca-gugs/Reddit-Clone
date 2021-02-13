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
  Menu,
  MenuButton,
  MenuDivider,
  MenuGroup,
  MenuItem,
  MenuList,
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
        <Box
          position='absolute'
          left='0'
          right='0'
          ml='auto'
          mr='auto'
          textAlign='center'
        >
          <Link to={`/user/${data.me.id}`}>{data.me.handle}</Link>
        </Box>
      </>
    );
  }

  return (
    <>
      <Flex w='100%' mt='2' position='relative' alignItems='center'>
        <Heading pl='8'>CAC</Heading>
        {body}
      </Flex>
      <Menu>
        <MenuButton
          position='absolute'
          bottom='2rem'
          left='2rem'
          zIndex={999}
          // @ts-ignore: variantColor is borking out for no reason
          variantColor='blue'
          onClick={onOpen}
          as={Button}
        >
          Menu
        </MenuButton>
        <MenuList placement='top-start'>
          <Link to='/'>
            <MenuItem>Root</MenuItem>
          </Link>
          <MenuGroup title={data?.me ? data.me.handle : 'Profile'}>
            {!data?.me ? (
              <>
                <>
                  <Link to='/login'>
                    <MenuItem>Login</MenuItem>
                  </Link>
                  <Link to='/register'>
                    <MenuItem>Register</MenuItem>
                  </Link>
                </>
              </>
            ) : (
              <>
                <MenuItem>My Account</MenuItem>
              </>
            )}
          </MenuGroup>
          <MenuDivider />
          <MenuGroup title='Help'>
            {data?.me && (
              <MenuItem
                onClick={() => {
                  logout();
                }}
              >
                Logout
              </MenuItem>
            )}
            <Link to='/faq'>
              <MenuItem>FAQ</MenuItem>
            </Link>
          </MenuGroup>
        </MenuList>
      </Menu>
    </>
  );
};
