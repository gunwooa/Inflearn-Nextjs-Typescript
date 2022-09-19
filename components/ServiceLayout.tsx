import { Flex } from '@chakra-ui/react';
import Head from 'next/head';
import React from 'react';
import GNB from './GNB';

interface Props {
  title: string;
}

const ServiceLayout: React.FC<Props> = function ({ title = 'blah x2', children }) {
  return (
    <Flex direction="column" h="100vh">
      <Head>
        <title>{title}</title>
      </Head>
      <GNB />
      {children}
    </Flex>
  );
};

export default ServiceLayout;
