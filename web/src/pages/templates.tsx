import { Layout } from '../components/Layout';
import Templates from '../components/Template';
import { useIsAuth } from '../utils/useIsAuth';
import { withApollo } from '../utils/withApollo';

const TemplatesPage = () => {
  useIsAuth();
  return (
    <Layout>
      <Templates />
    </Layout>
  );
};

export default withApollo({ ssr: false })(TemplatesPage);
