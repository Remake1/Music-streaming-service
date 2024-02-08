// Nest
import {Module} from "@nestjs/common";
import { MongooseModule } from '@nestjs/mongoose';
import { ServeStaticModule } from '@nestjs/serve-static';
// Modules
import {SongModule} from "./song/song.module";
import { FileModule } from './file/file.module';
import { AlbumModule } from './album/album.module';
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { PlaylistModule } from './playlist/playlist.module';
// Node
import * as path from 'path';

@Module({
    imports: [
        ServeStaticModule.forRoot({
            rootPath: path.resolve(__dirname, 'static'),
        }),
        MongooseModule.forRoot('mongodb://127.0.0.1:27017/muz-dev'),
        SongModule,
        FileModule,
        AlbumModule,
        AuthModule,
        UsersModule,
        PlaylistModule,
    ],
    providers: [AuthService],
})


export class AppModule {}

