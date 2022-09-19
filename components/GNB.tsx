import { Box, Button, Flex } from '@chakra-ui/react';
import React, { useMemo } from 'react';
import { useAuth } from '@/contexts/AuthUser.context';

const HEIGHT = 16;
const LOGO_SIZE = 40;

const GNB: React.VFC = function () {
  const { authUser, loading, signOut, signInWithGoogle } = useAuth();
  console.log(authUser);
  const authInitialized = useMemo(() => loading || !authUser, [loading, authUser]);

  return (
    <Flex alignItems="center" justify="center" mb={20} borderBottomWidth={1} borderColor="gray.100" height={HEIGHT}>
      <Box>
        <img src="/logo.svg" alt="GNB 로고" width={LOGO_SIZE} height={LOGO_SIZE} />
      </Box>
      <Button
        onClick={authInitialized ? signInWithGoogle : signOut}
        bgColor="pink.300"
        _hover={{
          bg: 'pink.300',
        }}
        color="white"
        right={4}
        position="absolute"
      >
        {authInitialized ? '로그인' : '로그아웃'}
      </Button>
    </Flex>
  );
};

export default GNB;
