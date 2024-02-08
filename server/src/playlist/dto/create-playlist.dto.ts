import { ApiProperty } from "@nestjs/swagger";
import { IsString, Length } from "class-validator";

export class CreatePlaylistDto {
  @ApiProperty({example: 'MyAwasomePlaylist', description: 'Playlist name'})
  @IsString({message: 'must be a string'})
  @Length(2, 24, {message: 'From 2 to 24 symbols'})
  readonly name;
}
