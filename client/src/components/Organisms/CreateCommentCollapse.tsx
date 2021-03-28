import { Box, Button, Collapse, Flex, FormLabel } from '@chakra-ui/core';
import { Field, Form, Formik } from 'formik';
import { useRouter } from 'next/router';
import React from 'react';
import { useAddCommentMutation, useMeQuery } from '../../generated/graphql';
import { isServer } from '../../utils/isServer';
import { InputField } from '../Atoms/InputField';
import { Link } from '../Atoms/Link';
import { Wrapper } from '../Atoms/Wrapper';
interface createCommentCollapse {
  id: any;
}

export const CreateCommentCollapse: React.FC<createCommentCollapse> = ({
  id,
}) => {
  const router = useRouter();
  const [show, setShow] = React.useState(false);
  const [, addComment] = useAddCommentMutation();
  const [{ data }] = useMeQuery({
    pause: isServer(),
  });

  const handleToggle = () => setShow(!show);

  return (
    <Box width='50%' mt={8} ml={4}>
      <Wrapper variant='xl'>
        <Button outline='none' variantColor='blue' onClick={handleToggle}>
          {show ? 'Hide' : 'Add Comment'}
        </Button>
        <Collapse isOpen={show}>
          <Formik
            initialValues={{ text: '', anon: false }}
            onSubmit={async values => {
              const { error } = await addComment({
                text: values.text,
                postId: id,
              });
              setShow(false);
              values.text = '';
              console.log('Error: ', error);
            }}
          >
            {({ isSubmitting }) => (
              <Form>
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
                        Comment
                      </Button>
                      <FormLabel htmlFor='anon' padding='0 '>
                        <Field
                          type='checkbox'
                          name='anon'
                          style={{ marginRight: '0.5rem' }}
                        />
                        Comment as Anon
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
