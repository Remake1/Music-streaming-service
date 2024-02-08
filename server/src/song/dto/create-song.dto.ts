import { ApiProperty } from "@nestjs/swagger";
import { IsString, Length } from "class-validator";

export class CreateSongDto{
    @ApiProperty({example: 'Coolsong', description: 'Song name'})
    @IsString({message: 'must be a string'})
    @Length(2, 24, {message: 'From 2 to 24 symbols'})
    readonly name;

    @ApiProperty({example: 'Alex_artist', description: 'Song artist'})
    @IsString({message: 'must be a string'})
    @Length(2, 20, {message: 'From 2 to 20 symbols'})
    readonly artist;

    @ApiProperty({example: 'Lallalalalala\n lalalalalalala\n lalalalalala', description: 'Song text'})
    @IsString({message: 'must be a string'})
    @Length(1, 500, {message: 'From 1 to 500 symbols'})
    readonly text;
}