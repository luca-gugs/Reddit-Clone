import { useDisclosure } from '@chakra-ui/core';
import { ScaleFade } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { timeDifference } from '../../utils/timeAgo';
import { CommentBlock } from '../Atoms/CommentBlock';
import { CreateCommentCollapse } from './CreateCommentCollapse';

interface commentSectionProps {
  comments: any;
  id: any;
}

export const CommentSection: React.FC<commentSectionProps> = ({
  comments,
  id,
}) => {
  const { isOpen, onToggle } = useDisclosure();

  var current = new Date();

  if (comments) {
    for (let i = 0; i < comments.length; i++) {
      var current = new Date();
      let createdAt = timeDifference(current, comments[i].createdAt);
      comments[i].createdAt = createdAt;
    }
  }

  useEffect(() => {
    !isOpen && onToggle();
  }, []);
  return (
    <ScaleFade initialScale={0.9} in={isOpen}>
      {comments?.map((elm: { creator: any; createdAt: any; text: any }) => {
        return <CommentBlock elm={elm} />;
      })}
      <CreateCommentCollapse id={id} />
    </ScaleFade>
  );
};
