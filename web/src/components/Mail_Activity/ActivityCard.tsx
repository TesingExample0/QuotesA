import React, { useState, useEffect } from "react";
import { Box, Text, SimpleGrid } from "@chakra-ui/react";
import { withApollo } from "../../utils/withApollo";

type CardProps = {
  Delivered: number;
  Opened: number;
  Clicked: number;
  Bounces: number;
  SpamReports: number;
  ActiveCount: number;
  NonActiveCount: number;
};

const ActivityCard: React.FC<CardProps> = ({
  Delivered,
  Opened,
  Clicked,
  Bounces,
  SpamReports,
  ActiveCount,
  NonActiveCount,
}: CardProps) => {
  return (
    <>
      <SimpleGrid minChildWidth="120px" spacing="10px">
        <Box bg="#f2f8ff" boxShadow="lg" height="100px" width="105px">
          <Box
            color="gray.500"
            fontWeight="semibold"
            letterSpacing="wide"
            fontSize="xs"
            textTransform="uppercase"
            mt="2"
            textAlign={["center"]}
          >
            Invitation Sent
          </Box>
          <Text fontSize={30} textAlign={["center"]} mt={1}>
            {ActiveCount}
          </Text>
        </Box>
        <Box bg="#f2f8ff" boxShadow="lg" height="100px" width="105px">
          <Box
            color="gray.500"
            fontWeight="semibold"
            letterSpacing="wide"
            fontSize="xs"
            textTransform="uppercase"
            mt="2"
            textAlign={["center"]}
          >
            Invitation Accepted
          </Box>
          <Text fontSize={30} textAlign={["center"]} mt={1}>
            {NonActiveCount}
          </Text>
        </Box>

        <Box bg="#f2f8ff" boxShadow="lg" height="100px" width="105px">
          <Box
            color="gray.500"
            fontWeight="semibold"
            letterSpacing="wide"
            fontSize="xs"
            textTransform="uppercase"
            mt="2"
            textAlign={["center"]}
          >
            DELIVERED
          </Box>
          <Text fontSize={30} textAlign={["center"]} mt={5}>
            {Delivered}
          </Text>
        </Box>

        <Box bg="#f2f8ff" boxShadow="lg" height="100px" width="105px">
          <Box
            color="gray.500"
            fontWeight="semibold"
            letterSpacing="wide"
            fontSize="xs"
            textTransform="uppercase"
            textAlign={["center"]}
            mt="2"
          >
            OPENED
          </Box>
          <Text fontSize={30} textAlign={["center"]} mt={5}>
            {Opened}
          </Text>
        </Box>

        <Box bg="#f2f8ff" boxShadow="lg" height="100px" width="105px">
          <Box
            color="gray.500"
            fontWeight="semibold"
            letterSpacing="wide"
            fontSize="xs"
            textTransform="uppercase"
            textAlign={["center"]}
            mt="2"
          >
            CLICKED
          </Box>
          <Text fontSize={30} textAlign={["center"]} mt={5}>
            {Clicked}
          </Text>
        </Box>

        <Box bg="#f2f8ff" boxShadow="lg" height="100px" width="105px">
          <Box
            color="gray.500"
            fontWeight="semibold"
            letterSpacing="wide"
            fontSize="xs"
            textTransform="uppercase"
            textAlign={["center"]}
            mt="2"
          >
            BOUNCES
          </Box>
          <Text fontSize={30} textAlign={["center"]} mt={5}>
            {Bounces}
          </Text>
        </Box>

        <Box bg="#f2f8ff" boxShadow="lg" height="100px" width="105px">
          <Box
            color="gray.500"
            fontWeight="semibold"
            letterSpacing="wide"
            fontSize="xs"
            textTransform="uppercase"
            textAlign={["center"]}
            mt="2"
          >
            SPAM REPORTS
          </Box>
          <Text fontSize={30} textAlign={["center"]} mt={5}>
            {SpamReports}
          </Text>
        </Box>
      </SimpleGrid>
    </>
  );
};

export default withApollo({ ssr: false })(ActivityCard);
