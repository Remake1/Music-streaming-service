import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import mongoose from "mongoose";
import {Album} from "../../album/schemas/album.schema";
import {Song} from "../../song/schemas/song.schema";


export type UserDocument = User & Document;

@Schema()
export class User {

    @Prop({unique: true})
    username: string;

    @Prop({unique: true})
    email: string;

    @Prop()
    password: string;

    @Prop({type: [{type: mongoose.Schema.Types.ObjectId, ref: 'Album'}]})
    albums: Album[];

    @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Song' }] })
    songs: Song[];
}

export const UserSchema = SchemaFactory.createForClass(User);