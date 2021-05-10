import React, { useState } from "react";
import { useDisclosure, Checkbox, Box } from "@chakra-ui/react";
import { withApollo } from "../../utils/withApollo";
import { useUpdateUserMutation } from "../../generated/graphql";
import { useProfileQuery } from "../../generated/graphql";

const Check = () => {
  const [updateUser] = useUpdateUserMutation();
  const { data, loading } = useProfileQuery();

  if (loading) {
  } else {
    let userInfo = data!.me;
    var {
      name,
      address,
      city,
      state,
      zip,
      title,
      catagory,
      company,
      twitter,
      facebook,
      website,
      linkedIn,
      DefaultTemplates,
    } = userInfo!;
  }

  const handlechange = async (e: any) => {
    console.log(e.target.checked);
    const response = await updateUser({
      variables: {
        input: {
          name,
          address,
          city,
          state,
          zip,
          title,
          catagory,
          company,
          twitter,
          facebook,
          website,
          linkedIn,
          DefaultTemplates: e.target.checked,
        },
      },
    });
  };
  return (
    <>
      <Box>
        <Checkbox
          colorScheme="green"
          name="DefaultTemplates"
          isChecked={DefaultTemplates}
          onChange={handlechange}
          mt={2}
          ml={4}
        >
          Use Default Template
        </Checkbox>
      </Box>
    </>
  );
};

export default withApollo({ ssr: false })(Check);
