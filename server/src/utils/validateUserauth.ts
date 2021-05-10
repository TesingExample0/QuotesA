import { UserAuthInput } from '../resolvers/UserAuthInput';

export const validateUserAuth = (options: UserAuthInput) => {
  if (!options.email.includes('@')) {
    return [
      {
        field: 'email',
        message: 'invalid email',
      },
    ];
  }

  if (options.password) {
    if (options.password.length <= 2) {
      return [
        {
          field: 'password',
          message: 'length must be greater than 2',
        },
      ];
    }

    if (options.confirm) {
      if (options.password !== options.confirm) {
        return [
          {
            field: 'password',
            message: 'confirm password does not match. please try again',
          },
        ];
      }
    }
  }

  return null;
};
