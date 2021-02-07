import { Box, Button, Flex, Heading } from '@chakra-ui/core';
import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from '@chakra-ui/core';
import { Form, Formik } from 'formik';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useChangePasswordMutation } from '../../../generated/graphql';
import { toErrorMap } from '../../../utils/toErrorMap';
import { InputField } from '../../Atoms/InputField';
import { Link } from '../../Atoms/Link';
import { Wrapper } from '../../Atoms/Wrapper';

interface ChangePassFormProps {
  token: string;
}

export const ChangePassForm: React.FC<ChangePassFormProps> = ({
  token,
}: ChangePassFormProps) => {
  const router = useRouter();
  const [, changePassword] = useChangePasswordMutation();
  const [tokenError, setTokenError] = useState('');
  return (
    <Wrapper variant='small'>
      <Heading as='h2' size='xl'>
        Change Password
      </Heading>
      <Formik
        initialValues={{ newPassword: '' }}
        onSubmit={async (values, { setErrors }) => {
          const response = await changePassword({
            token,
            newPassword: values.newPassword,
          });
          if (response.data?.changePassword.errors) {
            const errorMap = toErrorMap(response.data.changePassword.errors);
            if ('token' in errorMap) {
              setTokenError(errorMap.token);
            }
            setErrors(errorMap);
          } else if (response.data?.changePassword.user) {
            router.push('/');
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <Box mt={8}>
              <InputField
                name='newPassword'
                placeholder='New Password'
                label='New Password'
                type='password'
              />
              {tokenError && (
                <Alert mt={4} status='error'>
                  <AlertIcon />
                  {tokenError}
                </Alert>
              )}
            </Box>

            <Flex mt={8} justifyContent='space-between' alignItems='flex-end'>
              <Button type='submit' isLoading={isSubmitting}>
                Change Password
              </Button>
              <Link to='/forgot-password'>I forgot Again</Link>
            </Flex>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};
