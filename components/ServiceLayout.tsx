import Head from 'next/head';
import React from 'react';

interface Props {
  title: string;
}

const ServiceLayout: React.FC<Props> = function ({ title = 'blah x2', children }) {
  return (
    <div>
      <Head>
        <title>{title}</title>
      </Head>
      {children}
    </div>
  );
};

export default ServiceLayout;
