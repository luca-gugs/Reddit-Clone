import { PseudoBox } from '@chakra-ui/core';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import { IconButton } from '@chakra-ui/react';
import React, { useState } from 'react';
import { useVoteMutation } from '../../generated/graphql';

interface dootSectionProps {
  points: number;
  postId: number;
  voteStatus: number | null;
  size?: 'large' | 'small';
}
export const DootSection: React.FC<dootSectionProps> = ({
  points = 0,
  postId,
  voteStatus,
  size = 'small',
}) => {
  const [loadingState, setLoadingState] = useState<any>();
  const [, vote] = useVoteMutation();
  return (
    <PseudoBox
      position='absolute'
      right={size === 'large' ? '3' : '1'}
      top='0'
      bottom='0'
      my='auto'
      display='flex'
      flexDirection='column'
      alignItems='center'
      justifyContent='center'
      zIndex={1}
    >
      <PseudoBox
        transition='transform 0.3s'
        _hover={{ transform: 'scale(1.2)', cursor: 'pointer' }}
        p='0.5rem 0'
      >
        <IconButton
          disabled={voteStatus === 1}
          onClick={() => {
            setLoadingState('updoot-loading');
            vote({
              postId: postId,
              value: 1,
            });
            setLoadingState('');
          }}
          isLoading={loadingState === 'updoot-loading'}
          icon={
            size === 'large' ? (
              <SunIcon color={voteStatus === 1 ? 'white' : ''} w={6} h={6} />
            ) : (
              <SunIcon color={voteStatus === 1 ? 'white' : ''} />
            )
          }
          aria-label='updoot'
          p='1'
          backgroundColor={voteStatus === 1 ? 'black' : ''}
        />
      </PseudoBox>

      {points && points}

      <PseudoBox
        transition='transform 0.3s'
        _hover={{ transform: 'scale(1.2)', cursor: 'pointer' }}
        p='0.5rem 0'
      >
        <IconButton
          disabled={voteStatus === -1}
          onClick={() => {
            setLoadingState('downdoot-loading');
            vote({
              postId: postId,
              value: -1,
            });
            setLoadingState('');
          }}
          isLoading={loadingState === 'downdoot-loading'}
          icon={
            size === 'large' ? (
              <MoonIcon color={voteStatus === -1 ? 'white' : ''} w={6} h={6} />
            ) : (
              <MoonIcon color={voteStatus === -1 ? 'white' : ''} />
            )
          }
          aria-label='downdoot'
          backgroundColor={voteStatus === -1 ? 'black' : ''}
          p='1'
        />
      </PseudoBox>
    </PseudoBox>
  );
};
