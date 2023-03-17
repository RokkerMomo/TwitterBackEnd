"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTweet = exports.editTweetContent = exports.showTweetDetails = exports.showAllTweets = exports.ShowFollowingTweets = exports.search = exports.showSingleTweet = exports.showUserTweets = exports.newTweet = void 0;
const tweet_1 = __importDefault(require("../models/tweet"));
const Seguimiento_1 = __importDefault(require("../models/Seguimiento"));
//Crear Tweet
const newTweet = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.body.descripcion && req.body.foto == 'undefined') {
        return res.status(400).json({ msg: "El Tweet No puede estar Vacio" });
    }
    //GUARDAR Tweet
    const newTweet = new tweet_1.default(req.body);
    yield newTweet.save();
    return res.status(201).json(newTweet);
});
exports.newTweet = newTweet;
const showUserTweets = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const Tweets = yield tweet_1.default.find({ owner: req.body.owner }).sort({ fecha: 'desc' });
    if (!Tweets) {
        return res.status(400).json({ msg: "el usuario no tiene Tweets" });
    }
    console.log(Tweets);
    return res.status(201).json({ Tweets });
});
exports.showUserTweets = showUserTweets;
const showSingleTweet = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const Tweets = yield tweet_1.default.findOne({ _id: req.body.idTweet });
    if (!Tweets) {
        return res.status(400).json({ msg: "El Tweet que busco no existe" });
    }
    console.log(Tweets);
    return res.status(201).json({ Tweets });
});
exports.showSingleTweet = showSingleTweet;
const search = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const Tweets = yield tweet_1.default.find({ $text: { $search: req.body.descripcion } });
    if (!Tweets) {
        return res.status(400).json({ msg: "El Tweet que busco no existe" });
    }
    console.log(Tweets);
    return res.status(201).json({ Tweets });
});
exports.search = search;
const ShowFollowingTweets = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const busqueda = yield Seguimiento_1.default.find({ idSeguidor: req.body.userid });
    let result = [];
    for (let i = 0; i < busqueda.length; i++) {
        const tweets = yield tweet_1.default.find({ owner: busqueda[i].idSeguido });
        result = result.concat(tweets);
    }
    let allTweets = result.sort(function (a, b) {
        return new Date(b.fecha).getTime() - new Date(a.fecha).getTime();
    });
    return res.status(200).json({ allTweets });
});
exports.ShowFollowingTweets = ShowFollowingTweets;
const showAllTweets = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const Tweets = yield tweet_1.default.find().sort({ fecha: 'desc' });
    if (!Tweets) {
        return res.status(400).json({ msg: "el usuario no tiene Tweets" });
    }
    console.log(Tweets);
    return res.status(201).json({ Tweets });
});
exports.showAllTweets = showAllTweets;
const showTweetDetails = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const nota = yield tweet_1.default.findOne({ _id: req.body._id });
    if (!nota) {
        return res.status(400).json({ msg: 'La nota que busco no existe' });
    }
    //GUARDAR USUARIO
    return res.status(201).json(nota);
});
exports.showTweetDetails = showTweetDetails;
const editTweetContent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const notas = yield tweet_1.default.updateOne({ _id: req.body._id }, { titulo: req.body.titulo, descripcion: req.body.descripcion });
    if (!notas) {
        return res.status(400).json({ msg: "Error al intentar guardar la nota (nota no encontrada)" });
    }
    console.log(notas);
    return res.status(201).json({ msg: "Guardado con exito" });
});
exports.editTweetContent = editTweetContent;
const deleteTweet = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const nota = yield tweet_1.default.findOne({ _id: req.body.idTweet });
    if (!nota) {
        return res.status(400).json({ msg: 'El Tweet que busco no existe' });
    }
    const notas = yield tweet_1.default.deleteOne({ _id: req.body.idTweet });
    console.log(notas);
    return res.status(201).json({ msg: "Tweet eliminado con exito" });
});
exports.deleteTweet = deleteTweet;
