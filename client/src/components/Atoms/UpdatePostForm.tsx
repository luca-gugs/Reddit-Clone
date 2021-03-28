import { Box, Flex, Button } from '@chakra-ui/core';
import { Formik, Form } from 'formik';
import React from 'react';
import { InputField } from './InputField';
import { useUpdatePostMutation } from '../../generated/graphql';

interface UpdatePostFormProps {
  title: string;
  text: string;
  pId: number;
  setMode: any;
}

export const UpdatePostForm: React.FC<UpdatePostFormProps> = ({
  title,
  text,
  pId,
  setMode,
}) => {
  const [, updatePost] = useUpdatePostMutation();
  return (
    <Formik
      initialValues={{ title: `${title}`, text: `${text}`, anon: false }}
      onSubmit={async values => {
        await updatePost({
          id: pId,
          title: values.title,
          text: values.text,
        });
        setMode(false);
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
            pb={4}
            justifyContent='space-between'
            alignItems='flex-end'
          >
            <Button type='submit' isLoading={isSubmitting}>
              Update
            </Button>
          </Flex>
        </Form>
      )}
    </Formik>
  );
};
