import { Box, Button, Heading } from '@chakra-ui/core';
import { Form, Formik } from 'formik';
import React from 'react';
import { InputField } from '../../Atoms/InputField';
import { Wrapper } from '../../Atoms/Wrapper';

interface ChangePassFormProps {}

export const ChangePassForm: React.FC<ChangePassFormProps> = ({}) => {
  return (
    <Wrapper variant='small'>
      <Heading as='h2' size='xl'>
        Change Password
      </Heading>
      <Formik
        initialValues={{ password: '' }}
        onSubmit={async (values, { setErrors }) => {
          console.log('Values: ', values);
          console.log('SetErrors: ', setErrors);
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <Box mt={8}>
              <InputField
                name='password'
                placeholder='Password'
                label='New Password'
              />
            </Box>

            <Button type='submit' mt={8} isLoading={isSubmitting}>
              Update My Password
            </Button>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};
