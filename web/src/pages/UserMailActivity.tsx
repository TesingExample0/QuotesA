import React, { useState, useEffect } from "react";
import { Layout } from "../components/Layout";
import UsersMailsActivities from "../components/UserMailActivity";
import { useIsAuth } from "../utils/useIsAuth";
import { withApollo } from "../utils/withApollo";
import { useMeQuery } from "../generated/graphql";
import { isServer } from "../utils/isServer";

const UsersMailActivity = () => {
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
      <UsersMailsActivities id={userId} />
    </Layout>
  );
};

export default withApollo({ ssr: false })(UsersMailActivity);
