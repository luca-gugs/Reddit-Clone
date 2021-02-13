import {
  Alert,
  AlertIcon,
  Box,
  Button,
  Collapse,
  Flex,
  Textarea,
} from '@chakra-ui/core';
import { Form, Formik } from 'formik';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import {
  useChangePasswordMutation,
  useCreatePostMutation,
} from '../../generated/graphql';
import { InputField } from '../Atoms/InputField';
import { Wrapper } from '../Atoms/Wrapper';

interface CreatePostCollapseProps {}

export const CreatePostCollapse: React.FC<CreatePostCollapseProps> = ({}) => {
  const [show, setShow] = React.useState(false);
  const [, createPost] = useCreatePostMutation();
  const handleToggle = () => setShow(!show);
  return (
    <Box width='50%' mt={8}>
      <Wrapper variant='xl'>
        <Button outline='none' variantColor='blue' onClick={handleToggle}>
          Create New Post
        </Button>
        <Collapse isOpen={show}>
          <Formik
            initialValues={{ title: '', text: '' }}
            onSubmit={async (values, { setErrors }) => {
              await createPost({ input: values });
            }}
          >
            {({ isSubmitting }) => (
              <Form>
                <Box mt={3} mb={3}>
                  <InputField name='title' placeholder='Title' type='title' />
                </Box>
                <Box mt={2} mb={2}>
                  <InputField
                    name='text'
                    placeholder='The quick brown fox jumps over the lazy doge coin'
                    type='text'
                    textArea
                  />
                </Box>

                <Flex
                  mt={4}
                  justifyContent='space-between'
                  alignItems='flex-end'
                >
                  <Button type='submit' isLoading={isSubmitting}>
                    Post
                  </Button>
                </Flex>
              </Form>
            )}
          </Formik>
        </Collapse>
      </Wrapper>
    </Box>
  );
};
