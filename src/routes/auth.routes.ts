import {Router} from 'express'

import passport, { session } from 'passport'

const router = Router()

import { deleteUser, editpassword, edituser, FindUser, signIn,signUp } from '../controllers/user.contoller';
import { deleteTweet, newTweet, search, showAllTweets, ShowFollowingTweets, showSingleTweet, showUserTweets } from '../controllers/tweet.controller';
import { AddOrRemoveLike, CheckLike, GetLikes } from '../controllers/Like.controller';
import { CheckFollow, followorunfollow, GetFollowers, GetFollowing } from '../controllers/Seguimiento.controller';
import { DeleteComentario, getComentarios, GetNumeroDeComentarios, NuevoComentario } from '../controllers/comentario.controller';
 
//endpoints para users
router.post('/signup',signUp)
router.post('/signin',signIn)
router.post('/finduser',passport.authenticate('jwt', {session:false}),FindUser)
router.post('/edituser',passport.authenticate('jwt', {session:false}),edituser)
router.post('/editpass',passport.authenticate('jwt', {session:false}),editpassword)

//endpoints para Tweets
router.post('/newtweet',passport.authenticate('jwt', {session:false}),newTweet);
router.post('/showuserTweets',passport.authenticate('jwt', {session:false}),showUserTweets)
router.post('/showfollowing',passport.authenticate('jwt', {session:false}),ShowFollowingTweets)
router.post('/showalltweets',passport.authenticate('jwt', {session:false}),showAllTweets)
router.post('/showSingleTweet',passport.authenticate('jwt', {session:false}),showSingleTweet)
router.post('/search',passport.authenticate('jwt', {session:false}),search)
router.post('/like',passport.authenticate('jwt', {session:false}),AddOrRemoveLike)
router.post('/getlikes',passport.authenticate('jwt', {session:false}),GetLikes)
router.post('/checklike',passport.authenticate('jwt', {session:false}),CheckLike)
router.post('/deleteTweet',passport.authenticate('jwt', {session:false}),deleteTweet)


//endpoints para followers
router.post('/follow',passport.authenticate('jwt', {session:false}),followorunfollow)
router.post('/getfollowers',passport.authenticate('jwt', {session:false}),GetFollowers)
router.post('/getFollowing',passport.authenticate('jwt', {session:false}),GetFollowing)
router.post('/checkfollow',passport.authenticate('jwt', {session:false}),CheckFollow)

//endpoints para comentarios
router.post('/newComentario',passport.authenticate('jwt', {session:false}),NuevoComentario)
router.post('/getcomentarios',passport.authenticate('jwt', {session:false}),getComentarios)
router.post('/getcomentariosnumber',passport.authenticate('jwt', {session:false}),GetNumeroDeComentarios)
router.post('/deletecomentario',passport.authenticate('jwt', {session:false}),DeleteComentario)

export default router;