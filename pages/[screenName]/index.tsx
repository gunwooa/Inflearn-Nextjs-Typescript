/* eslint-disable no-alert */
import { NextPage } from 'next';
import React, { ChangeEvent, EventHandler, useCallback, useState } from 'react';
import { Avatar, Box, Button, Flex, FormControl, FormLabel, Switch, Text, Textarea } from '@chakra-ui/react';
import ResizeTextArea from 'react-textarea-autosize';
import ServiceLayout from '@/components/ServiceLayout';
import { InAuthUser } from '@/models/in_auth_user';
import { useAuth } from '@/contexts/AuthUser.context';

const USER_INFO: InAuthUser = {
  uid: 'test',
  email: 'gunwooooa@gmail.com',
  displayName: 'GW D',
  photoURL: 'https://lh3.googleusercontent.com/a/ALm5wu1s26VqzFeHv0hdABFJmyqqjA5PBTsTkbGsszf8rA=s96-c',
};

const ANONYMOUS_IMAGE_URL = '/anonymous.png';
const ANONYMOUS_SWITCH_ID = 'anonymous';

const UserHomePage: NextPage = function () {
  const { authUser } = useAuth();
  const [message, setMessage] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(true);

  const handleChangeTextarea = useCallback((e: ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.currentTarget;
    const lineCount = value.match(/[^\n]*\n[^\n]*/gi)?.length ?? 0;
    if (lineCount >= 7) {
      return;
    }
    setMessage(value);
  }, []);

  const handleChangeSwitch = useCallback(() => {
    if (authUser === null) {
      alert('로그인이 필요합니다');
      return;
    }
    setIsAnonymous((prev) => !prev);
  }, [authUser]);

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
          <Avatar
            src={isAnonymous ? ANONYMOUS_IMAGE_URL : authUser?.photoURL ?? ANONYMOUS_IMAGE_URL}
            size="sm"
            padding={1}
          />
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
            onChange={handleChangeTextarea}
          />

          <Button disabled={!message} bgColor="#ffb86c" color="white" colorScheme="yellow" size="sm">
            등록
          </Button>
        </Flex>
        <FormControl display="flex" alignItems="center" m={2}>
          <Switch
            size="sm"
            colorScheme="orange"
            id={ANONYMOUS_SWITCH_ID}
            mr="1"
            isChecked={isAnonymous}
            onChange={handleChangeSwitch}
          />
          <FormLabel htmlFor={ANONYMOUS_SWITCH_ID} mb="0" fontSize="xx-small">
            Anonymous
          </FormLabel>
        </FormControl>
      </Box>
    </ServiceLayout>
  );
};

export default UserHomePage;
