import React from 'react';
import { useField } from 'formik';
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Select,
} from '@chakra-ui/react';

type SelectFieldProps = {
  label: string;
  name: string;
};

export const SelectField: React.FC<SelectFieldProps> = ({
  label,
  ...props
}) => {
  const [field, { error }] = useField(props);

  return (
    <FormControl isInvalid={!!error} alignItems='center'>
      <FormLabel htmlFor={field.name}>{label}</FormLabel>
      <Select id={field.name} {...field} {...props}>
        <option value={1}>Once per week</option>
        <option value={3}>Three per week</option>
        <option value={5}>Every Weekday</option>
      </Select>
      {error ? <FormErrorMessage>{error}</FormErrorMessage> : null}
    </FormControl>
  );
};
