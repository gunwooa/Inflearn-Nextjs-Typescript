import { Avatar, Box, Button, Divider, Flex, Text, Textarea } from '@chakra-ui/react';
import React from 'react';
import ResizeTextArea from 'react-textarea-autosize';
import { ANONYMOUS_IMAGE_URL } from '@/pages/[screenName]';
import { InMessage } from '@/models/types';
import { convertDateToString } from '@/utils';

interface Props {
  uid: string;
  displayName: string;
  photoURL: string;
  isOwner: boolean;
  item: InMessage;
}

const MessageItem = function ({ uid, displayName, photoURL, isOwner, item }: Props) {
  const haveReply = !!item.reply;

  return (
    <Box borderRadius="md" width="full" bg="white" boxShadow="md">
      <Box>
        <Flex p="2" alignItems="center">
          <Avatar size="sm" src={item.author ? item.author.photoURL ?? ANONYMOUS_IMAGE_URL : ANONYMOUS_IMAGE_URL} />
          <Text fontSize="xx-small" ml="2">
            {item.author ? item.author.displayName : 'anonymous'}
          </Text>
          <Text whiteSpace="pre-line" fontSize="xx-small" color="gray.500" ml="2">
            {convertDateToString(item.createAt)}
          </Text>
        </Flex>
      </Box>
      <Box p="2">
        <Box borderRadius="md" borderWidth="1px" p="2">
          <Text whiteSpace="pre-line" fontSize="sm">
            {item.message}
          </Text>
        </Box>
      </Box>
      {haveReply && (
        <Box pt="2">
          <Divider />
          <Box display="flex" m="2">
            <Box pt="2">
              <Avatar size="sm" mr="2" src={photoURL} />
            </Box>
            <Box borderRadius="md" p="2" width="full" bg="gray.100">
              <Flex alignItems="center">
                <Text fontSize="xs">{displayName}</Text>
                <Text whiteSpace="pre-line" ml="2" fontSize="xs" color="gray">
                  {convertDateToString(item.replayAt!)}
                </Text>
              </Flex>
              <Text whiteSpace="pre-line" fontSize="xs">
                {item.reply}
              </Text>
            </Box>
          </Box>
        </Box>
      )}
      {!haveReply && isOwner && (
        <Box p="2">
          <Divider />
          <Box display="flex" mt="2">
            <Box pt="1">
              <Avatar size="sm" mr="2" src={photoURL} />
            </Box>
            <Box borderRadius="md" width="full" bg="gray.100" mr="2">
              <Textarea
                border="none"
                boxShadow="none !important"
                resize="none"
                minH="unset"
                overflow="hidden"
                fontSize="xs"
                placeholder="댓글을 입력하세요..."
                as={ResizeTextArea}
              />
            </Box>
            <Button colorScheme="pink" bgColor="#ff75b5" variant="solid" size="sm">
              등록
            </Button>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default MessageItem;
