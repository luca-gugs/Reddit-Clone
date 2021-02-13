import { Box, Badge } from '@chakra-ui/core';
import { ChevronRightIcon } from '@chakra-ui/icons';

import React from 'react';
import { Link } from '../../Atoms/Link';
interface topicCardProps {
  title: string;
  text: string;
  id: number;
}

export const TopicCard: React.FC<topicCardProps> = ({ title, text, id }) => {
  return (
    <Box
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
    >
      <Box p='6'>
        <Box d='flex' alignItems='baseline'></Box>

        <Box mt='1' fontWeight='semibold' as='h4' lineHeight='tight'>
          {title}
        </Box>

        <Box>
          {text}
          <Box as='span' color='gray.600' fontSize='sm'>
            / wk
          </Box>
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
      <Link to='/post/id'>
        <ChevronRightIcon
          position='absolute'
          right='0.5'
          top='1'
          w={6}
          h={6}
          transition='transform 0.3s'
          _hover={{ transform: 'scale(1.5)', cursor: 'pointer' }}
        />
      </Link>
    </Box>
  );
};
