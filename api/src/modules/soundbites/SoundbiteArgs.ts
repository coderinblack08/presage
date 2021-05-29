import { Field, InputType } from "type-graphql";

@InputType()
export class SoundbiteArgs {
  @Field()
  title: string;

  @Field()
  description: string;
}
