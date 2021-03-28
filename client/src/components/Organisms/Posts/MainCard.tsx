import {
  Button,
  Heading,
  PseudoBox,
  Text,
  useDisclosure,
} from '@chakra-ui/core';
import { ScaleFade } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useMeQuery } from '../../../generated/graphql';
import { isServer } from '../../../utils/isServer';
import { DootSection } from '../../Atoms/DootSection';
import { UpdatePostForm } from '../../Atoms/UpdatePostForm';
interface mainCardProps {
  post: any;
}

export const MainCard: React.FC<mainCardProps> = ({ post }) => {
  const { isOpen, onToggle } = useDisclosure();
  const [editMode, setEditMode] = useState(false);
  const [_me] = useMeQuery({
    pause: isServer(),
  });

  let meId = _me.data?.me?.id;

  useEffect(() => {
    !isOpen && onToggle();
  }, []);

  return (
    <ScaleFade initialScale={0.9} in={isOpen}>
      <PseudoBox
        position='relative'
        minHeight='12rem'
        minWidth='300px'
        w={['90%', '80%']}
        shadow='md'
        ml={[4, 8]}
        mt={4}
        backgroundColor='#f9f9f9'
        pt={2}
        pl={4}
      >
        {!editMode ? (
          <>
            <Heading
              as='h2'
              w='85%'
              size={post?.title?.length < 100 ? 'xl' : 'md'}
              pb='4'
            >
              {post?.title}
            </Heading>
            <Text w='85%' fontSize='xl' pb='4'>
              {post?.text}
            </Text>

            <DootSection
              size='large'
              points={post?.points}
              postId={post?.id}
              voteStatus={post?.voteStatus}
            />
          </>
        ) : (
          <UpdatePostForm
            title={post?.title}
            text={post?.text}
            pId={post?.id}
            setMode={setEditMode}
          />
        )}

        {post?.creator?.id === meId && (
          <Button
            position='absolute'
            right='1'
            bottom='1'
            size='xs'
            zIndex={999}
            onClick={() => setEditMode(!editMode)}
          >
            {!editMode ? 'Edit' : 'Revert'}
          </Button>
        )}
      </PseudoBox>
    </ScaleFade>
  );
};
