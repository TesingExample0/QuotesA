import { InputType, Field } from 'type-graphql';
@InputType()
export class SubInput {
  @Field()
  name: string;
  @Field()
  email: string;
}
