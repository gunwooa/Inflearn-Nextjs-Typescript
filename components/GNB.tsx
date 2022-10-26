import { Box, Button, Flex } from '@chakra-ui/react';
import React from 'react';
import { useAuth } from '@/contexts/AuthUser.context';

export const GNB_HEIGHT = 16;
const LOGO_SIZE = 40;

const GNB: React.VFC = function () {
  const { authUser, signOut, signInWithGoogle } = useAuth();

  return (
    <Flex
      pos="fixed"
      top={0}
      alignItems="center"
      justify="center"
      height={GNB_HEIGHT}
      width="100%"
      borderBottomWidth={1}
      borderColor="gray.100"
      bgColor="white"
    >
      <Box>
        <img src="/logo.svg" alt="GNB 로고" width={LOGO_SIZE} height={LOGO_SIZE} />
      </Box>
      <Box top={3} right={4} position="absolute">
        {!authUser ? (
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
