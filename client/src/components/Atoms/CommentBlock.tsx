import { Box, Button, Flex, Text } from '@chakra-ui/core';
import React, { useState } from 'react';
import { Link } from './Link';

interface CommentBlockProps {
  elm: any;
}

export const CommentBlock: React.FC<CommentBlockProps> = ({ elm }) => {
  const [showFull, setShowFull] = useState(false);
  const needsExpansion = elm.text.length > 400 ? true : false;
  let shortenedVariant = elm.text.slice(0, 400);

  return (
    <Box
      w={['90%', '45%']}
      maxH={showFull ? '' : '300px'}
      shadow='md'
      ml={[6, 12]}
      mt={4}
      backgroundColor='#fffaf1'
      px={4}
      py={2}
    >
      <Flex w='100%' justifyContent='space-between' alignItems='center' pb={1}>
        <Link to={`/user/${elm.creator.id}`}>{elm.creator.handle}</Link>
        <Text fontSize='sm'>{elm.createdAt}</Text>
      </Flex>
      {!needsExpansion ? (
        <Text w='85%' fontSize='xl' height='100%' overflow='hidden'>
          {elm.text}
        </Text>
      ) : (
        <>
          <Text>{showFull ? elm.text : shortenedVariant + '...'}</Text>
          <Flex justifyContent='flex-end'>
            <Button size='xs' onClick={() => setShowFull(!showFull)}>
              {!showFull ? 'Show Rest' : 'Hide'}
            </Button>
          </Flex>
        </>
      )}
    </Box>
  );
};
