import React from "react";
import { withApollo } from "../../utils/withApollo";
import { useIsAuth } from "../../utils/useIsAuth";
import {
  Box,
  Flex,
  Button,
  Link,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
} from "@chakra-ui/react";
import Check from "./checkBox";
import { useGetAlltemplatesQuery } from "../../generated/graphql";
import ViewModal from "./ViewModal";
import { DeleteTemplateButton } from "./deleteTemplate";
import EditTemplates from "./EditTemplate";

const Templates = () => {
  useIsAuth();

  const {
    data,
    error,
    loading,
    fetchMore,
    variables,
  } = useGetAlltemplatesQuery({
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

  const fetchMoreData = () => {
    fetchMore({
      variables: {
        limit: variables?.limit,
        cursor:
          data?.getAlltemplates.templates[
            data?.getAlltemplates.templates.length - 1
          ].createdAt,
      },
      updateQuery: (previousResult: any, fetchMoreResult: any) => {
        console.log(previousResult, fetchMoreResult);
        const NewTemplates =
          fetchMoreResult.fetchMoreResult.getAlltemplates.templates;
        const NewTemplateshasmore =
          fetchMoreResult.fetchMoreResult.getAlltemplates.hasMore;
        return NewTemplates.length
          ? {
              getAlltemplates: {
                __typename: previousResult.getAlltemplates.__typename,
                templates: [
                  ...previousResult.getAlltemplates.templates,
                  ...NewTemplates,
                ],
                hasMore: NewTemplateshasmore,
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
          <Flex
            mb={2}
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Button as={Link} href="/Addtemplates">
              Add Templates
            </Button>
            <Check />
          </Flex>
          <Box borderWidth="1px" borderRadius="lg" mt={5}>
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>Title</Th>
                  <Th></Th>
                  <Th></Th>
                  <Th></Th>
                </Tr>
              </Thead>
              <Tbody>
                {data!.getAlltemplates.templates.map((Temp: any) =>
                  !Temp ? null : (
                    <Tr key={Temp.id}>
                      <Td>{Temp.title}</Td>
                      <Td>
                        <ViewModal body={Temp.body} subject={Temp.subject} />
                      </Td>
                      {/* {Temp.id === 1 ? (
                        <>
                          <Td></Td>
                          <Td></Td>
                        </>
                      ) : ( */}
                      <>
                        <Td>
                          <DeleteTemplateButton id={Temp.id} />
                        </Td>
                        <Td>
                          <EditTemplates
                            id={Temp.id}
                            body={Temp.body}
                            subject={Temp.subject}
                            Active={Temp.Active}
                            title={Temp.title}
                          />
                        </Td>
                      </>
                      {/* )} */}
                    </Tr>
                  )
                )}
              </Tbody>
            </Table>
          </Box>
        </>
      )}
      {data && data.getAlltemplates.hasMore ? (
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

export default withApollo({ ssr: false })(Templates);
