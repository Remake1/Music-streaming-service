import { forwardRef, Module } from '@nestjs/common';
import { PlaylistService } from './playlist.service';
import { PlaylistController } from './playlist.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Playlist, PlaylistSchema } from './schemas/playlist.schema';
import { SongModule } from '../song/song.module';
import { Song, SongSchema } from '../song/schemas/song.schema';
import { FileService } from '../file/file.service';
import { AuthModule } from '../auth/auth.module';

@Module({
  providers: [PlaylistService, FileService],
  controllers: [PlaylistController],
  imports: [
    MongooseModule.forFeature([
      { name: Playlist.name, schema: PlaylistSchema },
    ]),
    MongooseModule.forFeature([{ name: Song.name, schema: SongSchema }]),
    forwardRef(() => SongModule),
    forwardRef(() => AuthModule),
  ],
})
export class PlaylistModule {}
