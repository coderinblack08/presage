import { Field, InputType, Int } from "type-graphql";

@InputType()
export class SoundbiteArgs {
  @Field()
  title: string;

  @Field(() => String, { nullable: true })
  description?: string;

  @Field(() => Int)
  length: number;
}
