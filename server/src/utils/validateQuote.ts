import { QuoteInput } from 'src/resolvers/quote';

export const validateQuote = (input: QuoteInput) => {
  if (input.name.length <= 2) {
    return [
      {
        field: 'name',
        message: 'length must be greater than 2',
      },
    ];
  }

  if (input.catagory.length <= 2) {
    return [
      {
        field: 'catagory',
        message: 'Please select a catagory',
      },
    ];
  }

  return null;
};
