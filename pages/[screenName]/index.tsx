/* eslint-disable no-alert */
import { GetServerSideProps, NextPage } from 'next';
import React, { ChangeEvent, useCallback, useState } from 'react';
import { Avatar, Box, Button, Flex, FormControl, FormLabel, Switch, Text, Textarea } from '@chakra-ui/react';
import ResizeTextArea from 'react-textarea-autosize';
import axios, { AxiosResponse } from 'axios';
import ServiceLayout from '@/components/ServiceLayout';
import { InAuthUser } from '@/models/in_auth_user';
import { useAuth } from '@/contexts/AuthUser.context';
import { tMessageModel } from '@/models/message/message.model';

interface Props {
  userInfo: InAuthUser | null;
}

const ANONYMOUS_IMAGE_URL = '/anonymous.png';
const ANONYMOUS_SWITCH_ID = 'anonymous';

const postMessage = async ({ uid, message, author }: tMessageModel) => {
  if (message.length <= 0) {
    return {
      result: false,
      message: '메시지를 입력해주세요.',
    };
  }

  try {
    await fetch('/api/messages.add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        uid,
        message,
        author,
      }),
    });
    return {
      result: true,
    };
  } catch (e) {
    console.error(e);
    return {
      result: false,
      message: '메시지 등록 실패',
    };
  }
};

const UserHomePage: NextPage<Props> = function ({ userInfo }) {
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

  const handlePostMessage = useCallback(async () => {
    const params = {
      uid: authUser?.uid ?? '',
      message,
      author: isAnonymous
        ? undefined
        : {
            displayName: authUser?.displayName ?? ANONYMOUS_SWITCH_ID,
            photoURL: authUser?.photoURL ?? ANONYMOUS_IMAGE_URL,
          },
    };

    const messageResp = await postMessage(params);
    if (!messageResp.result) {
      alert('메시지 등록 실패');
      return;
    }

    setMessage('');
  }, [authUser, isAnonymous, message]);

  if (userInfo === null) {
    return <p>사용자가 존재하지 않습니다.</p>;
  }

  return (
    <ServiceLayout title={`${userInfo.displayName}의 홈`}>
      <Flex p={4} bgColor="white">
        <Avatar src={userInfo.photoURL ?? ''} size="lg" />
        <Flex direction="column" justify="center" ml={4}>
          <Text fontSize="md">{userInfo.displayName}</Text>
          <Text fontSize="sm">{userInfo.email}</Text>
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

          <Button
            onClick={handlePostMessage}
            disabled={!message}
            bgColor="#ffb86c"
            color="white"
            colorScheme="yellow"
            size="sm"
          >
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

export const getServerSideProps: GetServerSideProps<Props> = async ({ query }) => {
  const { screenName } = query;
  const defaultProps = {
    props: {
      userInfo: null,
    },
  };

  if (screenName === undefined) {
    return defaultProps;
  }

  try {
    const protocol = process.env.PROTOCOL ?? 'http';
    const host = process.env.HOST ?? 'localhost';
    const port = process.env.PORT ?? '3000';
    const baseUrl = `${protocol}://${host}:${port}`;

    const userInfoRes: AxiosResponse<InAuthUser> = await axios(`${baseUrl}/api/user.info/${screenName}`);
    return {
      props: {
        userInfo: userInfoRes.data ?? defaultProps.props.userInfo,
      },
    };
  } catch (e) {
    console.error(e);
    return defaultProps;
  }
};
