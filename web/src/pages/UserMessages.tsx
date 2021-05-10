import React, { useState, useEffect } from "react";
import { Layout } from "../components/Layout";
import { useIsAuth } from "../utils/useIsAuth";

import { withApollo } from "../utils/withApollo";
import ActivityUserMessages from "../components/UserMessages";
import { useMeQuery } from "../generated/graphql";
import { isServer } from "../utils/isServer";

const UserMessages = () => {
  useIsAuth();
  const [userId, setUserId] = useState(0);
  const { data, loading } = useMeQuery({
    skip: isServer(),
  });
  useEffect(() => {
    if (data) {
      setUserId(data.me!.id);
    }
  });
  return (
    <Layout>
      <ActivityUserMessages id={userId} />
    </Layout>
  );
};

export default withApollo({ ssr: false })(UserMessages);
