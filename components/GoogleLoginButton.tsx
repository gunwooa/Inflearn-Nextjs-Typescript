import { Button, Flex } from '@chakra-ui/react';
import React from 'react';

const GoogleLoginButton: React.VFC = function () {
  return (
    <Flex justify="center" px={6}>
      <Button
        size="lg"
        maxW="md"
        borderRadius="full"
        bgColor="#4285f4"
        color="white"
        colorScheme="blue"
        leftIcon={
          <img
            src="/google.svg"
            alt="google 로고"
            style={{ backgroundColor: 'white', padding: '8px', borderRadius: '50%' }}
          />
        }
      >
        Google 계정으로 시작하기
      </Button>
    </Flex>
  );
};

export default GoogleLoginButton;
