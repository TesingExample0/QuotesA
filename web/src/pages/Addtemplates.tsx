import { Layout } from "../components/Layout";
import AddTemplates from "../components/Template/Addtemplate";
import { useIsAuth } from "../utils/useIsAuth";
import { withApollo } from "../utils/withApollo";

const addTemplatesPage = () => {
  useIsAuth();
  return (
    <Layout>
      <AddTemplates />
    </Layout>
  );
};

export default withApollo({ ssr: false })(addTemplatesPage);
