import { Body, Controller, Post, UsePipes } from "@nestjs/common";
import {CreateUserDto} from "../users/dto/create-user.dto";
import {AuthService} from "./auth.service";
import { ValidationPipe } from "../pipes/validation.pipe";
import { ApiBody, ApiConsumes, ApiOkResponse, ApiOperation, ApiUnauthorizedResponse } from "@nestjs/swagger";
import { LoginUserDto } from "../users/dto/login-user.dto";
import { LoggedInTokenDto } from "../users/dto/logged-in-token.dto";

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService){}

    @ApiOperation({summary: "Log in"})
    @ApiConsumes("application/json")
    @ApiBody({type: LoginUserDto})
    @ApiUnauthorizedResponse({description: "Incorrect email or password"})
    @ApiOkResponse({description: "JWT token", type: LoggedInTokenDto})
    @Post('/login')
    login(@Body() userDto: CreateUserDto){
        return this.authService.login(userDto);
    }

    @ApiOperation({summary: "Sign in"})
    @ApiConsumes("application/json")
    @ApiBody({type: CreateUserDto})
    @Post('/reg')
    @UsePipes(ValidationPipe)
    registration(@Body() userDto: CreateUserDto){
        return this.authService.registration(userDto);
    }
}
