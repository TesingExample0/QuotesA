import { InputType, Field } from 'type-graphql';
@InputType()
export class UserAuthInput {
  @Field({ nullable: true })
  email: string;
  @Field({ nullable: true })
  password: string;
  @Field({ nullable: true })
  confirm: string;
}
