import { Box, Badge, PseudoBox, Text } from '@chakra-ui/core';
import { ChevronRightIcon, MoonIcon, SunIcon } from '@chakra-ui/icons';
import { IconButton } from '@chakra-ui/react';

import React from 'react';
import { DootSection } from '../../Atoms/DootSection';
import { Link } from '../../Atoms/Link';
interface topicCardProps {
  title: string;
  text: string;
  id: number;
  anon: boolean | null;
  creator: { handle: string; id: number };
  points: number;
  voteStatus: number | null;
}

export const TopicCard: React.FC<topicCardProps> = ({
  title,
  text,
  id,
  anon,
  creator,
  points,
  voteStatus,
}) => {
  return (
    <PseudoBox
      pos='relative'
      w='275px'
      h='fit-content'
      minH='170px'
      mt={4}
      mr={2}
      ml={2}
      borderWidth='1px'
      borderRadius='lg'
      overflow='hidden'
      _hover={{
        shadow: 'md',
        transition: 'box-shadow 0.3s',
        cursor: 'pointer',
      }}
    >
      <PseudoBox position='absolute' left='2' top='1'>
        <Link underline='' to={`/user/${creator.id}`}>
          <Text fontSize='xs'>{anon ? '@anon' : creator.handle}</Text>
        </Link>
      </PseudoBox>
      <Box p='1.5rem 1.75rem 1.5rem 1rem'>
        <Box d='flex' alignItems='baseline'></Box>

        <Box mt='1' fontWeight='semibold' as='h4' lineHeight='tight'>
          {title}
        </Box>

        <Box>
          {text.slice(0, 250)} {text.length > 250 && '...'}
        </Box>
      </Box>
      <Box
        position='absolute'
        right='0'
        bottom='0'
        color='gray.500'
        fontWeight='semibold'
        letterSpacing='wide'
        fontSize='xs'
        textTransform='uppercase'
        textAlign='right'
        mr='1'
      >
        #{id}
      </Box>
      <Link to={`/post/${id}`}>
        <ChevronRightIcon
          position='absolute'
          right='0.5'
          top='1'
          w={6}
          h={6}
          transition='transform 0.3s'
          _hover={{ transform: 'scale(1.5)', cursor: 'pointer' }}
          zIndex={2}
        />
      </Link>
      <DootSection points={points} postId={id} voteStatus={voteStatus} />
    </PseudoBox>
  );
};
