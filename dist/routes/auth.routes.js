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
//endpoints para users
router.post('/signup', user_contoller_1.signUp);
router.post('/signin', user_contoller_1.signIn);
router.post('/finduser', user_contoller_1.FindUser);
router.post('/edituser', user_contoller_1.edituser);
router.post('/editpass', passport_1.default.authenticate('jwt', { session: false }), user_contoller_1.editpassword);
//endpoints para Tweets
router.post('/newtweet', tweet_controller_1.newTweet);
router.post('/showuserTweets', tweet_controller_1.showUserTweets);
router.post('/showfollowing', tweet_controller_1.ShowFollowingTweets);
router.post('/showalltweets', tweet_controller_1.showAllTweets);
router.post('/like', Like_controller_1.AddOrRemoveLike);
router.post('/getlikes', Like_controller_1.GetLikes);
router.post('/checklike', Like_controller_1.CheckLike);
//endpoints para followers
router.post('/follow', Seguimiento_controller_1.followorunfollow);
router.post('/getfollowers', Seguimiento_controller_1.GetFollowers);
router.post('/getFollowing', Seguimiento_controller_1.GetFollowing);
router.post('/checkfollow', Seguimiento_controller_1.CheckFollow);
exports.default = router;
