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
exports.DeleteComentario = exports.GetNumeroDeComentarios = exports.getComentarios = exports.NuevoComentario = void 0;
const comentario_1 = __importDefault(require("../models/comentario"));
//Crear Tweet
const NuevoComentario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.body.descripcion) {
        return res.status(400).json({ msg: "El Comentario No Puede estar vacio" });
    }
    const newComentario = new comentario_1.default(req.body);
    yield newComentario.save();
    return res.status(201).json(newComentario);
});
exports.NuevoComentario = NuevoComentario;
const getComentarios = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const comentarios = yield comentario_1.default.find({ idTweet: req.body.idTweet }).sort({ fecha: 'desc' });
    return res.status(201).json(comentarios);
});
exports.getComentarios = getComentarios;
const GetNumeroDeComentarios = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield comentario_1.default.find({ idTweet: req.body.idTweet });
    return res.status(201).json(result.length);
});
exports.GetNumeroDeComentarios = GetNumeroDeComentarios;
const DeleteComentario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const nota = yield comentario_1.default.findOne({ _id: req.body.idTweet });
    if (!nota) {
        return res.status(400).json({ msg: 'El Comentario que busco no existe' });
    }
    const notas = yield comentario_1.default.deleteOne({ _id: req.body.idTweet });
    console.log(notas);
    return res.status(201).json({ msg: "Comentario eliminado con exito" });
});
exports.DeleteComentario = DeleteComentario;
