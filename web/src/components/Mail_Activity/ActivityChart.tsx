import { Box } from "@chakra-ui/react";
import { withApollo } from "../../utils/withApollo";
import React, { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

type CardProps = {
  Delivered: number;
  Opened: number;
  Clicked: number;
  Bounces: number;
  SpamReports: number;
  ActiveCount: number;
  NonActiveCount: number;
};
const ActivityChart: React.FC<CardProps> = ({
  Delivered,
  Opened,
  Clicked,
  Bounces,
  SpamReports,
  ActiveCount,
  NonActiveCount,
}: CardProps) => {
  const chartData: any = [];
  chartData.push({ name: "Invitation Sent", count: ActiveCount });
  chartData.push({ name: "Invitation Accepted", count: NonActiveCount });
  chartData.push({ name: "Delivered", count: Delivered });
  chartData.push({ name: "Opened", count: Opened });
  chartData.push({ name: "Clicked", count: Clicked });
  chartData.push({ name: "Bounces", count: Bounces });
  chartData.push({ name: "Spam Reports", count: SpamReports });


  return (
    <>
      <Box mt={20}>
        <BarChart
          width={1100}
          height={400}
          data={chartData}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          {/* <CartesianGrid strokeDasharray="3 3" /> */}
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          {/* <Legend/> */}
          <Bar dataKey="count" fill="#8884d8" />
        </BarChart>
      </Box>
    </>
  );
};

export default withApollo({ ssr: false })(ActivityChart);
