import { Model, Schema, Document, model } from "mongoose";

//INTERFACE
export interface Like extends Document {
    idTweet:string,
    idUsuario:string,
}

//EL ESQUEMA DE USUARIO
const LikeSchema = new Schema ({
    idTweet:{
        type:String,
        unique:false,
        required:true,
        trim:true
    },
    idUsuario:{
        type:String,
        unique:false,
        required:true,
        trim:true
    }
});

LikeSchema.pre<Like>('save', async function(next){
    next();

})

export default model<Like>('Like', LikeSchema);