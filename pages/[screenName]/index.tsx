import { NextPage } from 'next';
import React, { useState } from 'react';
import { Avatar, Box, Button, Flex, Text, Textarea } from '@chakra-ui/react';
import ResizeTextArea from 'react-textarea-autosize';
import ServiceLayout from '@/components/ServiceLayout';
import { InAuthUser } from '@/models/in_auth_user';

const USER_INFO: InAuthUser = {
  uid: 'test',
  email: 'gunwooooa@gmail.com',
  displayName: 'GW D',
  photoURL: 'https://lh3.googleusercontent.com/a/ALm5wu1s26VqzFeHv0hdABFJmyqqjA5PBTsTkbGsszf8rA=s96-c',
};

const UserHomePage: NextPage = function () {
  const [message, setMessage] = useState('');

  return (
    <ServiceLayout title="user home">
      <Flex p={4} bgColor="white">
        <Avatar src={USER_INFO.photoURL ?? ''} size="lg" />
        <Flex direction="column" justify="center" ml={4}>
          <Text fontSize="md">{USER_INFO.displayName}</Text>
          <Text fontSize="sm">{USER_INFO.email}</Text>
        </Flex>
      </Flex>

      <Box mt={4} bgColor="white">
        <Flex p={2}>
          <Avatar src="https://bit.ly/broken-link" size="xs" />
          <Textarea
            bg="gray.100"
            border="none"
            placeholder="무엇이 궁금한가요?"
            resize="none"
            minH="unset"
            overflow="hidden"
            fontSize="xs"
            marginX={2}
            maxRows={7}
            as={ResizeTextArea}
            value={message}
            onChange={(e) => {
              const { value } = e.currentTarget;
              const lineCount = value.match(/[^\n]*\n[^\n]*/gi)?.length ?? 0;
              if (lineCount >= 7) {
                return;
              }

              setMessage(value);
            }}
          />

          <Button disabled={!message} bgColor="#ffb86c" color="white" colorScheme="yellow" size="sm">
            등록
          </Button>
        </Flex>
      </Box>
    </ServiceLayout>
  );
};

export default UserHomePage;
