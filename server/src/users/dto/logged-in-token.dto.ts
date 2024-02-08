import { ApiProperty } from "@nestjs/swagger";

export class LoggedInTokenDto {
    @ApiProperty()
    token: string;
}