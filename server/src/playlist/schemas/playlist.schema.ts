import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as mongooseSchema } from 'mongoose';
import {Song} from "../../song/schemas/song.schema";
import mongoose from "mongoose";
import {User} from "../../users/schemas/user.schema";

const types = mongooseSchema.Types;
export type PlaylistDocument = Playlist & Document;

@Schema()
export class Playlist {
    @Prop()
    name: string;

    @Prop()
    userName: string;

    @Prop()
    picture: string;

    @Prop()
    public: boolean;

    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'User' })
    user: User;

    @Prop({ type: [{ type: types.ObjectId, ref: 'Song' }] })
    songs: Song[];
}

export const PlaylistSchema = SchemaFactory.createForClass(Playlist);