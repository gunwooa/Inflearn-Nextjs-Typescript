import { NextPage } from 'next';
import React from 'react';
import { Avatar, Box, Flex, Text } from '@chakra-ui/react';
import ServiceLayout from '@/components/ServiceLayout';
import { InAuthUser } from '@/models/in_auth_user';

const USER_INFO: InAuthUser = {
  uid: 'test',
  email: 'gunwooooa@gmail.com',
  displayName: 'GW D',
  photoURL: 'https://lh3.googleusercontent.com/a/ALm5wu1s26VqzFeHv0hdABFJmyqqjA5PBTsTkbGsszf8rA=s96-c',
};

const UserHomePage: NextPage = function () {
  return (
    <ServiceLayout title="user home">
      <Box bgColor="white">
        <Flex p={4}>
          <Avatar src={USER_INFO.photoURL ?? ''} size="lg" />
          <Flex direction="column" justify="center" ml={2}>
            <Text fontSize="md">{USER_INFO.displayName}</Text>
            <Text fontSize="sm">{USER_INFO.email}</Text>
          </Flex>
        </Flex>
      </Box>
    </ServiceLayout>
  );
};

export default UserHomePage;
