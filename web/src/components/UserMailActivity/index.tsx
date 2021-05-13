import {
  useMailActivityByIdQuery,
  useAllsubsIdQuery,
} from "../../generated/graphql";
import { withApollo } from "../../utils/withApollo";
import { useIsAuth } from "../../utils/useIsAuth";
import React, { useState, useEffect } from "react";
import ActivityCard from "../Mail_Activity/ActivityCard";
import ActivityChart from "../Mail_Activity/ActivityChart";

interface UserActivityProps {
  id: number;
}

const UsersMailsActivities: React.FC<UserActivityProps> = ({ id }) => {
  useIsAuth();
  const [Delivered, setDelivered] = useState(0);
  const [Opened, setOpened] = useState(0);
  const [Clicked, setClicked] = useState(0);
  const [Bounces, setBounces] = useState(0);
  const [SpamReports, setSpamReports] = useState(0);
  useIsAuth();
  const {
    data,
    error,
    loading,
    fetchMore,
    variables,
  } = useMailActivityByIdQuery({
    variables: {
      id: id,
    },
    notifyOnNetworkStatusChange: true,
  });

  const subsCount = useAllsubsIdQuery({
    variables: {
      Id: id,
    },
    notifyOnNetworkStatusChange: true,
  });

  if (!loading && !data) {
    return (
      <div>
        <div>you got query failed for some reason</div>
        <div>{error?.message}</div>
      </div>
    );
  }

  useEffect(() => {
    if (data) {
      const mailActivity: any = data!.mailActivityById.mailActivity;
      let Delivered: any = [];
      let Opened: any = [];
      let Clicked: any = [];
      let Bounces: any = [];
      let SpamReports: any = [];

      mailActivity.map((mail: any) => {
        Opened.push(mail.open_count);
        Clicked.push(mail.clicks_count);

        if (mail.Status === "delivered") {
          Delivered.push(mail);
        }
        if (mail.Status === "bounce") {
          Bounces.push(mail);
        }
        if (mail.Status === "spamreport") {
          SpamReports.push(mail);
        }
      });
      setDelivered(Delivered.length);
      setOpened(Opened.reduce((a: any, b: any) => a + b, 0));
      setClicked(Clicked.reduce((a: any, b: any) => a + b, 0));
      setBounces(Bounces.length);
      setSpamReports(SpamReports.length);
    }
  });
  if (data) {
    console.log(Delivered, Opened, Clicked, Bounces, SpamReports);
  }
  return (
    <>
      {!data ? (
        <div>loading...</div>
      ) : (
        <>
          <ActivityCard
            Delivered={Delivered}
            Opened={Opened}
            Clicked={Clicked}
            Bounces={Bounces}
            SpamReports={SpamReports}
            ActiveCount={subsCount.data?.AllsubsId.ActiveCount}
            NonActiveCount={subsCount.data?.AllsubsId.NonActiveCount}
          />

          <ActivityChart
            Delivered={Delivered}
            Opened={Opened}
            Clicked={Clicked}
            Bounces={Bounces}
            SpamReports={SpamReports}
            ActiveCount={subsCount.data?.AllsubsId.ActiveCount}
            NonActiveCount={subsCount.data?.AllsubsId.NonActiveCount}
          />
        </>
      )}
    </>
  );
};

export default withApollo({ ssr: false })(UsersMailsActivities);
