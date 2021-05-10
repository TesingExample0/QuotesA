import React from "react";
import { withApollo } from "../utils/withApollo";
import SendQAtocontact from "../components/sendQAtocontacts";
const sendQA = () => {
  return (
      <SendQAtocontact/>
  );
};

export default withApollo({ ssr: false })(sendQA);
