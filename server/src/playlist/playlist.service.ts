import {Injectable} from '@nestjs/common';
import {CreatePlaylistDto} from './dto/create-playlist.dto';
import {Model, ObjectId} from 'mongoose';
import {Playlist, PlaylistDocument} from './schemas/playlist.schema';
import {FileService, FileType} from '../file/file.service';
import {InjectModel} from '@nestjs/mongoose';
import {Song, SongDocument} from "../song/schemas/song.schema";
import * as mongoose from "mongoose";

@Injectable()
export class PlaylistService {
  constructor(
    @InjectModel(Playlist.name) private playlistModel: Model<PlaylistDocument>,
    @InjectModel(Song.name) private songModel: Model<SongDocument>,
    private fileService: FileService,
  ) {}


  async create(
    dto: CreatePlaylistDto,
    userId,
    userName,
    picture,
  ): Promise<Playlist> {
    const picturePath = this.fileService.createFile(FileType.IMAGE, picture);

    const [playlist] = await Promise.all([
      this.playlistModel.create({
        ...dto,
        user: userId,
        userName: userName,
        picture: picturePath,
        public: false,
      }),
    ]);

    return playlist;
  }

  async getOne(id: ObjectId): Promise<Playlist> {
    const [playlist] = await Promise.all([
      this.playlistModel.findById(id).populate('songs'),
    ]);
    return playlist;
  }

  async addSong(id: ObjectId, songId: ObjectId) {
    const playlist = await this.playlistModel.findById(id);
    const song = await this.songModel.findById(songId);
    playlist.songs.push(song._id);
    await playlist.save();
    return playlist;
  }

  async delete(id: ObjectId) {
    const playlist = await this.playlistModel.findById(id);
    await playlist.remove();
    return playlist;
  }

  async getUser(userId: string) {
    const playlists = await this.playlistModel.find({user: new mongoose.Types.ObjectId(userId)});
    return playlists;
  }

  async makePublic(id: ObjectId) {
    return this.playlistModel.findByIdAndUpdate(id, {public: true});
  }
}
