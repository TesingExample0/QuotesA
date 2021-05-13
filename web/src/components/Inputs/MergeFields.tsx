import React from "react";
import { FormControl, FormLabel, Select } from "@chakra-ui/react";

type MergeFieldsProps = {
  label: string;
  name: string;
};

const dropDown = [
  { name: "SubscriberName", value: "#SubscriberName" },
  { name: "Quotes", value: "#Quotes" },
  { name: "UserName", value: "#UserName" },
  { name: "UsersEmail", value: "#UsersEmail" },
  { name: "UnsubscriberLink", value: "#UnsubscriberLink" },
];

export const MergeFields: React.FC<MergeFieldsProps> = ({
  label,
  ...props
}) => {
  console.log(label, props);
  return (
    <FormControl>
      <FormLabel>{label}</FormLabel>
      <Select>
        {dropDown.map((d, index) => (
          <option key={index} value={d.value}>
            {d.name}
          </option>
        ))}
      </Select>
    </FormControl>
  );
};
