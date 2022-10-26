import { Flex } from '@chakra-ui/react';
import Head from 'next/head';
import React from 'react';
import GNB, { GNB_HEIGHT } from './GNB';

interface Props {
  title: string;
}

const ServiceLayout: React.FC<Props> = function ({ title = 'blah x2', children }) {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <GNB />
      <Flex direction="column" h="100vh" pt={GNB_HEIGHT} bgColor="gray.50">
        {children}
      </Flex>
    </>
  );
};

export default ServiceLayout;
