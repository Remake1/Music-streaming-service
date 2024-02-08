import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, Length } from "class-validator";

export class LoginUserDto {
    @ApiProperty({example: 'mymail@gmail.com', description: 'Email address'})
    readonly email;

    @ApiProperty({example: 'StrOngpassword123', description: 'User password'})
    readonly password;
}