import {
  Body,
  Controller,
  Post,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
  Request,
  Get,
  Query,
  Param,
  Put,
  ForbiddenException,
  Delete, Patch
} from "@nestjs/common";
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreatePlaylistDto } from './dto/create-playlist.dto';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { PlaylistService } from './playlist.service';
import { ObjectId } from 'mongoose';
import { ApiBody, ApiConsumes, ApiOkResponse, ApiOperation, ApiUnauthorizedResponse } from "@nestjs/swagger";

@Controller('/playlists')
export class PlaylistController {
  constructor(private playlistService: PlaylistService) {}

  @ApiOperation({summary: "Create Playlist"})
  @ApiConsumes("multipart/form-data")
  @ApiBody({type: CreatePlaylistDto})
  @ApiOkResponse({description: "Playlist token", type: "Object"})
  @UseGuards(JwtAuthGuard)
  @Post()
  @UseInterceptors(FileFieldsInterceptor([{ name: 'picture', maxCount: 1 }]))
  create(
    @UploadedFiles() files,
    @Body() dto: CreatePlaylistDto,
    @Request() req,
  ) {
    const { picture } = files;

    return this.playlistService.create(
      dto,
      req.user.id,
      req.user.name,
      picture[0],
    );
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getOne(@Param('id') id: ObjectId, @Request() req) {
    const playlistToGet = await this.playlistService.getOne(id);

    if (
      playlistToGet?.user.toString() !== req.user.id
    ) {
      throw new ForbiddenException(['You do not own this playlist.']);
    }

    return this.playlistService.getOne(id);
  }

  @Get('/anon/:id')
  async getOneAnon(@Param('id') id: ObjectId) {
    const playlistToGet = await this.playlistService.getOne(id);
    if (playlistToGet?.public === false) {
        throw new ForbiddenException(['This playlist isn`t public.']);
    }
    return this.playlistService.getOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id/:songId')
  async addSong(
    @Param('id') id: ObjectId,
    @Param('songId') songId: ObjectId,
    @Request() req,
  ) {
    const playlistToEdit = await this.playlistService.getOne(id);
    if (playlistToEdit?.user.toString() !== req.user.id) {
      throw new ForbiddenException(['You do not own this playlist.']);
    }
    return this.playlistService.addSong(id, songId);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async getUser(@Request() req) {
    return this.playlistService.getUser(req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async makePublic(@Param('id') id: ObjectId, @Request() req) {
    const playlistToEdit = await this.playlistService.getOne(id);
    if (playlistToEdit?.user.toString() !== req.user.id) {
      throw new ForbiddenException(['You do not own this playlist.']);
    }
    return this.playlistService.makePublic(id);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(@Param('id') id: ObjectId, @Request() req) {
    const playlistToDelete = await this.playlistService.getOne(id);
    if (playlistToDelete?.user.toString() !== req.user.id) {
      throw new ForbiddenException(['You do not own this playlist.']);
    }
    return this.playlistService.delete(id);
  }
}
