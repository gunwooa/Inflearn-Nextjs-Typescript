import { Avatar, Box, Flex, Text } from '@chakra-ui/react';
import React from 'react';
import { ANONYMOUS_IMAGE_URL } from '@/pages/[screenName]';

const MessageItem = function () {
  return (
    <Box borderRadius="md" width="full" bg="white" boxShadow="md">
      <Box>
        <Flex p="2" alignItems="center">
          <Avatar size="sm" src={ANONYMOUS_IMAGE_URL} />
          <Text fontSize="xx-small" ml="2">
            anonymous
          </Text>
          <Text whiteSpace="pre-line" fontSize="xx-small" color="gray.500" ml="2">
            1일
          </Text>
        </Flex>
      </Box>
      <Box p="2">
        <Box borderRadius="md" borderWidth="1px" p="2">
          <Text whiteSpace="pre-line" fontSize="sm">
            123
          </Text>
        </Box>
      </Box>
    </Box>
  );
};

export default MessageItem;
