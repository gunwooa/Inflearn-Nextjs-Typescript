import { Flex } from '@chakra-ui/react';
import Head from 'next/head';
import React from 'react';
import GNB, { GNB_HEIGHT } from './GNB';

interface Props {
  title: string;
}

const LAYOUT_MAX_WIDTH = 500;

const ServiceLayout: React.FC<Props> = function ({ title = 'blah x2', children }) {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <GNB />
      <Flex justify="center" bgColor="gray.100">
        <Flex direction="column" h="100vh" w={`${LAYOUT_MAX_WIDTH}px`} pt={GNB_HEIGHT}>
          {children}
        </Flex>
      </Flex>
    </>
  );
};

export default ServiceLayout;
