import { Box, Button, Flex, Heading } from '@chakra-ui/core';
import { Form, Formik } from 'formik';
import { useRouter } from 'next/router';
import React from 'react';
import { useState } from 'react';
import { useForgotPasswordMutation } from '../../../generated/graphql';
import { InputField } from '../../Atoms/InputField';
import { Link } from '../../Atoms/Link';
import { Wrapper } from '../../Atoms/Wrapper';

interface ForgotPassFormProps {}

export const ForgotPassForm: React.FC<ForgotPassFormProps> = ({}) => {
  const [complete, setComplete] = useState(false);
  const [, forgotPassword] = useForgotPasswordMutation();
  return (
    <Wrapper variant='small'>
      <Heading as='h2' size='xl'>
        Forgot Password
      </Heading>
      <Formik
        initialValues={{ email: '' }}
        onSubmit={async (values, { setErrors }) => {
          await forgotPassword(values);
          setComplete(true);
        }}
      >
        {({ isSubmitting }) =>
          complete ? (
            <Box mt={8}>
              If an account with that email exists an update link has been sent
            </Box>
          ) : (
            <Form>
              <Box mt={8}>
                <InputField
                  name='email'
                  placeholder='george@jesusfucksworth.com'
                  label='email'
                />
              </Box>
              <Flex mt={8} justifyContent='space-between' alignItems='flex-end'>
                <Button type='submit' isLoading={isSubmitting}>
                  Send Reset Email
                </Button>
                <Link to='/login'>Wait I remembered</Link>
              </Flex>
            </Form>
          )
        }
      </Formik>
    </Wrapper>
  );
};
