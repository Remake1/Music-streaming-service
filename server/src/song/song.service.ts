import {Injectable} from "@nestjs/common";
import {InjectModel} from "@nestjs/mongoose";

import {Model, ObjectId} from "mongoose";

import {Song, SongDocument} from "./schemas/song.schema";
import {Comment, CommentDocument} from "./schemas/comment.schema";
import {CreateSongDto} from "./dto/create-song.dto";
import {CreateCommentDto} from "./dto/create-comment.dto";
import {FileService, FileType} from "../file/file.service";
import {User, UserDocument} from "../users/schemas/user.schema";
import {Album, AlbumDocument} from "../album/schemas/album.schema";


@Injectable()
export class SongService {

    constructor(@InjectModel(Song.name) private songModel: Model<SongDocument>,
                @InjectModel(Comment.name) private commentModel: Model<CommentDocument>,
                @InjectModel(User.name) private userModel: Model<UserDocument>,
                @InjectModel(Album.name) private albumModel: Model<AlbumDocument>,
                private fileService: FileService) {}

    async create(dto: CreateSongDto, user, picture, audio): Promise<Song> {
        const audioPath = this.fileService.createFile(FileType.AUDIO, audio);
        const picturePath = this.fileService.createFile(FileType.IMAGE, picture);
        const updateUser = await this.userModel.findById(user);
        const song = await this.songModel.create({...dto, user: user, listens: 0, audio: audioPath, picture: picturePath});

        updateUser.songs.push(song._id);
        await updateUser.save();

        return song;
    }

    async getAll(count = 10, offset = 0, filter = ''): Promise<Song[]> {
        if (filter === "new"){
            return this.songModel.find().sort([['createdAt', -1]]).skip(Number(offset)).limit(Number(count));
        } else if (filter==="aph"){
            return this.songModel.find().sort([['name', 1]]).skip(Number(offset)).limit(Number(count));
        } else if (filter==="art"){
            return this.songModel.find().sort([['artist', 1]]).skip(Number(offset)).limit(Number(count));
        } else {
            return this.songModel.find().skip(Number(offset)).limit(Number(count));
        }
    }

    async getOne(id: ObjectId): Promise<Song> {
        const song = await this.songModel.findById(id).populate('comments');
        return song;
    }

    async delete(id: ObjectId): Promise<ObjectId> {
        const file = {
            audio: await this.songModel.findById(id).select('audio'),
            picture: await this.songModel.findById(id).select('picture')
        };
        console.log(file);
        const song = await this.songModel.findByIdAndDelete(id);
        const album = await this.albumModel.findById(song.album);
        // delete song from album
        if(album){
            const index = album.songs.indexOf(song._id);
            album.songs.splice(index, 1);
            await album.save();
        }


        await this.fileService.removeFile(file.audio.audio);
        await this.fileService.removeFile(file.picture.picture);
        return song.id;
    }
    async addComment(dto: CreateCommentDto): Promise<Comment> {
        const song = await this.songModel.findById(dto.songId);
        const comment = await this.commentModel.create({...dto})
        song.comments.push(comment._id)
        await song.save();
        return comment;
    }

   async listen(id: ObjectId) {
        const song = await this.songModel.findById(id);
        song.listens++;
        song.save();
    }

   async search(search: string): Promise<Song[]> {
        const [songs] = await Promise.all([
            this.songModel.find({
                $or: [
                    { name: { $regex: new RegExp(search, 'i') } },
                    { artist: { $regex: new RegExp(search, 'i') } },
                ],
            }),
        ]);
        return songs;
    }

    async getCount(){
        const songCount = await this.songModel.countDocuments({}).exec();
        return songCount;
    }

    async getAllUserSongs(id: ObjectId) {
        const songs = await this.songModel.find({
                $or: [
                    {user: id, album: {$exists: false}},
                    {user: id, album: null}
                ]
            }).exec();
        return songs;
    }
}