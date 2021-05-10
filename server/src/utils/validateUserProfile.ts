import { UserInput } from '../resolvers/UserInput';

export const validateUserProfile = (input: UserInput) => {
  if (input.name.length <= 2) {
    return [
      {
        field: 'name',
        message: 'length must be greater than 2',
      },
    ];
  }

  if (input.address.length <= 2) {
    return [
      {
        field: 'address',
        message: 'length must be greater than 2',
      },
    ];
  }
  if (input.city.length <= 2) {
    return [
      {
        field: 'city',
        message: 'length must be greater than 2',
      },
    ];
  }
  if (input.zip.length <= 2) {
    return [
      {
        field: 'zip',
        message: 'length must be greater than 2',
      },
    ];
  }

  return null;
};
