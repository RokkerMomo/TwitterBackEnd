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
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
//EL ESQUEMA DE USUARIO
const SeguirSchema = new mongoose_1.Schema({
    idSeguido: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    idSeguidor: {
        type: String,
        unique: false,
        required: true,
        trim: true
    }
});
SeguirSchema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        next();
    });
});
exports.default = (0, mongoose_1.model)('Seguir', SeguirSchema);