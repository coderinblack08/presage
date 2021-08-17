import { ArgsType, PartialType } from "@nestjs/graphql";
import { CreateJournalArgs } from "./create-journal.args";

@ArgsType()
export class UpdateJournalArgs extends PartialType(CreateJournalArgs) {}
