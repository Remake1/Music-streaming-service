import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UploadedFile,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
  Request,
  ForbiddenException,
} from '@nestjs/common';
import { AlbumService } from './album.service';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { CreateAlbumDto } from './dto/create-album.dto';
import { ObjectId } from 'mongoose';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { SongService } from '../song/song.service';

@Controller('/album')
export class AlbumController {
  constructor(
    private albumService: AlbumService,
    private songService: SongService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  @UseInterceptors(FileFieldsInterceptor([{ name: 'picture', maxCount: 1 }]))
  create(@UploadedFiles() files, @Body() dto: CreateAlbumDto, @Request() req) {
    const { picture } = files;

    return this.albumService.create(dto, req.user.id, picture[0]);
  }

  @Get()
  getAll(@Query('count') count: number, @Query('offset') offset: number) {
    return this.albumService.getAll(count, offset);
  }

  @Get('/count')
  getCount() {
    return this.albumService.getCount();
  }

  @Get('/search')
  search(@Query('query') query: string) {
    return this.albumService.search(query);
  }

  @Get(':id')
  getOne(@Param('id') id: ObjectId) {
    return this.albumService.getOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id/:songId')
  async addSong(
    @Param('id') id: ObjectId,
    @Param('songId') songId: ObjectId,
    @Request() req,
  ) {
    const playlistToEdit = await this.albumService.getOne(id);
    const songToAdd = await this.songService.getOne(songId);

    if (playlistToEdit?.user.toString() !== req.user.id) {
      throw new ForbiddenException(['You do not own this playlist.']);
    }
    if (songToAdd?.user.toString() !== req.user.id) {
      throw new ForbiddenException(['You do not own this song.']);
    }

    return this.albumService.addSong(id, songId);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(@Param('id') id: ObjectId, @Request() req) {
    const playlistToDelete = await this.albumService.getOne(id);

    if (playlistToDelete?.user.toString() !== req.user.id) {
      throw new ForbiddenException(['You do not own this playlist.']);
    }

    return this.albumService.delete(id);
  }
}
