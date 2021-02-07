import React from 'react';
import { Box, Button, Flex, Heading } from '@chakra-ui/core';
import { Formik, Form } from 'formik';
import { useRouter } from 'next/router';
import { useLoginMutation } from '../../../generated/graphql';
import { toErrorMap } from '../../../utils/toErrorMap';
import { InputField } from '../../Atoms/InputField';
import { Wrapper } from '../../Atoms/Wrapper';
import { Link } from '../../Atoms/Link';

interface RegisterFormProps {}

export const LoginForm: React.FC<RegisterFormProps> = ({}) => {
  const router = useRouter();
  const [, login] = useLoginMutation();
  return (
    <Wrapper variant='small'>
      <Heading as='h2' size='xl'>
        Login
      </Heading>
      <Formik
        initialValues={{ handle: '', password: '' }}
        onSubmit={async (values, { setErrors }) => {
          const response = await login({ options: values });
          if (response.data?.login.user) {
            router.push('/');
          } else if (response.data?.login.errors) {
            setErrors(toErrorMap(response.data.login.errors));
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <Box mt={8}>
              <InputField
                name='handle'
                placeholder='@jesusfucksworth'
                label='handle'
              />
            </Box>
            <Box mt={4}>
              <InputField
                name='password'
                placeholder='password'
                label='password'
                type='password'
              />
            </Box>
            <Flex mt={8} justifyContent='space-between' alignItems='flex-end'>
              <Button type='submit' isLoading={isSubmitting}>
                Login
              </Button>
              <Link to='/forgot-password'>Forgot Password</Link>
            </Flex>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};
