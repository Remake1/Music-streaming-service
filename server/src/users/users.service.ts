import { Injectable } from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import mongoose from "mongoose";
import {Model} from "mongoose";
import {User, UserDocument} from "./schemas/user.schema";
import {CreateUserDto} from "./dto/create-user.dto";
import {ObjectId} from "mongoose";
import {Album} from "../album/schemas/album.schema";

@Injectable()
export class UsersService {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

    async createUser(dto: CreateUserDto) {
        const user = await this.userModel.create({...dto});
        return user;
    }

    async getAllUsers() {
        const users = await this.userModel.find();
        return users;
    }

    async getUserByEmail(email: string) {
        const user = await this.userModel.findOne({email: email})
            .populate('albums')
            .populate('songs');
        return user;
    }

    async getUserByUsername(username: string) {
        const user = await this.userModel.findOne({username: username})
            .populate('albums')
            .populate('songs');
        return user;
    }

    async getOne(id: ObjectId): Promise<User> {
        const [user] = await Promise.all([
            this.userModel.findById(id).populate('songs').populate('albums'),
        ]);
        return user;
    }
}
