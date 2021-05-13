import React, { useState, useEffect } from "react";
import { NextPage } from "next";
import { Wrapper } from "../../components/Wrapper";
import { toErrorMap } from "../../utils/toErrorMap";
import {
  Box,
  Button,
  Flex,
  Heading,
  Text,
  Img,
  Select,
  Input,
  SimpleGrid,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { withApollo } from "../../utils/withApollo";
import {
  useUnsubscribeSubMutation,
  useSubbytokenQuery,
  useUpdateMailandFrequencyMutation
} from "../../generated/graphql";

const SubUnSubscriber: NextPage = () => {
  const router = useRouter();
  const { data } = useSubbytokenQuery({
    variables: {
      token: typeof router.query.token === "string" ? router.query.token : "",
    },
    notifyOnNetworkStatusChange: true,
  });
  const [unsubscribeSub, { loading }] = useUnsubscribeSubMutation();
  const [updateMailandFrequency] = useUpdateMailandFrequencyMutation();
  const [tokenError, setTokenError] = useState("");
  const [frequency, setfrequency] = useState("");
  const [mail, setmail] = useState("");

  useEffect(() => {
    if (data?.subbytoken) {
      console.log(data?.subbytoken);
      setfrequency(data!.subbytoken!.frequency.toString());
      setmail(data!.subbytoken!.email);
    }
  }, [data]);
  //Show a congrats page instead of home page
  const updatefrequency = () => {
    updateMailandFrequency({
      variables: {
        token: typeof router.query.token === "string" ? router.query.token : "",
        frequency: parseFloat(frequency),
        email: mail,
      },
    });
  };
  return (
    <Wrapper variant="regular">
      <Img
        boxSize="75px"
        objectFit="cover"
        src="/static/logo.png"
        alt="Logo"
        mx="auto"
      />
      <Heading>Welcome to Quote Actions</Heading>
      <Text>Please confirm your subscription preference below:</Text>
      {tokenError ? (
        <Flex>
          <Box mr={2} style={{ color: "red" }}>
            {tokenError}
          </Box>
        </Flex>
      ) : null}
      <SimpleGrid minChildWidth="260px">
        <Box mt={4}>
          <Select
            // ml={5}
            w="60%"
            value={frequency}
            onChange={(e) => {
              setfrequency(e.target.value);
            }}
          >
            <option value={1}>Once per week</option>
            <option value={3}>Three per week</option>
            <option value={5}>Every Weekday</option>
          </Select>
        </Box>
        <Box>
          <Input
            placeholder="Email address"
            mt='2'
            w="60%"
            value={mail}
            onChange={(e) => {
              setmail(e.target.value);
            }}
          />
        </Box>
      </SimpleGrid>
      <Button
        mt={4}
        type="submit"
        background="blue"
        color="white"
        onClick={() => {
          // async () => {
          updatefrequency();
          // };
        }}
      >
        Update
      </Button>
      <Button
        mt={4}
        ml={9}
        type="submit"
        isLoading={loading}
        background="blue"
        color="white"
        onClick={async () => {
          const response = await unsubscribeSub({
            variables: {
              token:
                typeof router.query.token === "string"
                  ? router.query.token
                  : "",
            },
          });
          console.log(response.data);

          if (response.data?.unsubscribeSub.errors) {
            const errorMap = toErrorMap(response.data.unsubscribeSub.errors);
            if ("token" in errorMap) {
              setTokenError(errorMap.token);
            }
          } else if (response.data?.unsubscribeSub.sub) {
            // worked
            router.push("/");
          }
        }}
      >
        Unsubsribe
      </Button>
    </Wrapper>
  );
};

export default withApollo({ ssr: false })(SubUnSubscriber);
