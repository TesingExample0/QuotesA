import React from "react";
import { Layout } from "../components/Layout";
import { useIsAuth } from "../utils/useIsAuth";

import { withApollo } from "../utils/withApollo";
import ActivityMessages from "../components/Messages";
const Messages = () => {
  useIsAuth();
  return (
    <Layout>
      <ActivityMessages />
    </Layout>
  );
};

export default withApollo({ ssr: false })(Messages);
