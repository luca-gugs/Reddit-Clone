import { Box, Badge } from '@chakra-ui/core';
import { Image } from '@chakra-ui/react';

import React from 'react';
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
      mr={4}
      ml={4}
      borderWidth='1px'
      borderRadius='lg'
      overflow='hidden'
    >
      <Box p='6'>
        <Box d='flex' alignItems='baseline'></Box>

        <Box mt='1' fontWeight='semibold' as='h4' lineHeight='tight'>
          {/* {property.title} */}
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
      <img src='/expandCardIcon.png' />
    </Box>
  );
};
