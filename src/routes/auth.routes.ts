import {Router} from 'express'

import passport, { session } from 'passport'

const router = Router()

import { deleteUser, editpassword, edituser, FindUser, signIn,signUp } from '../controllers/user.contoller';
import { newTweet, showAllTweets, showUserTweets } from '../controllers/tweet.controller';
import { AddOrRemoveLike, GetLikes } from '../controllers/Like.controller';
 
//endpoints para users
router.post('/signup',signUp)
router.post('/signin',signIn)
router.post('/finduser',FindUser)
router.post('/deleteuser',passport.authenticate('jwt', {session: false}),deleteUser)
router.post('/edituser', passport.authenticate('jwt', {session:false}),edituser)
router.post('/editpass',passport.authenticate('jwt', {session:false}),editpassword)

//endpoints para Tweets
router.post('/newtweet',newTweet);
router.post('/showuserTweets',showUserTweets)
router.post('/showalltweets',showAllTweets)
router.post('/like',AddOrRemoveLike)
router.post('/getlikes',GetLikes)

export default router;