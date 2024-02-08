import {
    Body,
    Controller,
    Delete, ForbiddenException,
    Get,
    Param,
    Post,
    Query, Request,
    UploadedFiles,
    UseGuards,
    UseInterceptors, UsePipes
} from "@nestjs/common";
import {FileFieldsInterceptor} from "@nestjs/platform-express";

import {SongService} from "./song.service";
import {CreateSongDto} from "./dto/create-song.dto";
import {CreateCommentDto} from "./dto/create-comment.dto";
import {ObjectId} from "mongoose";
import {JwtAuthGuard} from "../auth/guards/jwt-auth.guard";
import {
    ApiBadRequestResponse, ApiBearerAuth,
    ApiBody,
    ApiConsumes,
    ApiCreatedResponse,
    ApiOperation,
    ApiUnauthorizedResponse
} from "@nestjs/swagger";
import { ValidationPipe } from "../pipes/validation.pipe";


@Controller('/songs')
export class SongController {
    constructor(private SongService: SongService) {  }

    @ApiOperation({summary: 'Create song'})
    @ApiConsumes('multipart/form-data')
    @ApiBody({type: CreateSongDto})
    @ApiCreatedResponse({description: 'The song has been successfully posted.'})
    @ApiBadRequestResponse({
        type: 'object',
        description: 'Invalid input',
    })
    @ApiUnauthorizedResponse({
        type: 'string',
        description: 'Invalid JWT token',
    })
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Post()
    @UseInterceptors(FileFieldsInterceptor([
        { name: 'picture', maxCount: 1 },
        { name: 'audio', maxCount: 1 },
    ]))
    @UsePipes(ValidationPipe)
    create(@UploadedFiles() files, @Body() dto: CreateSongDto,
           @Request() req) {
        const { picture, audio } = files;
        return this.SongService.create(dto, req.user.id, picture[0], audio[0]);
    }

    @Get()
    getAll(@Query('count') count: number,
           @Query('offset') offset: number,
           @Query('filter') filter: string) {
        return this.SongService.getAll(count, offset, filter);
    }

    @Get('user')
    getAllUserSongs(@Query('id') id: ObjectId) {
        return this.SongService.getAllUserSongs(id);
    }

    @Get('/search')
    search(@Query('search') search: string) {
        return this.SongService.search(search);
    }

    @Get('/number')
    getCount(){
        return this.SongService.getCount();
    }


    @Get(':id')
    getOne(@Param('id') id: ObjectId){
        return this.SongService.getOne(id);
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    async delete(@Param('id') id: ObjectId,
           @Request() req) {

        const songToDelete = await this.SongService.getOne(id);

        if (songToDelete?.user.toString() !== req.user.id) {
            throw new ForbiddenException(['You do not own this song.']);
        }

        return this.SongService.delete(id);

    }

    @Post('comment')
    addComment(@Body() dto: CreateCommentDto){
        return this.SongService.addComment(dto);
    }

    @Post('listen/:id')
    listen(@Param('id') id: ObjectId){
        return this.SongService.listen(id);
    }
}