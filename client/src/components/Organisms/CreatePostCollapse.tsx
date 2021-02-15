import {
  Box,
  Button,
  Collapse,
  Flex,
  Checkbox,
  FormLabel,
} from '@chakra-ui/core';
import { Field, Form, Formik } from 'formik';
import { useRouter } from 'next/router';
import React from 'react';
import { useCreatePostMutation, useMeQuery } from '../../generated/graphql';
import { isServer } from '../../utils/isServer';
import { InputField } from '../Atoms/InputField';
import { Link } from '../Atoms/Link';
import { Wrapper } from '../Atoms/Wrapper';
interface CreatePostCollapseProps {}

export const CreatePostCollapse: React.FC<CreatePostCollapseProps> = ({}) => {
  const router = useRouter();
  const [show, setShow] = React.useState(false);
  const [, createPost] = useCreatePostMutation();
  const [{ data, fetching }] = useMeQuery({
    pause: isServer(),
  });

  const handleToggle = () => setShow(!show);

  return (
    <Box width='50%' mt={8}>
      <Wrapper variant='xl'>
        <Button outline='none' variantColor='blue' onClick={handleToggle}>
          Create New Post
        </Button>
        <Collapse isOpen={show}>
          <Formik
            initialValues={{ title: '', text: '', anon: false }}
            onSubmit={async (values, { setErrors }) => {
              const { error } = await createPost({ input: values });
              if (error) {
                router.push('/login');
              } else {
                setShow(false);
              }
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
                  {data?.me ? (
                    <Flex
                      w='100%'
                      justifyContent='space-between'
                      alignItems='center'
                    >
                      <Button type='submit' isLoading={isSubmitting}>
                        Post
                      </Button>
                      <FormLabel htmlFor='anon' padding='0 '>
                        <Field
                          type='checkbox'
                          name='anon'
                          style={{ marginRight: '0.5rem' }}
                        />
                        Post as Anon
                      </FormLabel>
                    </Flex>
                  ) : (
                    <Flex>
                      To create a topic
                      <Link m='0 0.5rem' to={'/login?next=' + router.pathname}>
                        Login
                      </Link>
                      or
                      <Link m='0 0.5rem' to='/register'>
                        Register
                      </Link>
                    </Flex>
                  )}
                </Flex>
              </Form>
            )}
          </Formik>
        </Collapse>
      </Wrapper>
    </Box>
  );
};
