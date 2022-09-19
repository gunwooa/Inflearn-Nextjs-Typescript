import { NextPage } from 'next';
import { Box, Flex, Heading } from '@chakra-ui/react';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import ServiceLayout from '@/components/ServiceLayout';
import GoogleLoginButton from '@/components/GoogleLoginButton';
import FirebaseClient from '@/models/firebase_client';

const provider = new GoogleAuthProvider();

const IndexPage: NextPage = function () {
  return (
    <ServiceLayout title="test">
      <Box maxWidth="md" mx="auto">
        <img src="/main_log.svg" alt="메인 로고" />
        <Flex justify="center">
          <Heading>#BlahBlah</Heading>
        </Flex>
      </Box>
      <Box mt={20}>
        <GoogleLoginButton
          onClick={() => {
            signInWithPopup(FirebaseClient.getInstance().Auth, provider)
              .then((result) => {
                console.info(result.user);
              })
              .catch((error) => {
                console.error(error);
              });
          }}
        />
      </Box>
    </ServiceLayout>
  );
};

export default IndexPage;
