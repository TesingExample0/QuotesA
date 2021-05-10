import { Profession } from './../entities/User';
import { InputType, Field } from 'type-graphql';

@InputType()
export class UserInput {
  @Field()
  name: string;

  @Field()
  address: string;

  @Field()
  city: string;

  @Field()
  state: string;

  @Field()
  zip: string;

  @Field()
  catagory: Profession;

  @Field()
  title: string;

  @Field()
  company: string;

  @Field()
  twitter: string;

  @Field()
  facebook: string;

  @Field()
  linkedIn: string;

  @Field()
  website: string;

  @Field()
  DefaultTemplates: boolean
}
