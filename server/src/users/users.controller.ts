import { Body, Controller, Get, Param, Post, UseGuards, UsePipes } from "@nestjs/common";
import {CreateUserDto} from "./dto/create-user.dto";
import {UsersService} from "./users.service";
import {JwtAuthGuard} from "../auth/guards/jwt-auth.guard";
import {ObjectId} from "mongoose";

@Controller('users')
export class UsersController {

    constructor(private usersService: UsersService) {}

    @Post()
    create(@Body() userDto: CreateUserDto){
        return this.usersService.createUser(userDto);
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    getAll(){
        return this.usersService.getAllUsers();
    }


    @Get(':id')
    getOne(@Param('id') id: ObjectId) {
        return this.usersService.getOne(id);
    }
}
