import {forwardRef, Module} from "@nestjs/common";
import {MongooseModule} from "@nestjs/mongoose";

import {SongController} from "./song.controller";
import {SongService} from "./song.service";
import {FileService} from "../file/file.service";
import {Song, SongSchema} from "./schemas/song.schema";
import {Comment, CommentSchema} from "./schemas/comment.schema";
import {UsersService} from "../users/users.service";
import {User, UserSchema} from "../users/schemas/user.schema";
import {AuthModule} from "../auth/auth.module";
import {Album, AlbumSchema} from "../album/schemas/album.schema";


@Module({
    imports: [
        MongooseModule.forFeature([
            {name: Song.name, schema: SongSchema}
        ]),
        MongooseModule.forFeature([
            {name: Comment.name, schema: CommentSchema}
        ]),
        MongooseModule.forFeature([
            {name: User.name, schema: UserSchema}
        ]),
        MongooseModule.forFeature([
            {name: Album.name, schema: AlbumSchema}
        ]),
        forwardRef(() => AuthModule)
    ],
    controllers: [SongController],
    providers: [SongService, FileService, UsersService],
    exports: [SongService]
})

export class SongModule {}