import React from 'react';
import { Box, Button, Flex, Heading } from '@chakra-ui/core';
import { Formik, Form } from 'formik';
import { useRouter } from 'next/router';
import { useRegisterMutation } from '../../../generated/graphql';
import { toErrorMap } from '../../../utils/toErrorMap';
import { InputField } from '../../Atoms/InputField';
import { Wrapper } from '../../Atoms/Wrapper';
import { Link } from '../../Atoms/Link';

interface RegisterFormProps {}

export const RegisterForm: React.FC<RegisterFormProps> = ({}) => {
  const router = useRouter();
  const [, register] = useRegisterMutation();
  return (
    <Wrapper variant='small'>
      <Heading as='h2' size='xl'>
        Register
      </Heading>
      <Formik
        initialValues={{ handle: '', password: '' }}
        onSubmit={async (values, { setErrors }) => {
          const response = await register(values);
          console.log(response);
          if (response.data?.register.user) {
            router.push('/');
          } else if (response.data?.register.errors) {
            setErrors(toErrorMap(response.data.register.errors));
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
                Register
              </Button>
              <Link to='/login'>Login</Link>
            </Flex>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};
