import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, Length } from "class-validator";

export class CreateUserDto {
    @ApiProperty({example: 'mymail@gmail.com', description: 'Email address'})
    @IsString({message: 'must be a string'})
    @IsEmail({}, {message: "must be an email"})
    readonly email;

    @ApiProperty({example: 'StrOngpassword123', description: 'User password'})
    @IsString({message: 'must be a string'})
    @Length(6, 32, {message: 'From 6 to 32 symbols'})
    readonly password;

    @ApiProperty({example: 'K1nzza', description: 'User nickname'})
    @IsString({message: 'must be a string'})
    @Length(3, 15, {message: 'From 3 to 15 symbols'})
    readonly username;
}