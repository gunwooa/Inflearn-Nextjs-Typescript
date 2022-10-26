import { NextPage } from 'next';
import { Box, Flex, Heading } from '@chakra-ui/react';
import ServiceLayout from '@/components/ServiceLayout';
import GoogleLoginButton from '@/components/GoogleLoginButton';
import { useAuth } from '@/contexts/AuthUser.context';

const IndexPage: NextPage = function () {
  const { authUser, signInWithGoogle } = useAuth();

  return (
    <ServiceLayout title="test">
      <Box mt={5} px={5}>
        <Box maxWidth="md" mx="auto">
          <img src="/main_logo.svg" alt="메인 로고" />
          <Flex justify="center">
            <Heading>#BlahBlah</Heading>
          </Flex>
        </Box>
        {!authUser && (
          <Box mt="40">
            <GoogleLoginButton onClick={signInWithGoogle} />
          </Box>
        )}
      </Box>
    </ServiceLayout>
  );
};

export default IndexPage;
