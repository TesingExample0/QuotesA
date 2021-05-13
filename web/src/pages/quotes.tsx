import React from 'react';
import { Layout } from '../components/Layout';
import Quotes from '../components/Quote';
import { useIsAuth } from '../utils/useIsAuth';
import { withApollo } from '../utils/withApollo';

const QuotesPage = () => {
  useIsAuth();
  return (
    <Layout>
      <Quotes />
    </Layout>
  );
};

export default withApollo({ ssr: false })(QuotesPage);
