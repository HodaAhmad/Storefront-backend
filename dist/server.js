"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = __importDefault(require("express"));
var body_parser_1 = __importDefault(require("body-parser"));
var products_1 = __importDefault(require("./handlers/products"));
var users_1 = __importDefault(require("./handlers/users"));
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1["default"].config();
var app = (0, express_1["default"])();
var PORT = process.env.PORT;
app.use(body_parser_1["default"].json());
app.get('/', function (req, res) {
    res.send('Hello, welcome to a store front of a shopping application!');
});
(0, users_1["default"])(app);
(0, products_1["default"])(app);
//order_routes(app)
app.listen(3000, function () {
    console.log("starting app on: 3000");
});
exports["default"] = app;
