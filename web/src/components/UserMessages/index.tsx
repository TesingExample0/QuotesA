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
  Tooltip,
} from "@chakra-ui/react";
import { useMailActivitybyIdQuery } from "../../generated/graphql";
import { withApollo } from "../../utils/withApollo";
import { useIsAuth } from "../../utils/useIsAuth";
import ActivityModal from "../Messages/AvtivityModal";

interface UserActivityProps {
  id: number;
}

const ActivityUserMessages: React.FC<UserActivityProps> = ({ id }) => {
  useIsAuth();
  const [UserActivity, setUserActivity] = useState([] as any);
  const {
    data,
    error,
    loading,
    fetchMore,
    variables,
  } = useMailActivitybyIdQuery({
    variables: {
      id: id,
      limit: 15,
      cursor: null,
    },
    notifyOnNetworkStatusChange: true,
  });

  const maildata: any = [];
  useEffect(() => {
    if (data) {
      data!.PaginatedmailActivitybyId.PaginatedmailActivity.map((item) => {
        if (item.type === "Quote") {
          maildata.push(item);
        }
      });
      setUserActivity(maildata);
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
        id: id,
        limit: variables?.limit,
        cursor:
          data?.PaginatedmailActivitybyId.PaginatedmailActivity[
            data?.PaginatedmailActivitybyId.PaginatedmailActivity.length - 1
          ].createdAt,
      },
      updateQuery: (previousResult: any, fetchMoreResult: any) => {
        console.log(fetchMoreResult.PaginatedmailActivity);
        const newActivity =
          fetchMoreResult.fetchMoreResult.PaginatedmailActivitybyId
            .PaginatedmailActivity;
        const newActivityHasmore =
          fetchMoreResult.fetchMoreResult.PaginatedmailActivitybyId.hasMore;
        return newActivity.length
          ? {
              PaginatedmailActivitybyId: {
                __typename: previousResult.PaginatedmailActivitybyId.__typename,
                PaginatedmailActivity: [
                  ...previousResult.PaginatedmailActivitybyId
                    .PaginatedmailActivity,
                  ...newActivity,
                ],
                hasMore: newActivityHasmore,
              },
            }
          : previousResult;
      },
    });
  };

  return (
    <>
      {!data && loading ? (
        <div>loading...</div>
      ) : (
        <>
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
                {UserActivity.map((q: any) =>
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
      {data && data.PaginatedmailActivitybyId.hasMore ? (
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

export default withApollo({ ssr: false })(ActivityUserMessages);
