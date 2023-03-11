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
exports.deleteTweet = exports.editTweetContent = exports.showTweetDetails = exports.showAllTweets = exports.showUserTweets = exports.newTweet = void 0;
const tweet_1 = __importDefault(require("../models/tweet"));
//Crear Tweet
const newTweet = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.body.descripcion) {
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
    const nota = yield tweet_1.default.findOne({ _id: req.body._id });
    if (!nota) {
        return res.status(400).json({ msg: 'La nota que busco no existe' });
    }
    const notas = yield tweet_1.default.deleteOne({ _id: req.body._id });
    console.log(notas);
    return res.status(201).json({ msg: "Nota eliminada con exito" });
});
exports.deleteTweet = deleteTweet;
