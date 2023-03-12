import { json, Request, Response } from "express"
import Seguir from "../models/Seguimiento";


export const followorunfollow = async (req: Request,res: Response): Promise<Response> =>{
    const result = await Seguir.find({ idSeguido:req.body.idSeguido, idSeguidor:req.body.idSeguidor });
    console.log(result.length)
    if (result.length==0) {
        //GUARDAR Tweet
    const newLike = new Seguir(req.body);
    await newLike.save();
    return res.status(201).json({msg:"Ahora sigues a esta persona"});
    }
    await Seguir.deleteOne({ idSeguido:req.body.idSeguido, idSeguidor:req.body.idSeguidor });
    return  res.status(201).json({msg:'Dejaste de seguir a esta persona'});
}

export const GetFollowers = async (req: Request,res: Response): Promise<Response> =>{
    const result = await Seguir.find({ idSeguido:req.body.idSeguido});
    return res.status(201).json(result.length)
}

export const GetFollowing = async (req: Request,res: Response): Promise<Response> =>{
    const result = await Seguir.find({ idSeguidor:req.body.idSeguidor});
    return res.status(201).json(result.length)
}

export const CheckFollow = async (req: Request,res: Response): Promise<Response> =>{

    const check = await Seguir.find({ idSeguido:req.body.idSeguido, idSeguidor:req.body.idSeguidor });
    console.log(check.length)
    if (check.length==0) {
    return res.status(201).json({status:'false'});

    }
    return  res.status(201).json({status:'true'});
}
