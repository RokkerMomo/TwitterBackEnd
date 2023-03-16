import { Model, Schema, Document, model } from "mongoose";

//INTERFACE
export interface comentario extends Document {
    idTweet:string,
    ownername:string,
    owneruser:string,
    owner:string,
    descripcion:string,
    fotoperfil:string,
    fecha:Date,
}

//EL ESQUEMA DE USUARIO
const comentarioSchema = new Schema ({
    idTweet:{
        type:String,
        unique:false,
        required:true,
        trim:true,
    },
    ownername:{
        type:String,
        unique:false,
        required:true,
        trim:true
    },
    owneruser:{
        type:String,
        unique:false,
        required:true,
        trim:true
    },
    owner:{
        type:String,
        unique:false,
        required:true,
        trim:true
    },
    descripcion:{
        type:String,
        unique:false,
        required:false,
        trim:true
    },
    foto:{
        type:String,
        unique:false,
        required:false,
        trim:true
    },
    fotoperfil:{
        type:String,
        unique:false,
        required:false,
        trim:true
    },
    fecha:Date
});

comentarioSchema.pre<comentario>('save', async function(next){
    next();

})

export default model<comentario>('comentario', comentarioSchema);