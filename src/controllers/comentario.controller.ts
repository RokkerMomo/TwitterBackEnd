import { json, Request, Response } from "express"
import comentario from "../models/comentario";
//Crear Tweet


export const NuevoComentario = async (req: Request,res: Response): Promise<Response> =>{
    if (!req.body.descripcion) {
        return res.status(400).json({ msg: "El Comentario No Puede estar vacio" });
      }
    const newComentario = new comentario(req.body);
    await newComentario.save();
    return res.status(201).json(newComentario);
}
 
export const getComentarios = async (req: Request,res: Response): Promise<Response>=>{
    const comentarios = await comentario.find({idTweet:req.body.idTweet}).sort({fecha:'desc'})
    return res.status(201).json(comentarios)
}

export const GetNumeroDeComentarios = async (req: Request,res: Response): Promise<Response> =>{
    const result = await comentario.find({ idTweet:req.body.idTweet});
    return res.status(201).json(result.length)
}

export const DeleteComentario = async (req: Request, res: Response): Promise<Response>=>{

    const nota = await comentario.findOne({_id:req.body.idTweet});
    if(!nota){
        return res.status(400).json({msg:'El Comentario que busco no existe'});
    }

    const notas = await comentario.deleteOne({_id:req.body.idTweet});
    console.log(notas);
    return res.status(201).json({msg:"Comentario eliminado con exito"});

}