import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  Length,
  Matches,
} from "class-validator";

export class CreateUserDto {
  @IsNotEmpty()
  @Length(1, 50)
  @Matches(/^[\-a-zA-Z0-9]+$/)
  readonly username: string;

  @IsOptional()
  @IsEmail()
  readonly email: string;

  @IsNotEmpty()
  @Length(1, 50)
  readonly displayName: string;

  @IsOptional()
  @Length(1, 500)
  readonly bio: string | null;

  @IsUrl()
  readonly profilePicture: string | null;

  @IsString()
  readonly googleId: string | null;
}
