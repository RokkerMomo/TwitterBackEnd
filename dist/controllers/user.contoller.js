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
exports.editpassword = exports.edituser = exports.deleteUser = exports.FindUser = exports.signIn = exports.signUp = void 0;
const user_1 = __importDefault(require("../models/user"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config/config"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const tweet_1 = __importDefault(require("../models/tweet"));
//FUNCION PARA CREAR TOKEN
function createToken(user) {
    return jsonwebtoken_1.default.sign({ id: user.id, usuario: user.usuario }, config_1.default.jwtSecret, {
        expiresIn: 86400
    });
}
//REGISTRO
const signUp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.body.usuario || !req.body.password) {
        return res.status(400).json({ msg: 'Asegurese de ingresar el usuario y la contraseña' });
    }
    const user = yield user_1.default.findOne({ usuario: req.body.usuario });
    if (user) {
        return res.status(400).json({ msg: 'El Usuario que ingreso ya existe' });
    }
    //GUARDAR USUARIO
    const newUser = new user_1.default(req.body);
    yield newUser.save();
    return res.status(201).json({ newUser, msg: 'Usuario Registrado Correctamente' });
});
exports.signUp = signUp;
//LOGIN
const signIn = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.body.usuario || !req.body.password) {
        return res.status(400).json({ msg: "Asegurese de ingresar el usuario y la contraseña" });
    }
    const user = yield user_1.default.findOne({ usuario: req.body.usuario });
    if (!user) {
        return res.status(400).json({ msg: "El usuario no existe" });
    }
    const isMatch = yield user.comparePassword(req.body.password);
    if (!isMatch) {
        //DEVOLVER RESPUETA
        return res.status(400).json({ msg: "El correo o la contraseña son incorrectos" });
    }
    //DEVOLVER TOKEN
    //  user.push({token:createToken(user)})
    return res.status(201).json({ user, token: createToken(user) });
});
exports.signIn = signIn;
const FindUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_1.default.findOne({ _id: req.body._id });
    console.log(req.body);
    if (!user) {
        return res.status(400).json({ msg: "El usuario no existe" });
    }
    return res.status(200).json(user);
});
exports.FindUser = FindUser;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_1.default.findOne({ _id: req.body._id });
    if (!user) {
        return res.status(400).json({ msg: 'el usuario que busco no existe' });
    }
    yield user_1.default.deleteOne({ _id: req.body._id });
    // await Notas.deleteMany({owner:req.body._id});
    return res.status(201).json({ msg: "Cuenta eliminada con exito" });
});
exports.deleteUser = deleteUser;
const edituser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_1.default.updateOne({ _id: req.body._id }, { nombre: req.body.nombre, apellido: req.body.apellido, usuario: req.body.usuario, bio: req.body.bio });
    if (!user) {
        return res.status(400).json({ msg: "Error al intentar editar perfil" });
    }
    const tweets = yield tweet_1.default.updateMany({ owner: req.body._id }, { ownername: `${req.body.nombre} ${req.body.apellido}`, owneruser: req.body.usuario });
    return res.status(201).json({ msg: "Guardado con exito" });
});
exports.edituser = edituser;
const editpassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.body.actual || !req.body.nueva) {
        return res.status(400).json({ msg: "Asegurese de ingresar los campos" });
    }
    const user = yield user_1.default.findOne({ _id: req.body._id });
    if (!user) {
        return res.status(400).json({ msg: "El usuario no existe" });
    }
    const isMatch = yield user.comparePassword(req.body.actual);
    if (!isMatch) {
        //DEVOLVER RESPUETA
        return res.status(400).json({ msg: "La contraseña actual no coincide" });
    }
    if (req.body.actual == req.body.nueva) {
        return res.status(400).json({ msg: "la contraseña nueva no puede ser igual que la actual" });
    }
    const salt = yield bcrypt_1.default.genSalt(10);
    const hash = yield bcrypt_1.default.hash(req.body.nueva, salt);
    const pass = yield user_1.default.updateOne({ _id: req.body._id }, { password: hash });
    return res.status(201).json({ msg: "Cambio realizado con exito" });
});
exports.editpassword = editpassword;
