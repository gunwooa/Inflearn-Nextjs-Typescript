import { Button, Flex } from '@chakra-ui/react';
import React from 'react';

interface Props {
  onClick: () => void;
}

const GoogleLoginButton: React.VFC<Props> = function ({ onClick }) {
  return (
    <Flex justify="center">
      <Button
        onClick={onClick}
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
