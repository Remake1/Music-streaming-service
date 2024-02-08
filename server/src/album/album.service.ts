import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { FileService, FileType } from '../file/file.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { Album, AlbumDocument } from './schemas/album.schema';
import { Song, SongDocument } from '../song/schemas/song.schema';
import { User, UserDocument } from '../users/schemas/user.schema';

@Injectable()
export class AlbumService {
  constructor(
    @InjectModel(Song.name) private songModel: Model<SongDocument>,
    @InjectModel(Album.name) private albumModel: Model<AlbumDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private fileService: FileService,
  ) {}

  async create(dto: CreateAlbumDto, user, picture): Promise<Album> {
    const picturePath = this.fileService.createFile(FileType.IMAGE, picture);

    const updateUser = await this.userModel.findById(user);

    const [album] = await Promise.all([
      this.albumModel.create({
        ...dto,
        user: user,
        picture: picturePath,
      }),
    ]);

    updateUser.albums.push(album._id);
    await updateUser.save();
    return album;
  }

  async getAll(count = 10, offset = 0): Promise<Album[]> {
    const [albums] = await Promise.all([
      this.albumModel.find().skip(offset).limit(count),
    ]);
    return albums;
  }

  async getOne(id: ObjectId): Promise<Album> {
    const [album] = await Promise.all([
      this.albumModel.findById(id).populate('songs'),
    ]);
    return album;
  }

  async delete(id: ObjectId): Promise<ObjectId> {
    const album = await this.albumModel.findByIdAndDelete(id);

    for (const songId of album.songs) {
        const song = await this.songModel.findById(songId);
        song.album = null;
        await song.save();
    }

    this.fileService.removeFile(album.picture);
    return album._id;
  }

  async addSong(id: ObjectId, songId: ObjectId): Promise<Album> {
    const album = await this.albumModel.findById(id);
    const song = await this.songModel.findById(songId);
    album.songs.push(song._id);

    song.album = album;
    await album.save();
    await song.save();
    return album;
  }

  async search(query: string): Promise<Album[]> {
    const [albums] = await Promise.all([
      this.albumModel.find({
        $or: [
          { name: { $regex: new RegExp(query, 'i') } },
          { author: { $regex: new RegExp(query, 'i') } },
        ],
      }),
    ]);
    return albums;
  }

  async getCount() {
    const albumCount = await this.albumModel.countDocuments();
    return albumCount;
  }
}
