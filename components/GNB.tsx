import { Box, Button, Flex } from '@chakra-ui/react';
import React, { useMemo } from 'react';
import { useAuth } from '@/contexts/AuthUser.context';

const HEIGHT = 16;
const LOGO_SIZE = 40;

const GNB: React.VFC = function () {
  const { authUser, loading, signOut, signInWithGoogle } = useAuth();

  const authInitialized = useMemo(() => loading || !authUser, [loading, authUser]);

  return (
    <Flex alignItems="center" justify="center" borderBottomWidth={1} borderColor="gray.100" height={HEIGHT}>
      <Box>
        <img src="/logo.svg" alt="GNB 로고" width={LOGO_SIZE} height={LOGO_SIZE} />
      </Box>
      <Box top={3} right={4} position="absolute">
        {authInitialized ? (
          <Button
            onClick={signInWithGoogle}
            bgColor="pink.300"
            _hover={{
              bg: 'pink.300',
            }}
            fontSize="small"
            color="white"
          >
            로그인
          </Button>
        ) : (
          <Button onClick={signOut} color="gray.500" fontSize="small" as="a">
            로그아웃
          </Button>
        )}
      </Box>
    </Flex>
  );
};

export default GNB;
