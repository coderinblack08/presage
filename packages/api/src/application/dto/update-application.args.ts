import { InputType, PartialType } from "@nestjs/graphql";
import { CreateApplicationInput } from "./create-application.args";

@InputType()
export class UpdateApplicationArgs extends PartialType(
  CreateApplicationInput
) {}
