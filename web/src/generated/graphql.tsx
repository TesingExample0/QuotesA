import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
const defaultOptions =  {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Query = {
  __typename?: 'Query';
  alluser?: Maybe<Alluser>;
  me?: Maybe<User>;
  quotes: PaginatedQuotes;
  quote?: Maybe<Quote>;
  subs: PaginatedSubs;
  Allsubs: SubsCount;
  AllsubsId: SubsCount;
  sub?: Maybe<Sub>;
  subbytoken?: Maybe<Sub>;
  temp?: Maybe<Templates>;
  getAlltemplates: PaginatedTemplates;
  mailActivity: ActivityRespone;
  mailActivityById: ActivityRespone;
  PaginatedmailActivitybyId: PaginatedActivity;
  PaginatedmailActivity: PaginatedActivity;
};


export type QueryQuotesArgs = {
  cursor?: Maybe<Scalars['String']>;
  limit: Scalars['Int'];
};


export type QueryQuoteArgs = {
  id: Scalars['Int'];
};


export type QuerySubsArgs = {
  cursor?: Maybe<Scalars['String']>;
  limit: Scalars['Int'];
};


export type QueryAllsubsIdArgs = {
  Id: Scalars['Int'];
};


export type QuerySubArgs = {
  id: Scalars['Int'];
};


export type QuerySubbytokenArgs = {
  token: Scalars['String'];
};


export type QueryTempArgs = {
  id: Scalars['Int'];
};


export type QueryGetAlltemplatesArgs = {
  cursor?: Maybe<Scalars['String']>;
  limit: Scalars['Int'];
};


export type QueryMailActivityByIdArgs = {
  id: Scalars['Int'];
};


export type QueryPaginatedmailActivitybyIdArgs = {
  cursor?: Maybe<Scalars['String']>;
  limit: Scalars['Int'];
  id: Scalars['Int'];
};


export type QueryPaginatedmailActivityArgs = {
  cursor?: Maybe<Scalars['String']>;
  limit: Scalars['Int'];
};

export type Alluser = {
  __typename?: 'Alluser';
  user?: Maybe<Array<User>>;
};

export type User = {
  __typename?: 'User';
  id: Scalars['Float'];
  role: Scalars['String'];
  inviteLink: Scalars['String'];
  email: Scalars['String'];
  customerType: Scalars['String'];
  ccLast4: Scalars['String'];
  catagory: Scalars['String'];
  name: Scalars['String'];
  address: Scalars['String'];
  city: Scalars['String'];
  state: Scalars['String'];
  zip: Scalars['String'];
  company: Scalars['String'];
  title: Scalars['String'];
  DefaultTemplates: Scalars['Boolean'];
  linkedIn: Scalars['String'];
  twitter: Scalars['String'];
  facebook: Scalars['String'];
  website: Scalars['String'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type PaginatedQuotes = {
  __typename?: 'PaginatedQuotes';
  quotes: Array<Quote>;
  hasMore: Scalars['Boolean'];
};

export type Quote = {
  __typename?: 'Quote';
  id: Scalars['Float'];
  name: Scalars['String'];
  catagory: Scalars['String'];
  creatorId: Scalars['Float'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
  user: User;
};

export type PaginatedSubs = {
  __typename?: 'PaginatedSubs';
  subs: Array<Sub>;
  hasMore: Scalars['Boolean'];
};

export type Sub = {
  __typename?: 'Sub';
  id: Scalars['Float'];
  name: Scalars['String'];
  email: Scalars['String'];
  unsubscribeToken: Scalars['String'];
  subscribed: Scalars['Boolean'];
  creatorId: Scalars['Float'];
  frequency: Scalars['Float'];
  creator: User;
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type SubsCount = {
  __typename?: 'SubsCount';
  ActiveCount: Scalars['Float'];
  NonActiveCount: Scalars['Float'];
};

export type Templates = {
  __typename?: 'Templates';
  id: Scalars['Float'];
  title: Scalars['String'];
  subject: Scalars['String'];
  body: Scalars['String'];
  creatorId: Scalars['Float'];
  Active: Scalars['Boolean'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type PaginatedTemplates = {
  __typename?: 'PaginatedTemplates';
  templates: Array<Templates>;
  hasMore: Scalars['Boolean'];
};

export type ActivityRespone = {
  __typename?: 'ActivityRespone';
  mailActivity?: Maybe<Array<MailActivity>>;
};

export type MailActivity = {
  __typename?: 'MailActivity';
  id: Scalars['Float'];
  From_Email?: Maybe<Scalars['String']>;
  To_Email?: Maybe<Scalars['String']>;
  subject?: Maybe<Scalars['String']>;
  body?: Maybe<Scalars['String']>;
  Status?: Maybe<Scalars['String']>;
  msgid?: Maybe<Scalars['String']>;
  xmsgid?: Maybe<Scalars['String']>;
  creatorId?: Maybe<Scalars['Float']>;
  subsid?: Maybe<Scalars['Float']>;
  open_count?: Maybe<Scalars['Float']>;
  clicks_count?: Maybe<Scalars['Float']>;
  createdAt: Scalars['String'];
  type?: Maybe<Scalars['String']>;
  Author?: Maybe<Scalars['String']>;
  user: User;
  subs: Sub;
};

export type PaginatedActivity = {
  __typename?: 'PaginatedActivity';
  PaginatedmailActivity: Array<MailActivity>;
  hasMore: Scalars['Boolean'];
};

export type Mutation = {
  __typename?: 'Mutation';
  changePassword: UserResponse;
  updateUser: UserResponse;
  updateAuth: UserResponse;
  forgotPassword: Scalars['Boolean'];
  register: UserResponse;
  login: UserResponse;
  createSubscription: UserResponse;
  reSubribeUserNewCC: UserResponse;
  reSubribeUserExistingCC: UserResponse;
  changeCreditCard: UserResponse;
  cancelSubscription: UserResponse;
  logout: Scalars['Boolean'];
  createQuote: QuoteResponse;
  updateQuote?: Maybe<QuoteResponse>;
  deleteQuote: Scalars['Boolean'];
  createSub: SubResponse;
  createSubFromContact: SubResponse;
  createSubFromInvite: SubResponse;
  acceptInvite: SubResponse;
  updateSub: SubResponse;
  updateMailandFrequency: SubResponse;
  createSubsfrwdpage: SubResponse;
  unsubscribeSub: SubResponse;
  deleteSub: Scalars['Boolean'];
  createTemplates: TemplateRespones;
  updateTemplates: TemplateRespones;
  deleteTemplate: Scalars['Boolean'];
};


export type MutationChangePasswordArgs = {
  newPassword: Scalars['String'];
  token: Scalars['String'];
};


export type MutationUpdateUserArgs = {
  input: UserInput;
};


export type MutationUpdateAuthArgs = {
  input: UserAuthInput;
};


export type MutationForgotPasswordArgs = {
  email: Scalars['String'];
};


export type MutationRegisterArgs = {
  options: UsernamePasswordInput;
};


export type MutationLoginArgs = {
  password: Scalars['String'];
  email: Scalars['String'];
};


export type MutationCreateSubscriptionArgs = {
  ccLast4: Scalars['String'];
  source: Scalars['String'];
};


export type MutationReSubribeUserNewCcArgs = {
  ccLast4: Scalars['String'];
  source: Scalars['String'];
};


export type MutationChangeCreditCardArgs = {
  ccLast4: Scalars['String'];
  source: Scalars['String'];
};


export type MutationCreateQuoteArgs = {
  input: QuoteInput;
};


export type MutationUpdateQuoteArgs = {
  catagory: Scalars['String'];
  name: Scalars['String'];
  id: Scalars['Int'];
};


export type MutationDeleteQuoteArgs = {
  id: Scalars['Int'];
};


export type MutationCreateSubArgs = {
  input: SubInput;
};


export type MutationCreateSubFromContactArgs = {
  emails: Scalars['String'];
  token: Scalars['String'];
};


export type MutationCreateSubFromInviteArgs = {
  input: SubInviteInput;
};


export type MutationAcceptInviteArgs = {
  frequency: Scalars['Float'];
  subscribed: Scalars['Boolean'];
  token: Scalars['String'];
};


export type MutationUpdateSubArgs = {
  subscribed: Scalars['Boolean'];
  email: Scalars['String'];
  name: Scalars['String'];
  id: Scalars['Int'];
};


export type MutationUpdateMailandFrequencyArgs = {
  email: Scalars['String'];
  frequency: Scalars['Float'];
  token: Scalars['String'];
};


export type MutationCreateSubsfrwdpageArgs = {
  frequency: Scalars['Float'];
  email: Scalars['String'];
  name: Scalars['String'];
  token: Scalars['String'];
};


export type MutationUnsubscribeSubArgs = {
  token: Scalars['String'];
};


export type MutationDeleteSubArgs = {
  id: Scalars['Int'];
};


export type MutationCreateTemplatesArgs = {
  input: TemplateInput;
};


export type MutationUpdateTemplatesArgs = {
  Active: Scalars['Boolean'];
  subject: Scalars['String'];
  body: Scalars['String'];
  title: Scalars['String'];
  id: Scalars['Int'];
};


export type MutationDeleteTemplateArgs = {
  id: Scalars['Int'];
};

export type UserResponse = {
  __typename?: 'UserResponse';
  errors?: Maybe<Array<FieldError>>;
  user?: Maybe<User>;
};

export type FieldError = {
  __typename?: 'FieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type UserInput = {
  name: Scalars['String'];
  address: Scalars['String'];
  city: Scalars['String'];
  state: Scalars['String'];
  zip: Scalars['String'];
  catagory: Scalars['String'];
  title: Scalars['String'];
  company: Scalars['String'];
  twitter: Scalars['String'];
  facebook: Scalars['String'];
  linkedIn: Scalars['String'];
  website: Scalars['String'];
  DefaultTemplates: Scalars['Boolean'];
};

export type UserAuthInput = {
  email?: Maybe<Scalars['String']>;
  password?: Maybe<Scalars['String']>;
  confirm?: Maybe<Scalars['String']>;
};

export type UsernamePasswordInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type QuoteResponse = {
  __typename?: 'QuoteResponse';
  errors?: Maybe<Array<FieldError>>;
  quote?: Maybe<Quote>;
};

export type QuoteInput = {
  name: Scalars['String'];
  catagory: Scalars['String'];
};

export type SubResponse = {
  __typename?: 'SubResponse';
  errors?: Maybe<Array<FieldError>>;
  sub?: Maybe<Sub>;
};

export type SubInput = {
  name: Scalars['String'];
  email: Scalars['String'];
};

export type SubInviteInput = {
  name: Scalars['String'];
  email: Scalars['String'];
  frequency: Scalars['Float'];
  token: Scalars['String'];
};

export type TemplateRespones = {
  __typename?: 'TemplateRespones';
  errors?: Maybe<Array<FieldError>>;
  template?: Maybe<Templates>;
};

export type TemplateInput = {
  body: Scalars['String'];
  subject: Scalars['String'];
  title: Scalars['String'];
};

export type ActivitySnippetFragment = (
  { __typename?: 'ActivityRespone' }
  & { mailActivity?: Maybe<Array<(
    { __typename?: 'MailActivity' }
    & RegularMailResponesFragment
  )>> }
);

export type AllsubSnippetFragment = (
  { __typename?: 'SubsCount' }
  & Pick<SubsCount, 'ActiveCount' | 'NonActiveCount'>
);

export type PaginatedActivitySnippetFragment = (
  { __typename?: 'MailActivity' }
  & Pick<MailActivity, 'id' | 'From_Email' | 'To_Email' | 'subject' | 'Status' | 'msgid' | 'open_count' | 'clicks_count' | 'createdAt' | 'body' | 'creatorId' | 'Author' | 'type' | 'subsid'>
  & { user: (
    { __typename?: 'User' }
    & Pick<User, 'id' | 'name'>
  ), subs: (
    { __typename?: 'Sub' }
    & Pick<Sub, 'id' | 'name'>
  ) }
);

export type ProfileUserFragment = (
  { __typename?: 'User' }
  & Pick<User, 'id' | 'inviteLink' | 'name' | 'email' | 'address' | 'city' | 'state' | 'zip' | 'role' | 'catagory' | 'title' | 'company' | 'twitter' | 'facebook' | 'linkedIn' | 'website' | 'customerType' | 'ccLast4' | 'DefaultTemplates'>
);

export type ProfileUserResponseFragment = (
  { __typename?: 'UserResponse' }
  & { errors?: Maybe<Array<(
    { __typename?: 'FieldError' }
    & RegularErrorFragment
  )>>, user?: Maybe<(
    { __typename?: 'User' }
    & ProfileUserFragment
  )> }
);

export type QuoteSnippetFragment = (
  { __typename?: 'Quote' }
  & Pick<Quote, 'id' | 'name' | 'createdAt' | 'catagory'>
  & { user: (
    { __typename?: 'User' }
    & Pick<User, 'id' | 'email'>
  ) }
);

export type RegularErrorFragment = (
  { __typename?: 'FieldError' }
  & Pick<FieldError, 'field' | 'message'>
);

export type RegularMailResponesFragment = (
  { __typename?: 'MailActivity' }
  & Pick<MailActivity, 'id' | 'From_Email' | 'To_Email' | 'subject' | 'Status' | 'open_count' | 'clicks_count' | 'msgid' | 'type'>
);

export type RegularQuoteFragment = (
  { __typename?: 'Quote' }
  & Pick<Quote, 'id'>
);

export type RegularSubFragment = (
  { __typename?: 'Sub' }
  & Pick<Sub, 'id'>
);

export type RegularTemplateResponseFragment = (
  { __typename?: 'TemplateRespones' }
  & { errors?: Maybe<Array<(
    { __typename?: 'FieldError' }
    & RegularErrorFragment
  )>>, template?: Maybe<(
    { __typename?: 'Templates' }
    & RegularTemplatesFragment
  )> }
);

export type RegularTemplatesFragment = (
  { __typename?: 'Templates' }
  & Pick<Templates, 'id'>
);

export type RegularUserFragment = (
  { __typename?: 'User' }
  & Pick<User, 'id' | 'email' | 'inviteLink' | 'role'>
);

export type RegularQuoteResponseFragment = (
  { __typename?: 'QuoteResponse' }
  & { errors?: Maybe<Array<(
    { __typename?: 'FieldError' }
    & RegularErrorFragment
  )>>, quote?: Maybe<(
    { __typename?: 'Quote' }
    & RegularQuoteFragment
  )> }
);

export type RegularSubResponseFragment = (
  { __typename?: 'SubResponse' }
  & { errors?: Maybe<Array<(
    { __typename?: 'FieldError' }
    & RegularErrorFragment
  )>>, sub?: Maybe<(
    { __typename?: 'Sub' }
    & RegularSubFragment
  )> }
);

export type RegularUserResponseFragment = (
  { __typename?: 'UserResponse' }
  & { errors?: Maybe<Array<(
    { __typename?: 'FieldError' }
    & RegularErrorFragment
  )>>, user?: Maybe<(
    { __typename?: 'User' }
    & RegularUserFragment
  )> }
);

export type SubSnippetFragment = (
  { __typename?: 'Sub' }
  & Pick<Sub, 'id' | 'createdAt' | 'updatedAt' | 'name' | 'email' | 'subscribed' | 'frequency'>
  & { creator: (
    { __typename?: 'User' }
    & Pick<User, 'id' | 'email'>
  ) }
);

export type TemplatesSnippetFragment = (
  { __typename?: 'Templates' }
  & Pick<Templates, 'id' | 'title' | 'body' | 'subject' | 'Active' | 'createdAt'>
);

export type AlluserSnippetFragment = (
  { __typename?: 'Alluser' }
  & { user?: Maybe<Array<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'name'>
  )>> }
);

export type UpdateTemplatesMutationVariables = Exact<{
  id: Scalars['Int'];
  title: Scalars['String'];
  body: Scalars['String'];
  subject: Scalars['String'];
  Active: Scalars['Boolean'];
}>;


export type UpdateTemplatesMutation = (
  { __typename?: 'Mutation' }
  & { updateTemplates: (
    { __typename?: 'TemplateRespones' }
    & RegularTemplateResponseFragment
  ) }
);

export type AcceptInviteMutationVariables = Exact<{
  token: Scalars['String'];
  subscribed: Scalars['Boolean'];
  frequency: Scalars['Float'];
}>;


export type AcceptInviteMutation = (
  { __typename?: 'Mutation' }
  & { acceptInvite: (
    { __typename?: 'SubResponse' }
    & RegularSubResponseFragment
  ) }
);

export type CancelSubscriptionMutationVariables = Exact<{ [key: string]: never; }>;


export type CancelSubscriptionMutation = (
  { __typename?: 'Mutation' }
  & { cancelSubscription: (
    { __typename?: 'UserResponse' }
    & ProfileUserResponseFragment
  ) }
);

export type ChangeCreditCardMutationVariables = Exact<{
  source: Scalars['String'];
  ccLast4: Scalars['String'];
}>;


export type ChangeCreditCardMutation = (
  { __typename?: 'Mutation' }
  & { changeCreditCard: (
    { __typename?: 'UserResponse' }
    & ProfileUserResponseFragment
  ) }
);

export type ChangePasswordMutationVariables = Exact<{
  token: Scalars['String'];
  newPassword: Scalars['String'];
}>;


export type ChangePasswordMutation = (
  { __typename?: 'Mutation' }
  & { changePassword: (
    { __typename?: 'UserResponse' }
    & RegularUserResponseFragment
  ) }
);

export type UpdateMailandFrequencyMutationVariables = Exact<{
  token: Scalars['String'];
  frequency: Scalars['Float'];
  email: Scalars['String'];
}>;


export type UpdateMailandFrequencyMutation = (
  { __typename?: 'Mutation' }
  & { updateMailandFrequency: (
    { __typename?: 'SubResponse' }
    & RegularSubResponseFragment
  ) }
);

export type CreateQuoteMutationVariables = Exact<{
  input: QuoteInput;
}>;


export type CreateQuoteMutation = (
  { __typename?: 'Mutation' }
  & { createQuote: (
    { __typename?: 'QuoteResponse' }
    & RegularQuoteResponseFragment
  ) }
);

export type CreateSubMutationVariables = Exact<{
  input: SubInput;
}>;


export type CreateSubMutation = (
  { __typename?: 'Mutation' }
  & { createSub: (
    { __typename?: 'SubResponse' }
    & RegularSubResponseFragment
  ) }
);

export type CreateSubFromContactMutationVariables = Exact<{
  token: Scalars['String'];
  emails: Scalars['String'];
}>;


export type CreateSubFromContactMutation = (
  { __typename?: 'Mutation' }
  & { createSubFromContact: (
    { __typename?: 'SubResponse' }
    & RegularSubResponseFragment
  ) }
);

export type CreateSubFromInviteMutationVariables = Exact<{
  input: SubInviteInput;
}>;


export type CreateSubFromInviteMutation = (
  { __typename?: 'Mutation' }
  & { createSubFromInvite: (
    { __typename?: 'SubResponse' }
    & RegularSubResponseFragment
  ) }
);

export type CreateSubscriptionMutationVariables = Exact<{
  source: Scalars['String'];
  ccLast4: Scalars['String'];
}>;


export type CreateSubscriptionMutation = (
  { __typename?: 'Mutation' }
  & { createSubscription: (
    { __typename?: 'UserResponse' }
    & ProfileUserResponseFragment
  ) }
);

export type CreateSubsfrwdpageMutationVariables = Exact<{
  token: Scalars['String'];
  name: Scalars['String'];
  frequency: Scalars['Float'];
  email: Scalars['String'];
}>;


export type CreateSubsfrwdpageMutation = (
  { __typename?: 'Mutation' }
  & { createSubsfrwdpage: (
    { __typename?: 'SubResponse' }
    & RegularSubResponseFragment
  ) }
);

export type DeleteQuoteMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type DeleteQuoteMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deleteQuote'>
);

export type DeleteSubMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type DeleteSubMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deleteSub'>
);

export type DeleteTemplateMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type DeleteTemplateMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deleteTemplate'>
);

export type ForgotPasswordMutationVariables = Exact<{
  email: Scalars['String'];
}>;


export type ForgotPasswordMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'forgotPassword'>
);

export type LoginMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & { login: (
    { __typename?: 'UserResponse' }
    & RegularUserResponseFragment
  ) }
);

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'logout'>
);

export type ReSubribeUserExistingCcMutationVariables = Exact<{ [key: string]: never; }>;


export type ReSubribeUserExistingCcMutation = (
  { __typename?: 'Mutation' }
  & { reSubribeUserExistingCC: (
    { __typename?: 'UserResponse' }
    & ProfileUserResponseFragment
  ) }
);

export type ReSubribeUserNewCcMutationVariables = Exact<{
  source: Scalars['String'];
  ccLast4: Scalars['String'];
}>;


export type ReSubribeUserNewCcMutation = (
  { __typename?: 'Mutation' }
  & { reSubribeUserNewCC: (
    { __typename?: 'UserResponse' }
    & ProfileUserResponseFragment
  ) }
);

export type RegisterMutationVariables = Exact<{
  options: UsernamePasswordInput;
}>;


export type RegisterMutation = (
  { __typename?: 'Mutation' }
  & { register: (
    { __typename?: 'UserResponse' }
    & RegularUserResponseFragment
  ) }
);

export type CreateTemplatesMutationVariables = Exact<{
  input: TemplateInput;
}>;


export type CreateTemplatesMutation = (
  { __typename?: 'Mutation' }
  & { createTemplates: (
    { __typename?: 'TemplateRespones' }
    & RegularTemplateResponseFragment
  ) }
);

export type UnsubscribeSubMutationVariables = Exact<{
  token: Scalars['String'];
}>;


export type UnsubscribeSubMutation = (
  { __typename?: 'Mutation' }
  & { unsubscribeSub: (
    { __typename?: 'SubResponse' }
    & RegularSubResponseFragment
  ) }
);

export type UpdateQuoteMutationVariables = Exact<{
  id: Scalars['Int'];
  name: Scalars['String'];
  catagory: Scalars['String'];
}>;


export type UpdateQuoteMutation = (
  { __typename?: 'Mutation' }
  & { updateQuote?: Maybe<(
    { __typename?: 'QuoteResponse' }
    & RegularQuoteResponseFragment
  )> }
);

export type UpdateSubMutationVariables = Exact<{
  id: Scalars['Int'];
  name: Scalars['String'];
  email: Scalars['String'];
  subscribed: Scalars['Boolean'];
}>;


export type UpdateSubMutation = (
  { __typename?: 'Mutation' }
  & { updateSub: (
    { __typename?: 'SubResponse' }
    & RegularSubResponseFragment
  ) }
);

export type UpdateUserMutationVariables = Exact<{
  input: UserInput;
}>;


export type UpdateUserMutation = (
  { __typename?: 'Mutation' }
  & { updateUser: (
    { __typename?: 'UserResponse' }
    & ProfileUserResponseFragment
  ) }
);

export type UpdateUserAuthMutationVariables = Exact<{
  input: UserAuthInput;
}>;


export type UpdateUserAuthMutation = (
  { __typename?: 'Mutation' }
  & { updateAuth: (
    { __typename?: 'UserResponse' }
    & RegularUserResponseFragment
  ) }
);

export type AllsubsQueryVariables = Exact<{ [key: string]: never; }>;


export type AllsubsQuery = (
  { __typename?: 'Query' }
  & { Allsubs: (
    { __typename?: 'SubsCount' }
    & AllsubSnippetFragment
  ) }
);

export type AllsubsIdQueryVariables = Exact<{
  Id: Scalars['Int'];
}>;


export type AllsubsIdQuery = (
  { __typename?: 'Query' }
  & { AllsubsId: (
    { __typename?: 'SubsCount' }
    & AllsubSnippetFragment
  ) }
);

export type MailActivityByIdQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type MailActivityByIdQuery = (
  { __typename?: 'Query' }
  & { mailActivityById: (
    { __typename?: 'ActivityRespone' }
    & ActivitySnippetFragment
  ) }
);

export type PaginatedActivityQueryVariables = Exact<{
  limit: Scalars['Int'];
  cursor?: Maybe<Scalars['String']>;
}>;


export type PaginatedActivityQuery = (
  { __typename?: 'Query' }
  & { PaginatedmailActivity: (
    { __typename?: 'PaginatedActivity' }
    & Pick<PaginatedActivity, 'hasMore'>
    & { PaginatedmailActivity: Array<(
      { __typename?: 'MailActivity' }
      & PaginatedActivitySnippetFragment
    )> }
  ) }
);

export type MailActivitybyIdQueryVariables = Exact<{
  limit: Scalars['Int'];
  cursor?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
}>;


export type MailActivitybyIdQuery = (
  { __typename?: 'Query' }
  & { PaginatedmailActivitybyId: (
    { __typename?: 'PaginatedActivity' }
    & Pick<PaginatedActivity, 'hasMore'>
    & { PaginatedmailActivity: Array<(
      { __typename?: 'MailActivity' }
      & PaginatedActivitySnippetFragment
    )> }
  ) }
);

export type QuotesQueryVariables = Exact<{
  limit: Scalars['Int'];
  cursor?: Maybe<Scalars['String']>;
}>;


export type QuotesQuery = (
  { __typename?: 'Query' }
  & { quotes: (
    { __typename?: 'PaginatedQuotes' }
    & Pick<PaginatedQuotes, 'hasMore'>
    & { quotes: Array<(
      { __typename?: 'Quote' }
      & QuoteSnippetFragment
    )> }
  ) }
);

export type SubsQueryVariables = Exact<{
  limit: Scalars['Int'];
  cursor?: Maybe<Scalars['String']>;
}>;


export type SubsQuery = (
  { __typename?: 'Query' }
  & { subs: (
    { __typename?: 'PaginatedSubs' }
    & Pick<PaginatedSubs, 'hasMore'>
    & { subs: Array<(
      { __typename?: 'Sub' }
      & SubSnippetFragment
    )> }
  ) }
);

export type AlluserQueryVariables = Exact<{ [key: string]: never; }>;


export type AlluserQuery = (
  { __typename?: 'Query' }
  & { alluser?: Maybe<(
    { __typename?: 'Alluser' }
    & AlluserSnippetFragment
  )> }
);

export type MailActivityQueryVariables = Exact<{ [key: string]: never; }>;


export type MailActivityQuery = (
  { __typename?: 'Query' }
  & { mailActivity: (
    { __typename?: 'ActivityRespone' }
    & ActivitySnippetFragment
  ) }
);

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = (
  { __typename?: 'Query' }
  & { me?: Maybe<(
    { __typename?: 'User' }
    & RegularUserFragment
  )> }
);

export type ProfileQueryVariables = Exact<{ [key: string]: never; }>;


export type ProfileQuery = (
  { __typename?: 'Query' }
  & { me?: Maybe<(
    { __typename?: 'User' }
    & ProfileUserFragment
  )> }
);

export type SubbytokenQueryVariables = Exact<{
  token: Scalars['String'];
}>;


export type SubbytokenQuery = (
  { __typename?: 'Query' }
  & { subbytoken?: Maybe<(
    { __typename?: 'Sub' }
    & SubSnippetFragment
  )> }
);

export type GetAlltemplatesQueryVariables = Exact<{
  limit: Scalars['Int'];
  cursor?: Maybe<Scalars['String']>;
}>;


export type GetAlltemplatesQuery = (
  { __typename?: 'Query' }
  & { getAlltemplates: (
    { __typename?: 'PaginatedTemplates' }
    & Pick<PaginatedTemplates, 'hasMore'>
    & { templates: Array<(
      { __typename?: 'Templates' }
      & TemplatesSnippetFragment
    )> }
  ) }
);

export const RegularMailResponesFragmentDoc = gql`
    fragment RegularMailRespones on MailActivity {
  id
  From_Email
  To_Email
  subject
  Status
  open_count
  clicks_count
  msgid
  type
}
    `;
export const ActivitySnippetFragmentDoc = gql`
    fragment ActivitySnippet on ActivityRespone {
  mailActivity {
    ...RegularMailRespones
  }
}
    ${RegularMailResponesFragmentDoc}`;
export const AllsubSnippetFragmentDoc = gql`
    fragment AllsubSnippet on SubsCount {
  ActiveCount
  NonActiveCount
}
    `;
export const PaginatedActivitySnippetFragmentDoc = gql`
    fragment PaginatedActivitySnippet on MailActivity {
  id
  From_Email
  To_Email
  subject
  Status
  msgid
  open_count
  clicks_count
  createdAt
  body
  creatorId
  Author
  type
  subsid
  user {
    id
    name
  }
  subs {
    id
    name
  }
}
    `;
export const RegularErrorFragmentDoc = gql`
    fragment RegularError on FieldError {
  field
  message
}
    `;
export const ProfileUserFragmentDoc = gql`
    fragment ProfileUser on User {
  id
  inviteLink
  name
  email
  address
  city
  state
  zip
  role
  catagory
  title
  company
  twitter
  facebook
  linkedIn
  website
  customerType
  ccLast4
  DefaultTemplates
}
    `;
export const ProfileUserResponseFragmentDoc = gql`
    fragment ProfileUserResponse on UserResponse {
  errors {
    ...RegularError
  }
  user {
    ...ProfileUser
  }
}
    ${RegularErrorFragmentDoc}
${ProfileUserFragmentDoc}`;
export const QuoteSnippetFragmentDoc = gql`
    fragment QuoteSnippet on Quote {
  id
  name
  user {
    id
    email
  }
  createdAt
  catagory
}
    `;
export const RegularTemplatesFragmentDoc = gql`
    fragment RegularTemplates on Templates {
  id
}
    `;
export const RegularTemplateResponseFragmentDoc = gql`
    fragment RegularTemplateResponse on TemplateRespones {
  errors {
    ...RegularError
  }
  template {
    ...RegularTemplates
  }
}
    ${RegularErrorFragmentDoc}
${RegularTemplatesFragmentDoc}`;
export const RegularQuoteFragmentDoc = gql`
    fragment RegularQuote on Quote {
  id
}
    `;
export const RegularQuoteResponseFragmentDoc = gql`
    fragment RegularQuoteResponse on QuoteResponse {
  errors {
    ...RegularError
  }
  quote {
    ...RegularQuote
  }
}
    ${RegularErrorFragmentDoc}
${RegularQuoteFragmentDoc}`;
export const RegularSubFragmentDoc = gql`
    fragment RegularSub on Sub {
  id
}
    `;
export const RegularSubResponseFragmentDoc = gql`
    fragment RegularSubResponse on SubResponse {
  errors {
    ...RegularError
  }
  sub {
    ...RegularSub
  }
}
    ${RegularErrorFragmentDoc}
${RegularSubFragmentDoc}`;
export const RegularUserFragmentDoc = gql`
    fragment RegularUser on User {
  id
  email
  inviteLink
  role
}
    `;
export const RegularUserResponseFragmentDoc = gql`
    fragment RegularUserResponse on UserResponse {
  errors {
    ...RegularError
  }
  user {
    ...RegularUser
  }
}
    ${RegularErrorFragmentDoc}
${RegularUserFragmentDoc}`;
export const SubSnippetFragmentDoc = gql`
    fragment SubSnippet on Sub {
  id
  createdAt
  updatedAt
  name
  email
  subscribed
  frequency
  creator {
    id
    email
  }
}
    `;
export const TemplatesSnippetFragmentDoc = gql`
    fragment TemplatesSnippet on Templates {
  id
  title
  body
  subject
  Active
  createdAt
}
    `;
export const AlluserSnippetFragmentDoc = gql`
    fragment alluserSnippet on Alluser {
  user {
    id
    name
  }
}
    `;
export const UpdateTemplatesDocument = gql`
    mutation UpdateTemplates($id: Int!, $title: String!, $body: String!, $subject: String!, $Active: Boolean!) {
  updateTemplates(
    id: $id
    title: $title
    body: $body
    subject: $subject
    Active: $Active
  ) {
    ...RegularTemplateResponse
  }
}
    ${RegularTemplateResponseFragmentDoc}`;
export type UpdateTemplatesMutationFn = Apollo.MutationFunction<UpdateTemplatesMutation, UpdateTemplatesMutationVariables>;

/**
 * __useUpdateTemplatesMutation__
 *
 * To run a mutation, you first call `useUpdateTemplatesMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateTemplatesMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateTemplatesMutation, { data, loading, error }] = useUpdateTemplatesMutation({
 *   variables: {
 *      id: // value for 'id'
 *      title: // value for 'title'
 *      body: // value for 'body'
 *      subject: // value for 'subject'
 *      Active: // value for 'Active'
 *   },
 * });
 */
export function useUpdateTemplatesMutation(baseOptions?: Apollo.MutationHookOptions<UpdateTemplatesMutation, UpdateTemplatesMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateTemplatesMutation, UpdateTemplatesMutationVariables>(UpdateTemplatesDocument, options);
      }
export type UpdateTemplatesMutationHookResult = ReturnType<typeof useUpdateTemplatesMutation>;
export type UpdateTemplatesMutationResult = Apollo.MutationResult<UpdateTemplatesMutation>;
export type UpdateTemplatesMutationOptions = Apollo.BaseMutationOptions<UpdateTemplatesMutation, UpdateTemplatesMutationVariables>;
export const AcceptInviteDocument = gql`
    mutation AcceptInvite($token: String!, $subscribed: Boolean!, $frequency: Float!) {
  acceptInvite(token: $token, subscribed: $subscribed, frequency: $frequency) {
    ...RegularSubResponse
  }
}
    ${RegularSubResponseFragmentDoc}`;
export type AcceptInviteMutationFn = Apollo.MutationFunction<AcceptInviteMutation, AcceptInviteMutationVariables>;

/**
 * __useAcceptInviteMutation__
 *
 * To run a mutation, you first call `useAcceptInviteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAcceptInviteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [acceptInviteMutation, { data, loading, error }] = useAcceptInviteMutation({
 *   variables: {
 *      token: // value for 'token'
 *      subscribed: // value for 'subscribed'
 *      frequency: // value for 'frequency'
 *   },
 * });
 */
export function useAcceptInviteMutation(baseOptions?: Apollo.MutationHookOptions<AcceptInviteMutation, AcceptInviteMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AcceptInviteMutation, AcceptInviteMutationVariables>(AcceptInviteDocument, options);
      }
export type AcceptInviteMutationHookResult = ReturnType<typeof useAcceptInviteMutation>;
export type AcceptInviteMutationResult = Apollo.MutationResult<AcceptInviteMutation>;
export type AcceptInviteMutationOptions = Apollo.BaseMutationOptions<AcceptInviteMutation, AcceptInviteMutationVariables>;
export const CancelSubscriptionDocument = gql`
    mutation CancelSubscription {
  cancelSubscription {
    ...ProfileUserResponse
  }
}
    ${ProfileUserResponseFragmentDoc}`;
export type CancelSubscriptionMutationFn = Apollo.MutationFunction<CancelSubscriptionMutation, CancelSubscriptionMutationVariables>;

/**
 * __useCancelSubscriptionMutation__
 *
 * To run a mutation, you first call `useCancelSubscriptionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCancelSubscriptionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [cancelSubscriptionMutation, { data, loading, error }] = useCancelSubscriptionMutation({
 *   variables: {
 *   },
 * });
 */
export function useCancelSubscriptionMutation(baseOptions?: Apollo.MutationHookOptions<CancelSubscriptionMutation, CancelSubscriptionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CancelSubscriptionMutation, CancelSubscriptionMutationVariables>(CancelSubscriptionDocument, options);
      }
export type CancelSubscriptionMutationHookResult = ReturnType<typeof useCancelSubscriptionMutation>;
export type CancelSubscriptionMutationResult = Apollo.MutationResult<CancelSubscriptionMutation>;
export type CancelSubscriptionMutationOptions = Apollo.BaseMutationOptions<CancelSubscriptionMutation, CancelSubscriptionMutationVariables>;
export const ChangeCreditCardDocument = gql`
    mutation ChangeCreditCard($source: String!, $ccLast4: String!) {
  changeCreditCard(source: $source, ccLast4: $ccLast4) {
    ...ProfileUserResponse
  }
}
    ${ProfileUserResponseFragmentDoc}`;
export type ChangeCreditCardMutationFn = Apollo.MutationFunction<ChangeCreditCardMutation, ChangeCreditCardMutationVariables>;

/**
 * __useChangeCreditCardMutation__
 *
 * To run a mutation, you first call `useChangeCreditCardMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useChangeCreditCardMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [changeCreditCardMutation, { data, loading, error }] = useChangeCreditCardMutation({
 *   variables: {
 *      source: // value for 'source'
 *      ccLast4: // value for 'ccLast4'
 *   },
 * });
 */
export function useChangeCreditCardMutation(baseOptions?: Apollo.MutationHookOptions<ChangeCreditCardMutation, ChangeCreditCardMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ChangeCreditCardMutation, ChangeCreditCardMutationVariables>(ChangeCreditCardDocument, options);
      }
export type ChangeCreditCardMutationHookResult = ReturnType<typeof useChangeCreditCardMutation>;
export type ChangeCreditCardMutationResult = Apollo.MutationResult<ChangeCreditCardMutation>;
export type ChangeCreditCardMutationOptions = Apollo.BaseMutationOptions<ChangeCreditCardMutation, ChangeCreditCardMutationVariables>;
export const ChangePasswordDocument = gql`
    mutation ChangePassword($token: String!, $newPassword: String!) {
  changePassword(token: $token, newPassword: $newPassword) {
    ...RegularUserResponse
  }
}
    ${RegularUserResponseFragmentDoc}`;
export type ChangePasswordMutationFn = Apollo.MutationFunction<ChangePasswordMutation, ChangePasswordMutationVariables>;

/**
 * __useChangePasswordMutation__
 *
 * To run a mutation, you first call `useChangePasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useChangePasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [changePasswordMutation, { data, loading, error }] = useChangePasswordMutation({
 *   variables: {
 *      token: // value for 'token'
 *      newPassword: // value for 'newPassword'
 *   },
 * });
 */
export function useChangePasswordMutation(baseOptions?: Apollo.MutationHookOptions<ChangePasswordMutation, ChangePasswordMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ChangePasswordMutation, ChangePasswordMutationVariables>(ChangePasswordDocument, options);
      }
export type ChangePasswordMutationHookResult = ReturnType<typeof useChangePasswordMutation>;
export type ChangePasswordMutationResult = Apollo.MutationResult<ChangePasswordMutation>;
export type ChangePasswordMutationOptions = Apollo.BaseMutationOptions<ChangePasswordMutation, ChangePasswordMutationVariables>;
export const UpdateMailandFrequencyDocument = gql`
    mutation updateMailandFrequency($token: String!, $frequency: Float!, $email: String!) {
  updateMailandFrequency(token: $token, frequency: $frequency, email: $email) {
    ...RegularSubResponse
  }
}
    ${RegularSubResponseFragmentDoc}`;
export type UpdateMailandFrequencyMutationFn = Apollo.MutationFunction<UpdateMailandFrequencyMutation, UpdateMailandFrequencyMutationVariables>;

/**
 * __useUpdateMailandFrequencyMutation__
 *
 * To run a mutation, you first call `useUpdateMailandFrequencyMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateMailandFrequencyMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateMailandFrequencyMutation, { data, loading, error }] = useUpdateMailandFrequencyMutation({
 *   variables: {
 *      token: // value for 'token'
 *      frequency: // value for 'frequency'
 *      email: // value for 'email'
 *   },
 * });
 */
export function useUpdateMailandFrequencyMutation(baseOptions?: Apollo.MutationHookOptions<UpdateMailandFrequencyMutation, UpdateMailandFrequencyMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateMailandFrequencyMutation, UpdateMailandFrequencyMutationVariables>(UpdateMailandFrequencyDocument, options);
      }
export type UpdateMailandFrequencyMutationHookResult = ReturnType<typeof useUpdateMailandFrequencyMutation>;
export type UpdateMailandFrequencyMutationResult = Apollo.MutationResult<UpdateMailandFrequencyMutation>;
export type UpdateMailandFrequencyMutationOptions = Apollo.BaseMutationOptions<UpdateMailandFrequencyMutation, UpdateMailandFrequencyMutationVariables>;
export const CreateQuoteDocument = gql`
    mutation CreateQuote($input: QuoteInput!) {
  createQuote(input: $input) {
    ...RegularQuoteResponse
  }
}
    ${RegularQuoteResponseFragmentDoc}`;
export type CreateQuoteMutationFn = Apollo.MutationFunction<CreateQuoteMutation, CreateQuoteMutationVariables>;

/**
 * __useCreateQuoteMutation__
 *
 * To run a mutation, you first call `useCreateQuoteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateQuoteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createQuoteMutation, { data, loading, error }] = useCreateQuoteMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateQuoteMutation(baseOptions?: Apollo.MutationHookOptions<CreateQuoteMutation, CreateQuoteMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateQuoteMutation, CreateQuoteMutationVariables>(CreateQuoteDocument, options);
      }
export type CreateQuoteMutationHookResult = ReturnType<typeof useCreateQuoteMutation>;
export type CreateQuoteMutationResult = Apollo.MutationResult<CreateQuoteMutation>;
export type CreateQuoteMutationOptions = Apollo.BaseMutationOptions<CreateQuoteMutation, CreateQuoteMutationVariables>;
export const CreateSubDocument = gql`
    mutation CreateSub($input: SubInput!) {
  createSub(input: $input) {
    ...RegularSubResponse
  }
}
    ${RegularSubResponseFragmentDoc}`;
export type CreateSubMutationFn = Apollo.MutationFunction<CreateSubMutation, CreateSubMutationVariables>;

/**
 * __useCreateSubMutation__
 *
 * To run a mutation, you first call `useCreateSubMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateSubMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createSubMutation, { data, loading, error }] = useCreateSubMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateSubMutation(baseOptions?: Apollo.MutationHookOptions<CreateSubMutation, CreateSubMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateSubMutation, CreateSubMutationVariables>(CreateSubDocument, options);
      }
export type CreateSubMutationHookResult = ReturnType<typeof useCreateSubMutation>;
export type CreateSubMutationResult = Apollo.MutationResult<CreateSubMutation>;
export type CreateSubMutationOptions = Apollo.BaseMutationOptions<CreateSubMutation, CreateSubMutationVariables>;
export const CreateSubFromContactDocument = gql`
    mutation CreateSubFromContact($token: String!, $emails: String!) {
  createSubFromContact(token: $token, emails: $emails) {
    ...RegularSubResponse
  }
}
    ${RegularSubResponseFragmentDoc}`;
export type CreateSubFromContactMutationFn = Apollo.MutationFunction<CreateSubFromContactMutation, CreateSubFromContactMutationVariables>;

/**
 * __useCreateSubFromContactMutation__
 *
 * To run a mutation, you first call `useCreateSubFromContactMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateSubFromContactMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createSubFromContactMutation, { data, loading, error }] = useCreateSubFromContactMutation({
 *   variables: {
 *      token: // value for 'token'
 *      emails: // value for 'emails'
 *   },
 * });
 */
export function useCreateSubFromContactMutation(baseOptions?: Apollo.MutationHookOptions<CreateSubFromContactMutation, CreateSubFromContactMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateSubFromContactMutation, CreateSubFromContactMutationVariables>(CreateSubFromContactDocument, options);
      }
export type CreateSubFromContactMutationHookResult = ReturnType<typeof useCreateSubFromContactMutation>;
export type CreateSubFromContactMutationResult = Apollo.MutationResult<CreateSubFromContactMutation>;
export type CreateSubFromContactMutationOptions = Apollo.BaseMutationOptions<CreateSubFromContactMutation, CreateSubFromContactMutationVariables>;
export const CreateSubFromInviteDocument = gql`
    mutation CreateSubFromInvite($input: SubInviteInput!) {
  createSubFromInvite(input: $input) {
    ...RegularSubResponse
  }
}
    ${RegularSubResponseFragmentDoc}`;
export type CreateSubFromInviteMutationFn = Apollo.MutationFunction<CreateSubFromInviteMutation, CreateSubFromInviteMutationVariables>;

/**
 * __useCreateSubFromInviteMutation__
 *
 * To run a mutation, you first call `useCreateSubFromInviteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateSubFromInviteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createSubFromInviteMutation, { data, loading, error }] = useCreateSubFromInviteMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateSubFromInviteMutation(baseOptions?: Apollo.MutationHookOptions<CreateSubFromInviteMutation, CreateSubFromInviteMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateSubFromInviteMutation, CreateSubFromInviteMutationVariables>(CreateSubFromInviteDocument, options);
      }
export type CreateSubFromInviteMutationHookResult = ReturnType<typeof useCreateSubFromInviteMutation>;
export type CreateSubFromInviteMutationResult = Apollo.MutationResult<CreateSubFromInviteMutation>;
export type CreateSubFromInviteMutationOptions = Apollo.BaseMutationOptions<CreateSubFromInviteMutation, CreateSubFromInviteMutationVariables>;
export const CreateSubscriptionDocument = gql`
    mutation CreateSubscription($source: String!, $ccLast4: String!) {
  createSubscription(source: $source, ccLast4: $ccLast4) {
    ...ProfileUserResponse
  }
}
    ${ProfileUserResponseFragmentDoc}`;
export type CreateSubscriptionMutationFn = Apollo.MutationFunction<CreateSubscriptionMutation, CreateSubscriptionMutationVariables>;

/**
 * __useCreateSubscriptionMutation__
 *
 * To run a mutation, you first call `useCreateSubscriptionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateSubscriptionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createSubscriptionMutation, { data, loading, error }] = useCreateSubscriptionMutation({
 *   variables: {
 *      source: // value for 'source'
 *      ccLast4: // value for 'ccLast4'
 *   },
 * });
 */
export function useCreateSubscriptionMutation(baseOptions?: Apollo.MutationHookOptions<CreateSubscriptionMutation, CreateSubscriptionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateSubscriptionMutation, CreateSubscriptionMutationVariables>(CreateSubscriptionDocument, options);
      }
export type CreateSubscriptionMutationHookResult = ReturnType<typeof useCreateSubscriptionMutation>;
export type CreateSubscriptionMutationResult = Apollo.MutationResult<CreateSubscriptionMutation>;
export type CreateSubscriptionMutationOptions = Apollo.BaseMutationOptions<CreateSubscriptionMutation, CreateSubscriptionMutationVariables>;
export const CreateSubsfrwdpageDocument = gql`
    mutation CreateSubsfrwdpage($token: String!, $name: String!, $frequency: Float!, $email: String!) {
  createSubsfrwdpage(
    token: $token
    name: $name
    frequency: $frequency
    email: $email
  ) {
    ...RegularSubResponse
  }
}
    ${RegularSubResponseFragmentDoc}`;
export type CreateSubsfrwdpageMutationFn = Apollo.MutationFunction<CreateSubsfrwdpageMutation, CreateSubsfrwdpageMutationVariables>;

/**
 * __useCreateSubsfrwdpageMutation__
 *
 * To run a mutation, you first call `useCreateSubsfrwdpageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateSubsfrwdpageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createSubsfrwdpageMutation, { data, loading, error }] = useCreateSubsfrwdpageMutation({
 *   variables: {
 *      token: // value for 'token'
 *      name: // value for 'name'
 *      frequency: // value for 'frequency'
 *      email: // value for 'email'
 *   },
 * });
 */
export function useCreateSubsfrwdpageMutation(baseOptions?: Apollo.MutationHookOptions<CreateSubsfrwdpageMutation, CreateSubsfrwdpageMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateSubsfrwdpageMutation, CreateSubsfrwdpageMutationVariables>(CreateSubsfrwdpageDocument, options);
      }
export type CreateSubsfrwdpageMutationHookResult = ReturnType<typeof useCreateSubsfrwdpageMutation>;
export type CreateSubsfrwdpageMutationResult = Apollo.MutationResult<CreateSubsfrwdpageMutation>;
export type CreateSubsfrwdpageMutationOptions = Apollo.BaseMutationOptions<CreateSubsfrwdpageMutation, CreateSubsfrwdpageMutationVariables>;
export const DeleteQuoteDocument = gql`
    mutation DeleteQuote($id: Int!) {
  deleteQuote(id: $id)
}
    `;
export type DeleteQuoteMutationFn = Apollo.MutationFunction<DeleteQuoteMutation, DeleteQuoteMutationVariables>;

/**
 * __useDeleteQuoteMutation__
 *
 * To run a mutation, you first call `useDeleteQuoteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteQuoteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteQuoteMutation, { data, loading, error }] = useDeleteQuoteMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteQuoteMutation(baseOptions?: Apollo.MutationHookOptions<DeleteQuoteMutation, DeleteQuoteMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteQuoteMutation, DeleteQuoteMutationVariables>(DeleteQuoteDocument, options);
      }
export type DeleteQuoteMutationHookResult = ReturnType<typeof useDeleteQuoteMutation>;
export type DeleteQuoteMutationResult = Apollo.MutationResult<DeleteQuoteMutation>;
export type DeleteQuoteMutationOptions = Apollo.BaseMutationOptions<DeleteQuoteMutation, DeleteQuoteMutationVariables>;
export const DeleteSubDocument = gql`
    mutation DeleteSub($id: Int!) {
  deleteSub(id: $id)
}
    `;
export type DeleteSubMutationFn = Apollo.MutationFunction<DeleteSubMutation, DeleteSubMutationVariables>;

/**
 * __useDeleteSubMutation__
 *
 * To run a mutation, you first call `useDeleteSubMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteSubMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteSubMutation, { data, loading, error }] = useDeleteSubMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteSubMutation(baseOptions?: Apollo.MutationHookOptions<DeleteSubMutation, DeleteSubMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteSubMutation, DeleteSubMutationVariables>(DeleteSubDocument, options);
      }
export type DeleteSubMutationHookResult = ReturnType<typeof useDeleteSubMutation>;
export type DeleteSubMutationResult = Apollo.MutationResult<DeleteSubMutation>;
export type DeleteSubMutationOptions = Apollo.BaseMutationOptions<DeleteSubMutation, DeleteSubMutationVariables>;
export const DeleteTemplateDocument = gql`
    mutation DeleteTemplate($id: Int!) {
  deleteTemplate(id: $id)
}
    `;
export type DeleteTemplateMutationFn = Apollo.MutationFunction<DeleteTemplateMutation, DeleteTemplateMutationVariables>;

/**
 * __useDeleteTemplateMutation__
 *
 * To run a mutation, you first call `useDeleteTemplateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteTemplateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteTemplateMutation, { data, loading, error }] = useDeleteTemplateMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteTemplateMutation(baseOptions?: Apollo.MutationHookOptions<DeleteTemplateMutation, DeleteTemplateMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteTemplateMutation, DeleteTemplateMutationVariables>(DeleteTemplateDocument, options);
      }
export type DeleteTemplateMutationHookResult = ReturnType<typeof useDeleteTemplateMutation>;
export type DeleteTemplateMutationResult = Apollo.MutationResult<DeleteTemplateMutation>;
export type DeleteTemplateMutationOptions = Apollo.BaseMutationOptions<DeleteTemplateMutation, DeleteTemplateMutationVariables>;
export const ForgotPasswordDocument = gql`
    mutation ForgotPassword($email: String!) {
  forgotPassword(email: $email)
}
    `;
export type ForgotPasswordMutationFn = Apollo.MutationFunction<ForgotPasswordMutation, ForgotPasswordMutationVariables>;

/**
 * __useForgotPasswordMutation__
 *
 * To run a mutation, you first call `useForgotPasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useForgotPasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [forgotPasswordMutation, { data, loading, error }] = useForgotPasswordMutation({
 *   variables: {
 *      email: // value for 'email'
 *   },
 * });
 */
export function useForgotPasswordMutation(baseOptions?: Apollo.MutationHookOptions<ForgotPasswordMutation, ForgotPasswordMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ForgotPasswordMutation, ForgotPasswordMutationVariables>(ForgotPasswordDocument, options);
      }
export type ForgotPasswordMutationHookResult = ReturnType<typeof useForgotPasswordMutation>;
export type ForgotPasswordMutationResult = Apollo.MutationResult<ForgotPasswordMutation>;
export type ForgotPasswordMutationOptions = Apollo.BaseMutationOptions<ForgotPasswordMutation, ForgotPasswordMutationVariables>;
export const LoginDocument = gql`
    mutation Login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    ...RegularUserResponse
  }
}
    ${RegularUserResponseFragmentDoc}`;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;
export type LogoutMutationFn = Apollo.MutationFunction<LogoutMutation, LogoutMutationVariables>;

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutMutation(baseOptions?: Apollo.MutationHookOptions<LogoutMutation, LogoutMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument, options);
      }
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = Apollo.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = Apollo.BaseMutationOptions<LogoutMutation, LogoutMutationVariables>;
export const ReSubribeUserExistingCcDocument = gql`
    mutation ReSubribeUserExistingCC {
  reSubribeUserExistingCC {
    ...ProfileUserResponse
  }
}
    ${ProfileUserResponseFragmentDoc}`;
export type ReSubribeUserExistingCcMutationFn = Apollo.MutationFunction<ReSubribeUserExistingCcMutation, ReSubribeUserExistingCcMutationVariables>;

/**
 * __useReSubribeUserExistingCcMutation__
 *
 * To run a mutation, you first call `useReSubribeUserExistingCcMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useReSubribeUserExistingCcMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [reSubribeUserExistingCcMutation, { data, loading, error }] = useReSubribeUserExistingCcMutation({
 *   variables: {
 *   },
 * });
 */
export function useReSubribeUserExistingCcMutation(baseOptions?: Apollo.MutationHookOptions<ReSubribeUserExistingCcMutation, ReSubribeUserExistingCcMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ReSubribeUserExistingCcMutation, ReSubribeUserExistingCcMutationVariables>(ReSubribeUserExistingCcDocument, options);
      }
export type ReSubribeUserExistingCcMutationHookResult = ReturnType<typeof useReSubribeUserExistingCcMutation>;
export type ReSubribeUserExistingCcMutationResult = Apollo.MutationResult<ReSubribeUserExistingCcMutation>;
export type ReSubribeUserExistingCcMutationOptions = Apollo.BaseMutationOptions<ReSubribeUserExistingCcMutation, ReSubribeUserExistingCcMutationVariables>;
export const ReSubribeUserNewCcDocument = gql`
    mutation ReSubribeUserNewCC($source: String!, $ccLast4: String!) {
  reSubribeUserNewCC(source: $source, ccLast4: $ccLast4) {
    ...ProfileUserResponse
  }
}
    ${ProfileUserResponseFragmentDoc}`;
export type ReSubribeUserNewCcMutationFn = Apollo.MutationFunction<ReSubribeUserNewCcMutation, ReSubribeUserNewCcMutationVariables>;

/**
 * __useReSubribeUserNewCcMutation__
 *
 * To run a mutation, you first call `useReSubribeUserNewCcMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useReSubribeUserNewCcMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [reSubribeUserNewCcMutation, { data, loading, error }] = useReSubribeUserNewCcMutation({
 *   variables: {
 *      source: // value for 'source'
 *      ccLast4: // value for 'ccLast4'
 *   },
 * });
 */
export function useReSubribeUserNewCcMutation(baseOptions?: Apollo.MutationHookOptions<ReSubribeUserNewCcMutation, ReSubribeUserNewCcMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ReSubribeUserNewCcMutation, ReSubribeUserNewCcMutationVariables>(ReSubribeUserNewCcDocument, options);
      }
export type ReSubribeUserNewCcMutationHookResult = ReturnType<typeof useReSubribeUserNewCcMutation>;
export type ReSubribeUserNewCcMutationResult = Apollo.MutationResult<ReSubribeUserNewCcMutation>;
export type ReSubribeUserNewCcMutationOptions = Apollo.BaseMutationOptions<ReSubribeUserNewCcMutation, ReSubribeUserNewCcMutationVariables>;
export const RegisterDocument = gql`
    mutation Register($options: UsernamePasswordInput!) {
  register(options: $options) {
    ...RegularUserResponse
  }
}
    ${RegularUserResponseFragmentDoc}`;
export type RegisterMutationFn = Apollo.MutationFunction<RegisterMutation, RegisterMutationVariables>;

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      options: // value for 'options'
 *   },
 * });
 */
export function useRegisterMutation(baseOptions?: Apollo.MutationHookOptions<RegisterMutation, RegisterMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument, options);
      }
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = Apollo.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = Apollo.BaseMutationOptions<RegisterMutation, RegisterMutationVariables>;
export const CreateTemplatesDocument = gql`
    mutation createTemplates($input: templateInput!) {
  createTemplates(input: $input) {
    ...RegularTemplateResponse
  }
}
    ${RegularTemplateResponseFragmentDoc}`;
export type CreateTemplatesMutationFn = Apollo.MutationFunction<CreateTemplatesMutation, CreateTemplatesMutationVariables>;

/**
 * __useCreateTemplatesMutation__
 *
 * To run a mutation, you first call `useCreateTemplatesMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateTemplatesMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createTemplatesMutation, { data, loading, error }] = useCreateTemplatesMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateTemplatesMutation(baseOptions?: Apollo.MutationHookOptions<CreateTemplatesMutation, CreateTemplatesMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateTemplatesMutation, CreateTemplatesMutationVariables>(CreateTemplatesDocument, options);
      }
export type CreateTemplatesMutationHookResult = ReturnType<typeof useCreateTemplatesMutation>;
export type CreateTemplatesMutationResult = Apollo.MutationResult<CreateTemplatesMutation>;
export type CreateTemplatesMutationOptions = Apollo.BaseMutationOptions<CreateTemplatesMutation, CreateTemplatesMutationVariables>;
export const UnsubscribeSubDocument = gql`
    mutation UnsubscribeSub($token: String!) {
  unsubscribeSub(token: $token) {
    ...RegularSubResponse
  }
}
    ${RegularSubResponseFragmentDoc}`;
export type UnsubscribeSubMutationFn = Apollo.MutationFunction<UnsubscribeSubMutation, UnsubscribeSubMutationVariables>;

/**
 * __useUnsubscribeSubMutation__
 *
 * To run a mutation, you first call `useUnsubscribeSubMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUnsubscribeSubMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [unsubscribeSubMutation, { data, loading, error }] = useUnsubscribeSubMutation({
 *   variables: {
 *      token: // value for 'token'
 *   },
 * });
 */
export function useUnsubscribeSubMutation(baseOptions?: Apollo.MutationHookOptions<UnsubscribeSubMutation, UnsubscribeSubMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UnsubscribeSubMutation, UnsubscribeSubMutationVariables>(UnsubscribeSubDocument, options);
      }
export type UnsubscribeSubMutationHookResult = ReturnType<typeof useUnsubscribeSubMutation>;
export type UnsubscribeSubMutationResult = Apollo.MutationResult<UnsubscribeSubMutation>;
export type UnsubscribeSubMutationOptions = Apollo.BaseMutationOptions<UnsubscribeSubMutation, UnsubscribeSubMutationVariables>;
export const UpdateQuoteDocument = gql`
    mutation UpdateQuote($id: Int!, $name: String!, $catagory: String!) {
  updateQuote(id: $id, name: $name, catagory: $catagory) {
    ...RegularQuoteResponse
  }
}
    ${RegularQuoteResponseFragmentDoc}`;
export type UpdateQuoteMutationFn = Apollo.MutationFunction<UpdateQuoteMutation, UpdateQuoteMutationVariables>;

/**
 * __useUpdateQuoteMutation__
 *
 * To run a mutation, you first call `useUpdateQuoteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateQuoteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateQuoteMutation, { data, loading, error }] = useUpdateQuoteMutation({
 *   variables: {
 *      id: // value for 'id'
 *      name: // value for 'name'
 *      catagory: // value for 'catagory'
 *   },
 * });
 */
export function useUpdateQuoteMutation(baseOptions?: Apollo.MutationHookOptions<UpdateQuoteMutation, UpdateQuoteMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateQuoteMutation, UpdateQuoteMutationVariables>(UpdateQuoteDocument, options);
      }
export type UpdateQuoteMutationHookResult = ReturnType<typeof useUpdateQuoteMutation>;
export type UpdateQuoteMutationResult = Apollo.MutationResult<UpdateQuoteMutation>;
export type UpdateQuoteMutationOptions = Apollo.BaseMutationOptions<UpdateQuoteMutation, UpdateQuoteMutationVariables>;
export const UpdateSubDocument = gql`
    mutation UpdateSub($id: Int!, $name: String!, $email: String!, $subscribed: Boolean!) {
  updateSub(id: $id, name: $name, email: $email, subscribed: $subscribed) {
    ...RegularSubResponse
  }
}
    ${RegularSubResponseFragmentDoc}`;
export type UpdateSubMutationFn = Apollo.MutationFunction<UpdateSubMutation, UpdateSubMutationVariables>;

/**
 * __useUpdateSubMutation__
 *
 * To run a mutation, you first call `useUpdateSubMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateSubMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateSubMutation, { data, loading, error }] = useUpdateSubMutation({
 *   variables: {
 *      id: // value for 'id'
 *      name: // value for 'name'
 *      email: // value for 'email'
 *      subscribed: // value for 'subscribed'
 *   },
 * });
 */
export function useUpdateSubMutation(baseOptions?: Apollo.MutationHookOptions<UpdateSubMutation, UpdateSubMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateSubMutation, UpdateSubMutationVariables>(UpdateSubDocument, options);
      }
export type UpdateSubMutationHookResult = ReturnType<typeof useUpdateSubMutation>;
export type UpdateSubMutationResult = Apollo.MutationResult<UpdateSubMutation>;
export type UpdateSubMutationOptions = Apollo.BaseMutationOptions<UpdateSubMutation, UpdateSubMutationVariables>;
export const UpdateUserDocument = gql`
    mutation UpdateUser($input: UserInput!) {
  updateUser(input: $input) {
    ...ProfileUserResponse
  }
}
    ${ProfileUserResponseFragmentDoc}`;
export type UpdateUserMutationFn = Apollo.MutationFunction<UpdateUserMutation, UpdateUserMutationVariables>;

/**
 * __useUpdateUserMutation__
 *
 * To run a mutation, you first call `useUpdateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserMutation, { data, loading, error }] = useUpdateUserMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateUserMutation(baseOptions?: Apollo.MutationHookOptions<UpdateUserMutation, UpdateUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateUserMutation, UpdateUserMutationVariables>(UpdateUserDocument, options);
      }
export type UpdateUserMutationHookResult = ReturnType<typeof useUpdateUserMutation>;
export type UpdateUserMutationResult = Apollo.MutationResult<UpdateUserMutation>;
export type UpdateUserMutationOptions = Apollo.BaseMutationOptions<UpdateUserMutation, UpdateUserMutationVariables>;
export const UpdateUserAuthDocument = gql`
    mutation UpdateUserAuth($input: UserAuthInput!) {
  updateAuth(input: $input) {
    ...RegularUserResponse
  }
}
    ${RegularUserResponseFragmentDoc}`;
export type UpdateUserAuthMutationFn = Apollo.MutationFunction<UpdateUserAuthMutation, UpdateUserAuthMutationVariables>;

/**
 * __useUpdateUserAuthMutation__
 *
 * To run a mutation, you first call `useUpdateUserAuthMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserAuthMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserAuthMutation, { data, loading, error }] = useUpdateUserAuthMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateUserAuthMutation(baseOptions?: Apollo.MutationHookOptions<UpdateUserAuthMutation, UpdateUserAuthMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateUserAuthMutation, UpdateUserAuthMutationVariables>(UpdateUserAuthDocument, options);
      }
export type UpdateUserAuthMutationHookResult = ReturnType<typeof useUpdateUserAuthMutation>;
export type UpdateUserAuthMutationResult = Apollo.MutationResult<UpdateUserAuthMutation>;
export type UpdateUserAuthMutationOptions = Apollo.BaseMutationOptions<UpdateUserAuthMutation, UpdateUserAuthMutationVariables>;
export const AllsubsDocument = gql`
    query Allsubs {
  Allsubs {
    ...AllsubSnippet
  }
}
    ${AllsubSnippetFragmentDoc}`;

/**
 * __useAllsubsQuery__
 *
 * To run a query within a React component, call `useAllsubsQuery` and pass it any options that fit your needs.
 * When your component renders, `useAllsubsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAllsubsQuery({
 *   variables: {
 *   },
 * });
 */
export function useAllsubsQuery(baseOptions?: Apollo.QueryHookOptions<AllsubsQuery, AllsubsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AllsubsQuery, AllsubsQueryVariables>(AllsubsDocument, options);
      }
export function useAllsubsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AllsubsQuery, AllsubsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AllsubsQuery, AllsubsQueryVariables>(AllsubsDocument, options);
        }
export type AllsubsQueryHookResult = ReturnType<typeof useAllsubsQuery>;
export type AllsubsLazyQueryHookResult = ReturnType<typeof useAllsubsLazyQuery>;
export type AllsubsQueryResult = Apollo.QueryResult<AllsubsQuery, AllsubsQueryVariables>;
export const AllsubsIdDocument = gql`
    query AllsubsId($Id: Int!) {
  AllsubsId(Id: $Id) {
    ...AllsubSnippet
  }
}
    ${AllsubSnippetFragmentDoc}`;

/**
 * __useAllsubsIdQuery__
 *
 * To run a query within a React component, call `useAllsubsIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useAllsubsIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAllsubsIdQuery({
 *   variables: {
 *      Id: // value for 'Id'
 *   },
 * });
 */
export function useAllsubsIdQuery(baseOptions: Apollo.QueryHookOptions<AllsubsIdQuery, AllsubsIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AllsubsIdQuery, AllsubsIdQueryVariables>(AllsubsIdDocument, options);
      }
export function useAllsubsIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AllsubsIdQuery, AllsubsIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AllsubsIdQuery, AllsubsIdQueryVariables>(AllsubsIdDocument, options);
        }
export type AllsubsIdQueryHookResult = ReturnType<typeof useAllsubsIdQuery>;
export type AllsubsIdLazyQueryHookResult = ReturnType<typeof useAllsubsIdLazyQuery>;
export type AllsubsIdQueryResult = Apollo.QueryResult<AllsubsIdQuery, AllsubsIdQueryVariables>;
export const MailActivityByIdDocument = gql`
    query mailActivityById($id: Int!) {
  mailActivityById(id: $id) {
    ...ActivitySnippet
  }
}
    ${ActivitySnippetFragmentDoc}`;

/**
 * __useMailActivityByIdQuery__
 *
 * To run a query within a React component, call `useMailActivityByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useMailActivityByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMailActivityByIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useMailActivityByIdQuery(baseOptions: Apollo.QueryHookOptions<MailActivityByIdQuery, MailActivityByIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MailActivityByIdQuery, MailActivityByIdQueryVariables>(MailActivityByIdDocument, options);
      }
export function useMailActivityByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MailActivityByIdQuery, MailActivityByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MailActivityByIdQuery, MailActivityByIdQueryVariables>(MailActivityByIdDocument, options);
        }
export type MailActivityByIdQueryHookResult = ReturnType<typeof useMailActivityByIdQuery>;
export type MailActivityByIdLazyQueryHookResult = ReturnType<typeof useMailActivityByIdLazyQuery>;
export type MailActivityByIdQueryResult = Apollo.QueryResult<MailActivityByIdQuery, MailActivityByIdQueryVariables>;
export const PaginatedActivityDocument = gql`
    query paginatedActivity($limit: Int!, $cursor: String) {
  PaginatedmailActivity(limit: $limit, cursor: $cursor) {
    hasMore
    PaginatedmailActivity {
      ...PaginatedActivitySnippet
    }
  }
}
    ${PaginatedActivitySnippetFragmentDoc}`;

/**
 * __usePaginatedActivityQuery__
 *
 * To run a query within a React component, call `usePaginatedActivityQuery` and pass it any options that fit your needs.
 * When your component renders, `usePaginatedActivityQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePaginatedActivityQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *      cursor: // value for 'cursor'
 *   },
 * });
 */
export function usePaginatedActivityQuery(baseOptions: Apollo.QueryHookOptions<PaginatedActivityQuery, PaginatedActivityQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PaginatedActivityQuery, PaginatedActivityQueryVariables>(PaginatedActivityDocument, options);
      }
export function usePaginatedActivityLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PaginatedActivityQuery, PaginatedActivityQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PaginatedActivityQuery, PaginatedActivityQueryVariables>(PaginatedActivityDocument, options);
        }
export type PaginatedActivityQueryHookResult = ReturnType<typeof usePaginatedActivityQuery>;
export type PaginatedActivityLazyQueryHookResult = ReturnType<typeof usePaginatedActivityLazyQuery>;
export type PaginatedActivityQueryResult = Apollo.QueryResult<PaginatedActivityQuery, PaginatedActivityQueryVariables>;
export const MailActivitybyIdDocument = gql`
    query mailActivitybyId($limit: Int!, $cursor: String, $id: Int!) {
  PaginatedmailActivitybyId(limit: $limit, cursor: $cursor, id: $id) {
    hasMore
    PaginatedmailActivity {
      ...PaginatedActivitySnippet
    }
  }
}
    ${PaginatedActivitySnippetFragmentDoc}`;

/**
 * __useMailActivitybyIdQuery__
 *
 * To run a query within a React component, call `useMailActivitybyIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useMailActivitybyIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMailActivitybyIdQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *      cursor: // value for 'cursor'
 *      id: // value for 'id'
 *   },
 * });
 */
export function useMailActivitybyIdQuery(baseOptions: Apollo.QueryHookOptions<MailActivitybyIdQuery, MailActivitybyIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MailActivitybyIdQuery, MailActivitybyIdQueryVariables>(MailActivitybyIdDocument, options);
      }
export function useMailActivitybyIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MailActivitybyIdQuery, MailActivitybyIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MailActivitybyIdQuery, MailActivitybyIdQueryVariables>(MailActivitybyIdDocument, options);
        }
export type MailActivitybyIdQueryHookResult = ReturnType<typeof useMailActivitybyIdQuery>;
export type MailActivitybyIdLazyQueryHookResult = ReturnType<typeof useMailActivitybyIdLazyQuery>;
export type MailActivitybyIdQueryResult = Apollo.QueryResult<MailActivitybyIdQuery, MailActivitybyIdQueryVariables>;
export const QuotesDocument = gql`
    query Quotes($limit: Int!, $cursor: String) {
  quotes(limit: $limit, cursor: $cursor) {
    hasMore
    quotes {
      ...QuoteSnippet
    }
  }
}
    ${QuoteSnippetFragmentDoc}`;

/**
 * __useQuotesQuery__
 *
 * To run a query within a React component, call `useQuotesQuery` and pass it any options that fit your needs.
 * When your component renders, `useQuotesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useQuotesQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *      cursor: // value for 'cursor'
 *   },
 * });
 */
export function useQuotesQuery(baseOptions: Apollo.QueryHookOptions<QuotesQuery, QuotesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<QuotesQuery, QuotesQueryVariables>(QuotesDocument, options);
      }
export function useQuotesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<QuotesQuery, QuotesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<QuotesQuery, QuotesQueryVariables>(QuotesDocument, options);
        }
export type QuotesQueryHookResult = ReturnType<typeof useQuotesQuery>;
export type QuotesLazyQueryHookResult = ReturnType<typeof useQuotesLazyQuery>;
export type QuotesQueryResult = Apollo.QueryResult<QuotesQuery, QuotesQueryVariables>;
export const SubsDocument = gql`
    query Subs($limit: Int!, $cursor: String) {
  subs(limit: $limit, cursor: $cursor) {
    hasMore
    subs {
      ...SubSnippet
    }
  }
}
    ${SubSnippetFragmentDoc}`;

/**
 * __useSubsQuery__
 *
 * To run a query within a React component, call `useSubsQuery` and pass it any options that fit your needs.
 * When your component renders, `useSubsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSubsQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *      cursor: // value for 'cursor'
 *   },
 * });
 */
export function useSubsQuery(baseOptions: Apollo.QueryHookOptions<SubsQuery, SubsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SubsQuery, SubsQueryVariables>(SubsDocument, options);
      }
export function useSubsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SubsQuery, SubsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SubsQuery, SubsQueryVariables>(SubsDocument, options);
        }
export type SubsQueryHookResult = ReturnType<typeof useSubsQuery>;
export type SubsLazyQueryHookResult = ReturnType<typeof useSubsLazyQuery>;
export type SubsQueryResult = Apollo.QueryResult<SubsQuery, SubsQueryVariables>;
export const AlluserDocument = gql`
    query alluser {
  alluser {
    ...alluserSnippet
  }
}
    ${AlluserSnippetFragmentDoc}`;

/**
 * __useAlluserQuery__
 *
 * To run a query within a React component, call `useAlluserQuery` and pass it any options that fit your needs.
 * When your component renders, `useAlluserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAlluserQuery({
 *   variables: {
 *   },
 * });
 */
export function useAlluserQuery(baseOptions?: Apollo.QueryHookOptions<AlluserQuery, AlluserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AlluserQuery, AlluserQueryVariables>(AlluserDocument, options);
      }
export function useAlluserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AlluserQuery, AlluserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AlluserQuery, AlluserQueryVariables>(AlluserDocument, options);
        }
export type AlluserQueryHookResult = ReturnType<typeof useAlluserQuery>;
export type AlluserLazyQueryHookResult = ReturnType<typeof useAlluserLazyQuery>;
export type AlluserQueryResult = Apollo.QueryResult<AlluserQuery, AlluserQueryVariables>;
export const MailActivityDocument = gql`
    query mailActivity {
  mailActivity {
    ...ActivitySnippet
  }
}
    ${ActivitySnippetFragmentDoc}`;

/**
 * __useMailActivityQuery__
 *
 * To run a query within a React component, call `useMailActivityQuery` and pass it any options that fit your needs.
 * When your component renders, `useMailActivityQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMailActivityQuery({
 *   variables: {
 *   },
 * });
 */
export function useMailActivityQuery(baseOptions?: Apollo.QueryHookOptions<MailActivityQuery, MailActivityQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MailActivityQuery, MailActivityQueryVariables>(MailActivityDocument, options);
      }
export function useMailActivityLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MailActivityQuery, MailActivityQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MailActivityQuery, MailActivityQueryVariables>(MailActivityDocument, options);
        }
export type MailActivityQueryHookResult = ReturnType<typeof useMailActivityQuery>;
export type MailActivityLazyQueryHookResult = ReturnType<typeof useMailActivityLazyQuery>;
export type MailActivityQueryResult = Apollo.QueryResult<MailActivityQuery, MailActivityQueryVariables>;
export const MeDocument = gql`
    query Me {
  me {
    ...RegularUser
  }
}
    ${RegularUserFragmentDoc}`;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, options);
      }
export function useMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, options);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;
export const ProfileDocument = gql`
    query Profile {
  me {
    ...ProfileUser
  }
}
    ${ProfileUserFragmentDoc}`;

/**
 * __useProfileQuery__
 *
 * To run a query within a React component, call `useProfileQuery` and pass it any options that fit your needs.
 * When your component renders, `useProfileQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProfileQuery({
 *   variables: {
 *   },
 * });
 */
export function useProfileQuery(baseOptions?: Apollo.QueryHookOptions<ProfileQuery, ProfileQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ProfileQuery, ProfileQueryVariables>(ProfileDocument, options);
      }
export function useProfileLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ProfileQuery, ProfileQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ProfileQuery, ProfileQueryVariables>(ProfileDocument, options);
        }
export type ProfileQueryHookResult = ReturnType<typeof useProfileQuery>;
export type ProfileLazyQueryHookResult = ReturnType<typeof useProfileLazyQuery>;
export type ProfileQueryResult = Apollo.QueryResult<ProfileQuery, ProfileQueryVariables>;
export const SubbytokenDocument = gql`
    query subbytoken($token: String!) {
  subbytoken(token: $token) {
    ...SubSnippet
  }
}
    ${SubSnippetFragmentDoc}`;

/**
 * __useSubbytokenQuery__
 *
 * To run a query within a React component, call `useSubbytokenQuery` and pass it any options that fit your needs.
 * When your component renders, `useSubbytokenQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSubbytokenQuery({
 *   variables: {
 *      token: // value for 'token'
 *   },
 * });
 */
export function useSubbytokenQuery(baseOptions: Apollo.QueryHookOptions<SubbytokenQuery, SubbytokenQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SubbytokenQuery, SubbytokenQueryVariables>(SubbytokenDocument, options);
      }
export function useSubbytokenLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SubbytokenQuery, SubbytokenQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SubbytokenQuery, SubbytokenQueryVariables>(SubbytokenDocument, options);
        }
export type SubbytokenQueryHookResult = ReturnType<typeof useSubbytokenQuery>;
export type SubbytokenLazyQueryHookResult = ReturnType<typeof useSubbytokenLazyQuery>;
export type SubbytokenQueryResult = Apollo.QueryResult<SubbytokenQuery, SubbytokenQueryVariables>;
export const GetAlltemplatesDocument = gql`
    query GetAlltemplates($limit: Int!, $cursor: String) {
  getAlltemplates(limit: $limit, cursor: $cursor) {
    hasMore
    templates {
      ...TemplatesSnippet
    }
  }
}
    ${TemplatesSnippetFragmentDoc}`;

/**
 * __useGetAlltemplatesQuery__
 *
 * To run a query within a React component, call `useGetAlltemplatesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAlltemplatesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAlltemplatesQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *      cursor: // value for 'cursor'
 *   },
 * });
 */
export function useGetAlltemplatesQuery(baseOptions: Apollo.QueryHookOptions<GetAlltemplatesQuery, GetAlltemplatesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAlltemplatesQuery, GetAlltemplatesQueryVariables>(GetAlltemplatesDocument, options);
      }
export function useGetAlltemplatesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAlltemplatesQuery, GetAlltemplatesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAlltemplatesQuery, GetAlltemplatesQueryVariables>(GetAlltemplatesDocument, options);
        }
export type GetAlltemplatesQueryHookResult = ReturnType<typeof useGetAlltemplatesQuery>;
export type GetAlltemplatesLazyQueryHookResult = ReturnType<typeof useGetAlltemplatesLazyQuery>;
export type GetAlltemplatesQueryResult = Apollo.QueryResult<GetAlltemplatesQuery, GetAlltemplatesQueryVariables>;