import {ObjectId} from "mongoose";
import { ApiProperty } from "@nestjs/swagger";
import { IsString, Length } from "class-validator";

export class CreateCommentDto {
  @ApiProperty({example: 'K1nzza', description: 'User nickname'})
  @IsString({message: 'must be a string'})
  @Length(3, 15, {message: 'From 3 to 15 symbols'})
  readonly username: string;

  @ApiProperty({example: 'Wow! very good song, thank you', description: 'Comment text'})
  @IsString({message: 'must be a string'})
  @Length(1, 500, {message: 'From 1 to 500 symbols'})
  readonly text: string;

  @ApiProperty({example: '5f9f1c9c9c9c9c9c9c9c9c9c', description: 'Song id'})
  readonly songId: ObjectId;
}