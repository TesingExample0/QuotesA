import React from "react";
import { Layout } from "../components/Layout";
import EMailActivity from "../components/Mail_Activity";
import { useIsAuth } from "../utils/useIsAuth";
import { withApollo } from "../utils/withApollo";

const MailActivity = () => {
  useIsAuth();
  return (
    <Layout>
      <EMailActivity />
    </Layout>
  );
};

export default withApollo({ ssr: false })(MailActivity);
