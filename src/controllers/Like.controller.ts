import { json, Request, Response } from "express"
import Like from "../models/Like";
//Crear Tweet


export const AddOrRemoveLike = async (req: Request,res: Response): Promise<Response> =>{
    const result = await Like.find({ idTweet:req.body.idTweet,idUsuario:req.body.idUsuario});
    console.log(result.length)
    if (result.length==0) {
        //GUARDAR Tweet
    const newLike = new Like(req.body);
    await newLike.save();
    return res.status(201).json({msg:"Se dio like"});
    }
    await Like.deleteOne({ idTweet:req.body.idTweet,idUsuario:req.body.idUsuario});
    return  res.status(201).json({msg:'Se quito like'});
}

export const GetLikes = async (req: Request,res: Response): Promise<Response> =>{
    const result = await Like.find({ idTweet:req.body.idTweet});
    return res.status(201).json(result.length)
}

export const CheckLike = async (req: Request,res: Response): Promise<Response> =>{

    const check = await Like.find({ idTweet:req.body.idTweet, idUsuario:req.body.idUsuario });
    console.log(check.length)
    if (check.length==0) {
    return res.status(201).json({status:'false'});

    }
    return  res.status(201).json({status:'true'});
}