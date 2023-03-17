import { json, Request, Response } from "express"
import Tweet from "../models/tweet";
import Seguir from "../models/Seguimiento";

//Crear Tweet
export const newTweet = async (req: Request,res: Response): Promise<Response> =>{
    if (!req.body.descripcion&&req.body.foto=='undefined') {
        return res.status(400).json({ msg: "El Tweet No puede estar Vacio" });
      }
    //GUARDAR Tweet
    const newTweet = new Tweet(req.body);
    await newTweet.save();
    return res.status(201).json(newTweet);
}
 
 
export const showUserTweets = async (req: Request, res: Response): Promise<Response>=>{
    
    const Tweets = await Tweet.find({owner:req.body.owner}).sort({fecha:'desc'});
    if (!Tweets) {
        return res.status(400).json({msg:"el usuario no tiene Tweets"})
    }
    console.log(Tweets);
    return res.status(201).json({Tweets});

}

export const showSingleTweet = async (req: Request, res: Response): Promise<Response>=>{
    
    const Tweets = await Tweet.findOne({_id:req.body.idTweet});
    if (!Tweets) {
        return res.status(400).json({msg:"El Tweet que busco no existe"})
    }
    console.log(Tweets);
    return res.status(201).json({Tweets});

}

export const search = async (req: Request, res: Response): Promise<Response>=>{
    
    const Tweets = await Tweet.find({$text: {$search: req.body.descripcion}});
    if (!Tweets) {
        return res.status(400).json({msg:"El Tweet que busco no existe"})
    }
    console.log(Tweets);
    return res.status(201).json({Tweets});

}

export const ShowFollowingTweets = async (req: Request, res: Response): Promise<Response>=>{

    const busqueda = await Seguir.find({idSeguidor:req.body.userid})

    let result:any = []
    
    for (let i = 0; i < busqueda.length; i++) {
        const tweets = await Tweet.find({owner:busqueda[i].idSeguido})

      result = result.concat(tweets)
        
    
    }
    let allTweets = result.sort(function(a:any, b:any) {
        return new Date(b.fecha).getTime() - new Date(a.fecha).getTime();
    });
    
    return res.status(200).json({allTweets})
}



export const showAllTweets = async (req: Request, res: Response): Promise<Response>=>{
    
    const Tweets = await Tweet.find().sort({fecha:'desc'});
    if (!Tweets) {
        return res.status(400).json({msg:"el usuario no tiene Tweets"})
    }
    console.log(Tweets);
    return res.status(201).json({Tweets});

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

    const nota = await Tweet.findOne({_id:req.body.idTweet});
    if(!nota){
        return res.status(400).json({msg:'El Tweet que busco no existe'});
    }

    const notas = await Tweet.deleteOne({_id:req.body.idTweet});
    console.log(notas);
    return res.status(201).json({msg:"Tweet eliminado con exito"});

}
