import React, { useState, useEffect } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  Flex,
  Box,
  Select,
  Tooltip,
} from "@chakra-ui/react";
import { usePaginatedActivityQuery } from "../../generated/graphql";
import { withApollo } from "../../utils/withApollo";
import { useIsAuth } from "../../utils/useIsAuth";
import ActivityModal from "./AvtivityModal";
import { useAlluserQuery } from "../../generated/graphql";

const ActivityMessages = () => {
  useIsAuth();
  const [Activity, setActivity] = useState([] as any);
  const [username, setusername] = useState([] as any);
  const name = useAlluserQuery();
  const {
    data,
    error,
    loading,
    fetchMore,
    variables,
  } = usePaginatedActivityQuery({
    variables: {
      limit: 15,
      cursor: null,
    },
    notifyOnNetworkStatusChange: true,
  });

  const dat = usePaginatedActivityQuery({
    variables: {
      limit: 15,
      cursor: null,
    },
    notifyOnNetworkStatusChange: true,
  });

  const changedvalue = (e: any) => {
    const Msg = [] as any;
    if (e.target.value === "All") {
      setActivity(data!.PaginatedmailActivity.PaginatedmailActivity);
    } else {
      data!.PaginatedmailActivity.PaginatedmailActivity.map((q: any) => {
        if (q.user.id === parseInt(e.target.value)) {
          Msg.push(q);
        }
      });
      setActivity(Msg);
    }
  };
  // && q.type === "Subscriber Invite"
  const maildata: any = [];
  useEffect(() => {
    if (data) {
      data!.PaginatedmailActivity.PaginatedmailActivity.map((item) => {
        if (item.type === "Quote") {
          maildata.push(item);
        }
      });
      setActivity(maildata);
      setusername(name!.data!.alluser!.user);
    }
  }, [data]);

  if (!loading && !data) {
    return (
      <div>
        <div>you got query failed for some reason</div>
        <div>{error?.message}</div>
      </div>
    );
  }
  const fetchMoreData = () => {
    fetchMore({
      variables: {
        limit: variables?.limit,
        cursor:
          data?.PaginatedmailActivity.PaginatedmailActivity[
            data?.PaginatedmailActivity.PaginatedmailActivity.length - 1
          ].createdAt,
      },
      updateQuery: (previousResult: any, fetchMoreResult: any) => {
        console.log(previousResult, fetchMoreResult);
        const newActivity =
          fetchMoreResult.fetchMoreResult.PaginatedmailActivity
            .PaginatedmailActivity;
        const newActivityHasmore =
          fetchMoreResult.fetchMoreResult.PaginatedmailActivity.hasMore;
        return newActivity.length
          ? {
              PaginatedmailActivity: {
                __typename: previousResult.PaginatedmailActivity.__typename,
                PaginatedmailActivity: [
                  ...previousResult.PaginatedmailActivity.PaginatedmailActivity,
                  ...newActivity,
                ],
                hasMore: newActivityHasmore,
              },
            }
          : previousResult;
      },
      // },
    });
  };
  return (
    <>
      {!data && loading ? (
        <div>loading...</div>
      ) : (
        <>
          <Flex mb={2} align="center">
            <Select ml={5} w="40%" onChange={(e) => changedvalue(e)}>
              <option value={"All"}>{"All"}</option>
              {username.map((d: any, index: number) => (
                <option key={index} value={d.id}>
                  {d.name}
                </option>
              ))}
            </Select>
          </Flex>
          <Box borderWidth="1px" borderRadius="lg" mt={5}>
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>Quote</Th>
                  <Th>Author</Th>
                  <Th>Message</Th>
                  <Th>Send Date</Th>
                  <Th>Opens</Th>
                </Tr>
              </Thead>
              <Tbody>
                {Activity.map((q: any) =>
                  !q.From_Email ? null : (
                    <>
                      <Tooltip
                        hasArrow
                        label={q.body}
                        bg="gray.300"
                        color="black"
                        placement="bottom-start"

                      >
                        <Tr key={q.id}>
                          <Td>
                            <Box
                              w="130px"
                              h="20px"
                              overflow="hidden"
                              textOverflow="ellipsis"
                            >
                              {q.body}
                            </Box>
                          </Td>
                          <Td textTransform="capitalize">{q.Author}</Td>
                          <Td textTransform="capitalize">{q.Status}</Td>
                          <Td>
                            {new Date(Number(q.createdAt)).toLocaleDateString()}
                          </Td>
                          <Td>{q.open_count}</Td>
                          <Td>
                            <ActivityModal
                              id={q.id}
                              subject={q.subject}
                              openCount={q.open_count}
                              clickCount={q.clicks_count}
                              sendDate={new Date(
                                Number(q.createdAt)
                              ).toLocaleDateString()}
                              senderMail={q.From_Email}
                              reciverMail={q.To_Email}
                              senderName={q.user.name}
                              reciverName={q.subs.name}
                              Status={q.Status}
                              body={q.body}
                            />
                          </Td>
                        </Tr>
                      </Tooltip>
                    </>
                  )
                )}
              </Tbody>
            </Table>
          </Box>
        </>
      )}
      {data && data.PaginatedmailActivity.hasMore ? (
        <Flex>
          <Button
            onClick={() => fetchMoreData()}
            isLoading={loading}
            m="auto"
            my={8}
          >
            load more
          </Button>
        </Flex>
      ) : null}
    </>
  );
};

export default withApollo({ ssr: false })(ActivityMessages);
