import { useMailActivityQuery, useAllsubsQuery } from "../../generated/graphql";
import { withApollo } from "../../utils/withApollo";
import { useIsAuth } from "../../utils/useIsAuth";
import React, { useState, useEffect } from "react";
import ActivityCard from "./ActivityCard";
import ActivityChart from "./ActivityChart";

const EMailActivity = () => {
  useIsAuth();
  const [Delivered, setDelivered] = useState(0);
  const [Opened, setOpened] = useState(0);
  const [Clicked, setClicked] = useState(0);
  const [Bounces, setBounces] = useState(0);
  const [SpamReports, setSpamReports] = useState(0);
  useIsAuth();
  const { data, error, loading, fetchMore, variables } = useMailActivityQuery();

  const subsCount = useAllsubsQuery();

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
      const mailActivity: any = data!.mailActivity.mailActivity;
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
            ActiveCount={subsCount.data?.Allsubs!.ActiveCount}
            NonActiveCount={subsCount.data?.Allsubs!.NonActiveCount}
          />

          <ActivityChart
            Delivered={Delivered}
            Opened={Opened}
            Clicked={Clicked}
            Bounces={Bounces}
            SpamReports={SpamReports}
            ActiveCount={subsCount.data?.Allsubs!.ActiveCount}
            NonActiveCount={subsCount.data?.Allsubs!.NonActiveCount}
          />
        </>
      )}
    </>
  );
};

export default withApollo({ ssr: false })(EMailActivity);
