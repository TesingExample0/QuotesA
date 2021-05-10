import React from 'react';
import { useField } from 'formik';
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Switch,
} from '@chakra-ui/react';

type SwitchFieldProps = {
  label: string;
  name: string;
  defaultIsChecked: boolean;
};

export const SwitchField: React.FC<SwitchFieldProps> = ({
  label,
  ...props
}) => {
  const [field, { error }] = useField(props);

  return (
    <FormControl isInvalid={!!error} display='flex' alignItems='center'>
      <FormLabel htmlFor={field.name}>{label}</FormLabel>
      <Switch id={field.name} {...field} {...props} />
      {error ? <FormErrorMessage>{error}</FormErrorMessage> : null}
    </FormControl>
  );
};
