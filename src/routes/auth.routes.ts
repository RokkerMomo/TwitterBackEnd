import {Router} from 'express'

import passport, { session } from 'passport'

const router = Router()

import { deleteUser, editpassword, edituser, FindUser, signIn,signUp } from '../controllers/user.contoller';
import { deleteTweet, newTweet, search, showAllTweets, ShowFollowingTweets, showSingleTweet, showUserTweets } from '../controllers/tweet.controller';
import { AddOrRemoveLike, CheckLike, GetLikes } from '../controllers/Like.controller';
import { CheckFollow, followorunfollow, GetFollowers, GetFollowing } from '../controllers/Seguimiento.controller';
import { getComentarios, GetNumeroDeComentarios, NuevoComentario } from '../controllers/comentario.controller';
 
//endpoints para users
router.post('/signup',signUp)
router.post('/signin',signIn)
router.post('/finduser',FindUser)
router.post('/edituser',edituser)
router.post('/editpass',passport.authenticate('jwt', {session:false}),editpassword)

//endpoints para Tweets
router.post('/newtweet',newTweet);
router.post('/showuserTweets',showUserTweets)
router.post('/showfollowing',ShowFollowingTweets)
router.post('/showalltweets',showAllTweets)
router.post('/showSingleTweet',showSingleTweet)
router.post('/search',search)
router.post('/like',AddOrRemoveLike)
router.post('/getlikes',GetLikes)
router.post('/checklike',CheckLike)
router.post('/deleteTweet',deleteTweet)


//endpoints para followers
router.post('/follow',followorunfollow)
router.post('/getfollowers',GetFollowers)
router.post('/getFollowing',GetFollowing)
router.post('/checkfollow',CheckFollow)

//endpoints para comentarios
router.post('/newComentario',NuevoComentario)
router.post('/getcomentarios',getComentarios)
router.post('/getcomentariosnumber',GetNumeroDeComentarios)

export default router;