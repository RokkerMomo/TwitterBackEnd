import { json, Request, Response } from "express"
import Tweet from "../models/tweet";
import usuarios from "../models/user";
//Crear Tweet
export const newTweet = async (req: Request,res: Response): Promise<Response> =>{
    if (!req.body.descripcion) {
        return res.status(400).json({ msg: "El Tweet No puede estar Vacio" });
      }
    //GUARDAR Tweet
    const newTweet = new Tweet(req.body);
    await newTweet.save();
    return res.status(201).json(newTweet);
}

export const showTweets = async (req: Request, res: Response): Promise<Response>=>{
    
    const Tweets = await Tweet.find({owner:req.body.owner});
    const user:any = await usuarios.findOne({_id:req.body.owner});
    const result = Tweets.concat(user);
    if (!Tweets) {
        return res.status(400).json({msg:"el usuario no tiene Tweets"})
    }
    console.log(Tweets);
    return res.status(201).json({Tweets,user});

}


export const showTweetDetails = async (req: Request, res: Response): Promise<Response>=>{
    
    const nota = await Tweet.findOne({_id:req.body._id});
    if(!nota){
        return res.status(400).json({msg:'La nota que busco no existe'});
    }
    //GUARDAR USUARIO
    return res.status(201).json(nota);

}

export const editTweetContent = async (req: Request, res: Response): Promise<Response>=>{
    const notas = await Tweet.updateOne({_id:req.body._id},{titulo:req.body.titulo, descripcion:req.body.descripcion});
    if (!notas) {
        return res.status(400).json({msg:"Error al intentar guardar la nota (nota no encontrada)"});
    }
    console.log(notas);
    return res.status(201).json({msg:"Guardado con exito"});

}

export const deleteTweet = async (req: Request, res: Response): Promise<Response>=>{

    const nota = await Tweet.findOne({_id:req.body._id});
    if(!nota){
        return res.status(400).json({msg:'La nota que busco no existe'});
    }

    const notas = await Tweet.deleteOne({_id:req.body._id});
    console.log(notas);
    return res.status(201).json({msg:"Nota eliminada con exito"});

}
