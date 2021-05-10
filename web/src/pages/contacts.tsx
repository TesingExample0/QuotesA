import { Layout } from '../components/Layout';
import Subscribers from '../components/Subscriber';
import { useIsAuth } from '../utils/useIsAuth';
import { withApollo } from '../utils/withApollo';

const SubscribersPage = () => {
  useIsAuth();
  return (
    <Layout>
      <Subscribers />
    </Layout>
  );
};

export default withApollo({ ssr: false })(SubscribersPage);
