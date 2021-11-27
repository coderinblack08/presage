import {
  ArrayMaxSize,
  IsArray,
  IsObject,
  IsUrl,
  MaxLength,
} from "class-validator";

export class UpdateArticleDto {
  @MaxLength(512)
  title?: string;

  @IsObject()
  editorJSON?: object;

  @MaxLength(1024)
  description?: string;

  @IsArray()
  @ArrayMaxSize(5)
  tags?: string[];

  @IsUrl()
  canonical?: string;
}
