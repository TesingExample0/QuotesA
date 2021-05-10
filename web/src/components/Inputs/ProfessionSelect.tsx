import React from "react";
import { useField } from "formik";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Select,
} from "@chakra-ui/react";

type ProfessionSelectFieldProps = {
  label: string;
  name: string;
};

const dropDown = [
  { name: "Select catagory", value: "" },
  { name: "Accounting", value: "ACCOUNTING" },
  { name: "Coaching", value: "COACHING" },
  { name: "Consultant", value: "CONSULTANT" },
  { name: "Construction", value: "CONSTRUCTION" },
  { name: "Education", value: "EDUCATION" },
  { name: "Engineering", value: "ENGINEERING" },
  { name: "Financial", value: "FINANCIAL" },
  { name: "Health Care", value: "HEALTHCARE" },
  { name: "Home Services", value: "HOMESERVICES" },
  { name: "Hospitality", value: "HOSPITALITY" },
  { name: "Legal", value: "LEGAL" },
  { name: "Manufacturing", value: "MANUFACTURING" },
  { name: "Marketing", value: "MARKETING" },
  { name: "Realstate", value: "REALSTATE" },
  { name: "Restaurant", value: "RESTAURANT" },
  { name: "Retail", value: "RETAIL" },
  { name: "Technology", value: "TECHNOLOGY" },
];

export const ProfessionSelectField: React.FC<ProfessionSelectFieldProps> = ({
  label,
  ...props
}) => {
  const [field, { error }] = useField(props);
  return (
    <FormControl isInvalid={!!error}>
      <FormLabel htmlFor={field.name}>{label}</FormLabel>
      <Select id={field.name} {...field} {...props}>
        {dropDown.map((d, index) => (
          <option key={index} value={d.value}>
            {d.name}
          </option>
        ))}
      </Select>
      {error ? <FormErrorMessage>{error}</FormErrorMessage> : null}
    </FormControl>
  );
};
