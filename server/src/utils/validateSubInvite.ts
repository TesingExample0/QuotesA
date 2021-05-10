import { SubInviteInput } from "../resolvers/SubInviteInput";

export const validateInviteSub = (input: SubInviteInput) => {
  if (!input.email.includes("@")) {
    return [
      {
        field: "email",
        message: "invalid email",
      },
    ];
  }

  if (input.name.length <= 2) {
    return [
      {
        field: "name",
        message: "length must be greater than 2",
      },
    ];
  }

  return null;
};
