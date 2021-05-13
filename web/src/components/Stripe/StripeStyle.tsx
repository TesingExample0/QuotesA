import React, { useMemo } from 'react';

export const useOptions = () => {
  const options = useMemo(
    () => ({
      style: {
        base: {
          fontSize: '16px',
          color: '#424770',
          '::placeholder': {
            color: '#aab7c4',
          },
        },
        invalid: {
          color: '#9e2146',
        },
      },
    }),
    [],
  );

  return options;
};
