import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as mongooseSchema } from 'mongoose';
import {Song} from "../../song/schemas/song.schema";
import mongoose from "mongoose";
import {User} from "../../users/schemas/user.schema";

const types = mongooseSchema.Types;
export type AlbumDocument = Album & Document;

@Schema()
export class Album {
    @Prop()
    name: string;

    @Prop()
    author: string;

    @Prop()
    picture: string;

    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'User' })
    user: User;

    @Prop({ type: [{ type: types.ObjectId, ref: 'Song' }] })
    songs: Song[];
}

export const AlbumSchema = SchemaFactory.createForClass(Album);