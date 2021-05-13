import { Layout } from "../components/Layout";
import { withApollo } from "../utils/withApollo";
import { useProfileQuery } from "../generated/graphql";
import { useIsAuth } from "../utils/useIsAuth";
import UserProfile from "../components/Profile/UserProfile";
import React from "react";
import { Tabs, TabList, Tab, TabPanels, TabPanel } from "@chakra-ui/react";
import UserAuth from "../components/Profile/UserAuth";
import UserSubscription from "../components/Profile/UserSubscription";
import Memebership from "../components/Membership";
import { useRouter } from "next/router";

const Profile = () => {
  useIsAuth();
  const { data, loading } = useProfileQuery();
  const userData = data?.me ? data?.me : null;
  const subChecker = userData?.customerType !== "free-trial";
  const router = useRouter();

  let profile = null;
  let auth = null;
  let payment = null;
  let subscription = null;
  
  if (loading) {
  } else {
    if (!data) {
      router.replace("/finish");
    } else {
      profile = <UserProfile data={userData} />;
      auth = <UserAuth data={userData} />;
      payment = <UserSubscription data={userData} />;
      subscription = <Memebership />;
    }
  }

  return (
    <Layout>
      <Tabs variant="soft-rounded" colorScheme="gray">
        <TabList>
          <Tab>User Profile</Tab>
          <Tab>Security</Tab>
          <Tab>Payment</Tab>
          {subChecker && <Tab>Subscription</Tab>}
        </TabList>
        <TabPanels>
          <TabPanel>{profile}</TabPanel>
          <TabPanel>{auth}</TabPanel>
          <TabPanel>{payment}</TabPanel>
          {subChecker && <TabPanel>{subscription}</TabPanel>}
        </TabPanels>
      </Tabs>
    </Layout>
  );
};

export default withApollo({ ssr: false })(Profile);
