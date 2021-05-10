import { InputType, Field } from 'type-graphql';
@InputType()
export class SubInviteInput {
  @Field()
  name: string;
  @Field()
  email: string;
  @Field()
  frequency: number;
  @Field()
  token: string;
}
