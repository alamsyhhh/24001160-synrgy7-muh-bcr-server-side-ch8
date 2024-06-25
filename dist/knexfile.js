"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
const path_1 = __importDefault(require("path"));
(0, dotenv_1.config)();
const config = {
    development: {
        client: 'postgresql',
        connection: {
            database: process.env.DB_DATABASE,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD
        },
        pool: {
            min: 4,
            max: 10
        },
        migrations: {
            tableName: 'knex_migrations',
            directory: path_1.default.join(__dirname, '/src/db/migrations')
        },
        seeds: {
            directory: path_1.default.join(__dirname, '/src/db/seeds')
        }
    },
    production: {
        client: 'postgresql',
        connection: {
            database: process.env.DB_DATABASE,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD
        },
        pool: {
            min: 2,
            max: 10
        },
        migrations: {
            tableName: 'knex_migrations'
        }
    }
};
module.exports = config;
