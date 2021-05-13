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
} from "@chakra-ui/react";
import { useProfileQuery, useSubsQuery } from "../../generated/graphql";
import { withApollo } from "../../utils/withApollo";
import { DeleteSubButtons } from "./DeleteSubcriber";
import { InviteLink } from "./InviteLink";
import SubsModal from "./EditSubscriber";
import InviteSubscriber from "./InviteSubscriber";
import { useIsAuth } from "../../utils/useIsAuth";
import React from "react";
import { DocImport } from "./docImport";

const Subscribers = () => {
  useIsAuth();
  const me = useProfileQuery();

  const { data, error, loading, fetchMore, variables } = useSubsQuery({
    variables: {
      limit: 15,
      cursor: null,
    },
    notifyOnNetworkStatusChange: true,
  });

  if (!loading && !data) {
    return (
      <div>
        <div>you got query failed for some reason</div>
        <div>{error?.message}</div>
      </div>
    );
  } else {
  }
  const freeChecker = !loading && me.data?.me?.customerType === "free-trial";
  const subLength = freeChecker
    ? !loading
      ? data!.subs!.subs.length >= 5
      : null
    : null;

  return (
    <>
      {!data && loading ? (
        <div>loading...</div>
      ) : (
        <>
          <Flex mb={2} align="center">
            {<InviteSubscriber subLength={subLength} />}
            <DocImport />
            {!freeChecker && <InviteLink />}
          </Flex>
          <Box borderWidth="1px" borderRadius="lg" mt={5}>
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>Name</Th>
                  <Th>Email</Th>
                  <Th>Active?</Th>
                  <Th></Th>
                  <Th></Th>
                </Tr>
              </Thead>
              <Tbody>
                {data!.subs.subs.map((s) =>
                  !s ? null : (
                    <Tr key={s.id}>
                      <Td>{s.name}</Td>
                      <Td>{s.email}</Td>
                      <Td>{s.subscribed !== true ? "Not Active" : "Active"}</Td>
                      <Td>
                        <SubsModal
                          id={s.id}
                          name={s.name}
                          email={s.email}
                          subscribed={s.subscribed}
                        />
                      </Td>
                      <Td>
                        <DeleteSubButtons id={s.id} creatorId={s.creator.id} />
                      </Td>
                    </Tr>
                  )
                )}
              </Tbody>
            </Table>
          </Box>
        </>
      )}
      {data && data.subs.hasMore ? (
        <Flex>
          <Button
            onClick={() => {
              fetchMore({
                variables: {
                  limit: variables?.limit,
                  cursor: data.subs.subs[data.subs.subs.length - 1].createdAt,
                },
              });
            }}
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

export default withApollo({ ssr: false })(Subscribers);
