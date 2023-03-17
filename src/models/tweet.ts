import { Model, Schema, Document, model } from "mongoose";

//INTERFACE
export interface Tweet extends Document {
    ownername:string,
    owneruser:string,
    owner:string,
    descripcion:string,
    foto:string,
    fotoperfil:string,
    fecha:Date,
}


//EL ESQUEMA DE USUARIO
const TweetSchema = new Schema ({
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

TweetSchema.index({'$**': 'text'});

TweetSchema.pre<Tweet>('save', async function(next){
    next();

})

export default model<Tweet>('Tweet', TweetSchema);