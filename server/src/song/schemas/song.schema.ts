import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import {Album} from "../../album/schemas/album.schema";
import {User} from "../../users/schemas/user.schema";

export type SongDocument = Song & Document;

@Schema({ timestamps: true })
export class Song {
    @Prop()
    name: string;

    @Prop()
    artist: string;

    @Prop()
    text: string;

    @Prop()
    listens: number;

    @Prop()
    picture: string;

    @Prop()
    audio: string;

    @Prop({type: [{type: mongoose.Schema.Types.ObjectId, ref: 'Comment'}]})
    comments: Comment[];

    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'Album' })
    album: Album;

    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'User' })
    user: User;
}

export const SongSchema = SchemaFactory.createForClass(Song);
