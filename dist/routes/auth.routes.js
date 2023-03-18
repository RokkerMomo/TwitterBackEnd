"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const passport_1 = __importDefault(require("passport"));
const router = (0, express_1.Router)();
const user_contoller_1 = require("../controllers/user.contoller");
const tweet_controller_1 = require("../controllers/tweet.controller");
const Like_controller_1 = require("../controllers/Like.controller");
const Seguimiento_controller_1 = require("../controllers/Seguimiento.controller");
const comentario_controller_1 = require("../controllers/comentario.controller");
//endpoints para users
router.post('/signup', user_contoller_1.signUp);
router.post('/signin', user_contoller_1.signIn);
router.post('/finduser', passport_1.default.authenticate('jwt', { session: false }), user_contoller_1.FindUser);
router.post('/edituser', passport_1.default.authenticate('jwt', { session: false }), user_contoller_1.edituser);
router.post('/editpass', passport_1.default.authenticate('jwt', { session: false }), user_contoller_1.editpassword);
//endpoints para Tweets
router.post('/newtweet', passport_1.default.authenticate('jwt', { session: false }), tweet_controller_1.newTweet);
router.post('/showuserTweets', passport_1.default.authenticate('jwt', { session: false }), tweet_controller_1.showUserTweets);
router.post('/showfollowing', passport_1.default.authenticate('jwt', { session: false }), tweet_controller_1.ShowFollowingTweets);
router.post('/showalltweets', passport_1.default.authenticate('jwt', { session: false }), tweet_controller_1.showAllTweets);
router.post('/showSingleTweet', passport_1.default.authenticate('jwt', { session: false }), tweet_controller_1.showSingleTweet);
router.post('/search', passport_1.default.authenticate('jwt', { session: false }), tweet_controller_1.search);
router.post('/like', passport_1.default.authenticate('jwt', { session: false }), Like_controller_1.AddOrRemoveLike);
router.post('/getlikes', passport_1.default.authenticate('jwt', { session: false }), Like_controller_1.GetLikes);
router.post('/checklike', passport_1.default.authenticate('jwt', { session: false }), Like_controller_1.CheckLike);
router.post('/deleteTweet', passport_1.default.authenticate('jwt', { session: false }), tweet_controller_1.deleteTweet);
//endpoints para followers
router.post('/follow', passport_1.default.authenticate('jwt', { session: false }), Seguimiento_controller_1.followorunfollow);
router.post('/getfollowers', passport_1.default.authenticate('jwt', { session: false }), Seguimiento_controller_1.GetFollowers);
router.post('/getFollowing', passport_1.default.authenticate('jwt', { session: false }), Seguimiento_controller_1.GetFollowing);
router.post('/checkfollow', passport_1.default.authenticate('jwt', { session: false }), Seguimiento_controller_1.CheckFollow);
//endpoints para comentarios
router.post('/newComentario', passport_1.default.authenticate('jwt', { session: false }), comentario_controller_1.NuevoComentario);
router.post('/getcomentarios', passport_1.default.authenticate('jwt', { session: false }), comentario_controller_1.getComentarios);
router.post('/getcomentariosnumber', passport_1.default.authenticate('jwt', { session: false }), comentario_controller_1.GetNumeroDeComentarios);
router.post('/deletecomentario', passport_1.default.authenticate('jwt', { session: false }), comentario_controller_1.DeleteComentario);
exports.default = router;
