import { Max } from "class-validator";

export class CreateJournalDto {
  @Max(64)
  name: string;
  @Max(512)
  description: string;
  @Max(1)
  icon: string;
}
