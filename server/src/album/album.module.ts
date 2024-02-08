import {forwardRef, Module} from '@nestjs/common';
import { AlbumService } from './album.service';
import { AlbumController } from './album.controller';
import {MongooseModule} from "@nestjs/mongoose";
import {Album, AlbumSchema} from "./schemas/album.schema";
import {Song, SongSchema} from "../song/schemas/song.schema";
import {FileService} from "../file/file.service";
import {User, UserSchema} from "../users/schemas/user.schema";
import {AuthModule} from "../auth/auth.module";
import {SongService} from "../song/song.service";
import {SongModule} from "../song/song.module";

@Module({
  providers: [AlbumService, FileService],
  controllers: [AlbumController],
  imports: [
      MongooseModule.forFeature([{name: Album.name, schema: AlbumSchema}]),
      MongooseModule.forFeature([{name: Song.name, schema: SongSchema}]),
      MongooseModule.forFeature([
          {name: User.name, schema: UserSchema}
      ]),
      forwardRef(() => SongModule),
      forwardRef(() => AuthModule)
  ],
})

export class AlbumModule {}
