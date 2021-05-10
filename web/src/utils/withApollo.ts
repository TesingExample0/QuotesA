import { PaginatedQuotes, PaginatedSubs } from './../generated/graphql';
import { createWithApollo } from './createWithApollo';
import { ApolloClient, InMemoryCache } from '@apollo/client';
import { NextPageContext } from 'next';

const createClient = (ctx: NextPageContext) =>
  new ApolloClient({
    uri: process.env.NEXT_PUBLIC_API_URL as string,
    credentials: 'include',
    headers: {
      cookie:
        (typeof window === 'undefined'
          ? ctx?.req?.headers.cookie
          : undefined) || '',
    },
    cache: new InMemoryCache({
      typePolicies: {
        Query: {
          fields: {
            subs: {
              keyArgs: [],
              merge(
                existing: PaginatedSubs | undefined,
                incoming: PaginatedSubs,
              ): PaginatedSubs {
                return {
                  ...incoming,
                  subs: [...(existing?.subs || []), ...incoming.subs],
                };
              },
            },
            quotes: {
              keyArgs: [],
              merge(
                existing: PaginatedQuotes | undefined,
                incoming: PaginatedQuotes,
              ): PaginatedQuotes {
                return {
                  ...incoming,
                  quotes: [...(existing?.quotes || []), ...incoming.quotes],
                };
              },
            },
          },
        },
      },
    }),
  });

export const withApollo = createWithApollo(createClient);
