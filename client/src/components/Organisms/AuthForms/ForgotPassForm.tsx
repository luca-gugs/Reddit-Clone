import React from 'react';
import { Box, Button, Heading } from '@chakra-ui/core';
import { Formik, Form } from 'formik';
import { useRouter } from 'next/router';
import { useRegisterMutation } from '../../../generated/graphql';
import { toErrorMap } from '../../../utils/toErrorMap';
import { InputField } from '../../Atoms/InputField';
import { Wrapper } from '../../Atoms/Wrapper';

interface ForgotPassFormProps {}

export const ForgotPassForm: React.FC<ForgotPassFormProps> = ({}) => {
  const router = useRouter();
  const [, register] = useRegisterMutation();
  return (
    <Wrapper variant='small'>
      <Heading as='h2' size='xl'>
        Forgot Password
      </Heading>
      <Formik
        initialValues={{ handle: '', password: '' }}
        onSubmit={async (values, { setErrors }) => {
          const response = await register(values);
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
                placeholder='george@jesusfucksworth.com'
                label='email'
              />
            </Box>
            <Button type='submit' mt={8} isLoading={isSubmitting}>
              Send Reset Email
            </Button>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};
