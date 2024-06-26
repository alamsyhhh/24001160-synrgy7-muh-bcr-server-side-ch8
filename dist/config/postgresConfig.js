"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.knexInstance = void 0;
const dotenv_1 = require("dotenv");
const knex_1 = __importDefault(require("knex"));
(0, dotenv_1.config)();
const knexInstance = (0, knex_1.default)({
    client: 'postgresql',
    connection: {
        host: process.env.DB_HOST,
        database: process.env.DB_DATABASE,
        port: Number(process.env.DB_PORT),
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD
    },
    debug: true
});
exports.knexInstance = knexInstance;
