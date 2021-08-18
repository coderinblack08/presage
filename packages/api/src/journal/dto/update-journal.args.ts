import { InputType, PartialType } from "@nestjs/graphql";
import { CreateJournalArgs } from "./create-journal.args";

@InputType()
export class UpdateJournalArgs extends PartialType(CreateJournalArgs) {}
