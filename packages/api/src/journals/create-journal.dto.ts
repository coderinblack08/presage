import { IsNotEmpty, MaxLength } from "class-validator";

export class CreateJournalDto {
  @MaxLength(64)
  @IsNotEmpty()
  name: string;

  @MaxLength(512)
  @IsNotEmpty()
  description: string;

  @MaxLength(1)
  @IsNotEmpty()
  icon: string;
}
