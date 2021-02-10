"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var helmet_1 = __importDefault(require("helmet"));
var cors_1 = __importDefault(require("cors"));
var app = express_1.default();
app.use(helmet_1.default());
app.use(cors_1.default());
var body_parser_1 = __importDefault(require("body-parser"));
// const bodyParser = require('body-parser')
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(body_parser_1.default.json());
var port = process.env.PORT || 3000;
app.get('/', function (req, res) {
    res.status(200).send({ message: 'Hello World' });
});
app.listen(port);
console.log('listen on port' + port);
