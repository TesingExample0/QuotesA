import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  Flex,
  Select,
  Box,
} from "@chakra-ui/react";
import { useQuotesQuery } from "../../generated/graphql";
import { withApollo } from "../../utils/withApollo";
import { useIsAuth } from "../../utils/useIsAuth";
import CreateQuote from "./CreateQuote";
import React, { useState, useEffect } from "react";
import { DeleteQuoteButton } from "./DeleteQuote";
import EditQuote from "./EditQuote";

const dropDown = [
  { name: "All", value: "All" },
  { name: "Accounting", value: "ACCOUNTING" },
  { name: "Coaching", value: "COACHING" },
  { name: "Consultant", value: "CONSULTANT" },
  { name: "Construction", value: "CONSTRUCTION" },
  { name: "Education", value: "EDUCATION" },
  { name: "Engineering", value: "ENGINEERING" },
  { name: "Financial", value: "FINANCIAL" },
  { name: "Health Care", value: "HEALTHCARE" },
  { name: "Home Services", value: "HOMESERVICES" },
  { name: "Hospitality", value: "HOSPITALITY" },
  { name: "Legal", value: "LEGAL" },
  { name: "Manufacturing", value: "MANUFACTURING" },
  { name: "Marketing", value: "MARKETING" },
  { name: "Realstate", value: "REALSTATE" },
  { name: "Restaurant", value: "RESTAURANT" },
  { name: "Retail", value: "RETAIL" },
  { name: "Technology", value: "TECHNOLOGY" },
];

const Quotes = () => {
  useIsAuth();
  const [value, setvalue] = useState();
  const [Quotes, setQuotes] = useState([] as any);

  const { data, error, loading, fetchMore, variables } = useQuotesQuery({
    variables: {
      limit: 15,
      cursor: null,
    },
    notifyOnNetworkStatusChange: true,
  });

  const changedvalue = (e: any) => {
    setvalue(e.target.value);
    const quotes = [] as any;
    if (e.target.value === "All") {
      setQuotes(data!.quotes.quotes);
    } else {
      data!.quotes.quotes.map((q: any) => {
        if (q.catagory === e.target.value) {
          quotes.push(q);
        }
      });
      setQuotes(quotes);
    }
  };
  useEffect(() => {
    if (data) {
      setQuotes(data!.quotes.quotes);
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
  return (
    <>
      {!data && loading ? (
        <div>loading...</div>
      ) : (
        <>
          <Flex mb={2} align="center">
            <CreateQuote />
            <Select onChange={(e) => changedvalue(e)} ml={5} w="40%">
              {dropDown.map((d, index) => (
                <option key={index} value={d.value}>
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
                  <Th>Category</Th>
                  <Th></Th>
                </Tr>
              </Thead>
              <Tbody>
                {Quotes.map((q: any) =>
                  !q ? null : (
                    <Tr key={q.id}>
                      <Td>{q.name}</Td>
                      <Td>{q.catagory}</Td>
                      <Td>
                        <EditQuote
                          id={q.id}
                          name={q.name}
                          catagory={q.catagory}
                        />
                      </Td>
                      <Td>
                        <DeleteQuoteButton id={q.id} creatorId={q.user.id} />
                      </Td>
                    </Tr>
                  )
                )}
              </Tbody>
            </Table>
          </Box>
        </>
      )}

      {data && data.quotes.hasMore ? (
        <Flex>
          <Button
            onClick={() => {
              fetchMore({
                variables: {
                  limit: variables?.limit,
                  cursor:
                    data.quotes.quotes[data.quotes.quotes.length - 1].createdAt,
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

export default withApollo({ ssr: false })(Quotes);
