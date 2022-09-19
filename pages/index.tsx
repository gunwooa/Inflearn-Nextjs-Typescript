import { NextPage } from 'next';
import { Box, Flex, Heading } from '@chakra-ui/react';
import ServiceLayout from '@/components/ServiceLayout';
import GoogleLoginButton from '@/components/GoogleLoginButton';
import { useAuth } from '@/contexts/AuthUser.context';

const IndexPage: NextPage = function () {
  const { signInWithGoogle } = useAuth();

  return (
    <ServiceLayout title="test">
      <Box maxWidth="md" mx="auto">
        <img src="/main_log.svg" alt="메인 로고" />
        <Flex justify="center">
          <Heading>#BlahBlah</Heading>
        </Flex>
      </Box>
      <Box mt={20}>
        <GoogleLoginButton onClick={signInWithGoogle} />
      </Box>
    </ServiceLayout>
  );
};

export default IndexPage;
